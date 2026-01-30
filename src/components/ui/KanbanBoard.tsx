import React, { useState, useRef, useEffect } from 'react';
import { Plus,  Trash2,  GripVertical, Search, Clock, Flag, Tag, MessageSquare, Paperclip } from 'lucide-react';
import { cn } from '../../utils';
import { Button } from './Button';
import { Input } from './Core';
import { Badge } from './Core';
import { Dialog } from './Feedback';
import type { CardPriority, CardStatus, CardType, KanbanBoardProps, KanbanCard, KanbanColumn } from '../../types';



const statusColors: Record<CardStatus, string> = {
  'todo': 'bg-slate-100 border-slate-300 dark:bg-slate-900/50 dark:border-slate-700',
  'in-progress': 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
  'review': 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
  'done': 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
};

const priorityColors: Record<CardPriority, string> = {
  'low': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  'medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  'high': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  'critical': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

const typeIcons: Record<CardType, React.ReactNode> = {
  'task': <div className="h-2 w-2 rounded-full bg-blue-500" />,
  'bug': <div className="h-2 w-2 rounded-full bg-red-500" />,
  'feature': <div className="h-2 w-2 rounded-full bg-green-500" />,
  'improvement': <div className="h-2 w-2 rounded-full bg-purple-500" />,
};

export function KanbanBoard({
  columns: initialColumns = [],
  cards: initialCards = [],
  editable = true,
  showFilters = true,
  showSearch = true,
  onCardMove,
  onCardAdd,
   onCardDelete,
  onColumnAdd,
   onColumnDelete,
  className,
}: KanbanBoardProps) {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [cards, setCards] = useState<KanbanCard[]>(initialCards);
  const [draggingCard, setDraggingCard] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{
    priority?: CardPriority[];
    type?: CardType[];
    assignee?: string[];
  }>({});
  const [showAddCard, setShowAddCard] = useState<string | null>(null);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [showAddColumn, setShowAddColumn] = useState(false);

  const dragStartRef = useRef<{ cardId: string; columnId: string } | null>(null);

  // Initialize with default columns if none provided
  useEffect(() => {
    if (initialColumns.length === 0) {
      setColumns([
        { id: 'todo', title: 'To Do', status: 'todo', color: '#94a3b8', cardIds: [] },
        { id: 'in-progress', title: 'In Progress', status: 'in-progress', color: '#3b82f6', cardIds: [] },
        { id: 'review', title: 'Review', status: 'review', color: '#f59e0b', cardIds: [] },
        { id: 'done', title: 'Done', status: 'done', color: '#10b981', cardIds: [] },
      ]);
    }
  }, [initialColumns]);

  // Filter cards based on search and filters
  const filteredCards = cards.filter(card => {
    // Search term
    if (searchTerm && !card.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !card.description?.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Priority filter
    if (filters.priority && filters.priority.length > 0 && !filters.priority.includes(card.priority)) {
      return false;
    }
    
    // Type filter
    if (filters.type && filters.type.length > 0 && !filters.type.includes(card.type)) {
      return false;
    }
    
    // Assignee filter
    if (filters.assignee && filters.assignee.length > 0 && 
        (!card.assignee || !filters.assignee.includes(card.assignee.id))) {
      return false;
    }
    
    return true;
  });

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, cardId: string, columnId: string) => {
    setDraggingCard(cardId);
    dragStartRef.current = { cardId, columnId };
    e.dataTransfer.setData('text/plain', cardId);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDragOverColumn(columnId);
    e.dataTransfer.dropEffect = 'move';
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    
    if (!draggingCard || !dragStartRef.current) return;
    
    const { cardId, columnId: fromColumnId } = dragStartRef.current;
    
    if (fromColumnId !== columnId) {
      // Move card to new column
      const newColumns = columns.map(column => {
        if (column.id === fromColumnId) {
          return {
            ...column,
            cardIds: column.cardIds.filter(id => id !== cardId),
          };
        }
        
        if (column.id === columnId) {
          return {
            ...column,
            cardIds: [...column.cardIds, cardId],
          };
        }
        
        return column;
      });
      
      setColumns(newColumns);
      
      // Update card status
      const newCards = cards.map(card => {
        if (card.id === cardId) {
          const newStatus = columns.find(c => c.id === columnId)?.status || card.status;
          return { ...card, status: newStatus, updatedAt: new Date().toISOString() };
        }
        return card;
      });
      
      setCards(newCards);
      
      // Callback
      onCardMove?.(cardId, fromColumnId, columnId, columns.find(c => c.id === columnId)?.cardIds.length || 0);
    }
    
    setDraggingCard(null);
    setDragOverColumn(null);
    dragStartRef.current = null;
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggingCard(null);
    setDragOverColumn(null);
    dragStartRef.current = null;
  };

  // Add new card
  const handleAddCard = (columnId: string) => {
    if (!newCardTitle.trim()) return;
    
    const newCard: KanbanCard = {
      id: `card-${Date.now()}`,
      title: newCardTitle,
      description: '',
      status: columns.find(c => c.id === columnId)?.status || 'todo',
      priority: 'medium',
      type: 'task',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setCards([...cards, newCard]);
    
    // Add card to column
    setColumns(columns.map(column => 
      column.id === columnId 
        ? { ...column, cardIds: [...column.cardIds, newCard.id] }
        : column
    ));
    
    onCardAdd?.(columnId, newCard);
    
    setNewCardTitle('');
    setShowAddCard(null);
  };

  // Delete card
  const handleDeleteCard = (cardId: string) => {
    const newCards = cards.filter(card => card.id !== cardId);
    setCards(newCards);
    
    // Remove card from all columns
    setColumns(columns.map(column => ({
      ...column,
      cardIds: column.cardIds.filter(id => id !== cardId),
    })));
    
    onCardDelete?.(cardId);
  };

  // Add new column
  const handleAddColumn = () => {
    if (!newColumnTitle.trim()) return;
    
    const newColumn: KanbanColumn = {
      id: `col-${Date.now()}`,
      title: newColumnTitle,
      status: 'todo',
      color: '#94a3b8',
      cardIds: [],
    };
    
    setColumns([...columns, newColumn]);
    onColumnAdd?.(newColumnTitle, 'todo');
    
    setNewColumnTitle('');
    setShowAddColumn(false);
  };

  // Delete column
  const handleDeleteColumn = (columnId: string) => {
    // Delete all cards in the column first
    const column = columns.find(c => c.id === columnId);
    if (column) {
      const newCards = cards.filter(card => !column.cardIds.includes(card.id));
      setCards(newCards);
    }
    
    // Delete the column
    const newColumns = columns.filter(column => column.id !== columnId);
    setColumns(newColumns);
    
    onColumnDelete?.(columnId);
  };

  // Get cards for a specific column
  const getColumnCards = (columnId: string) => {
    const column = columns.find(c => c.id === columnId);
    if (!column) return [];
    
    return filteredCards
      .filter(card => column.cardIds.includes(card.id))
      .sort((a, b) => column.cardIds.indexOf(a.id) - column.cardIds.indexOf(b.id));
  };

  // Render a single card
  const renderCard = (card: KanbanCard, columnId: string) => {
    return (
      <div
        key={card.id}
        draggable={editable}
        onDragStart={(e) => editable && handleDragStart(e, card.id, columnId)}
        onDragEnd={handleDragEnd}
        className={cn(
          "group relative mb-3 rounded-lg border bg-white p-4 shadow-sm transition-all duration-200",
          "hover:shadow-md cursor-move dark:bg-slate-900",
          draggingCard === card.id && "opacity-50 scale-95",
          statusColors[card.status]
        )}
      >
        {editable && (
          <div className="absolute -left-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="h-4 w-4 text-slate-400" />
          </div>
        )}
        
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2 ">
            {typeIcons[card.type]}
            <h3 className="font-medium text-slate-900 dark:text-slate-50 line-clamp-1">
              {card.title}
            </h3>
          </div>
          
          {editable && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleDeleteCard(card.id)}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
              >
                <Trash2 className="h-4 w-4 text-slate-500 hover:text-red-500" />
              </button>
            </div>
          )}
        </div>
        
        {card.description && (
          <p className="mb-3 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
            {card.description}
          </p>
        )}
        
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 ">
            <Badge className={cn("text-xs", priorityColors[card.priority])}>
              {card.priority}
            </Badge>
            
            {card.tags && card.tags.length > 0 && (
              <div className="flex gap-1">
                {card.tags.slice(0, 2).map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
                {card.tags.length > 2 && (
                  <span className="text-xs text-slate-500">+{card.tags.length - 2}</span>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {card.assignee && (
              <div className="flex items-center gap-1">
                <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center text-xs text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                  {card.assignee.name.charAt(0)}
                </div>
              </div>
            )}
            
            {card.dueDate && (
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock size={12} />
                <span>{card.dueDate}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              {card.comments !== undefined && card.comments > 0 && (
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <MessageSquare size={12} />
                  <span>{card.comments}</span>
                </div>
              )}
              
              {card.attachments !== undefined && card.attachments > 0 && (
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Paperclip size={12} />
                  <span>{card.attachments}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render a single column
  const renderColumn = (column: KanbanColumn) => {
    const columnCards = getColumnCards(column.id);
    const isOver = dragOverColumn === column.id;
    
    return (
      <div
        key={column.id}
        className={cn(
          "flex h-full flex-col rounded-lg border",
          isOver ? "border-2 border-dashed border-primary-500 bg-primary-50/50 dark:bg-primary-900/10" : "border-slate-200 dark:border-slate-800"
        )}
        onDragOver={(e) => editable && handleDragOver(e, column.id)}
        onDrop={(e) => editable && handleDrop(e, column.id)}
      >
        <div className="flex items-center justify-between border-b p-4 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: column.color }}
            />
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-50">
                {column.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>{columnCards.length} cards</span>
                {column.wipLimit && (
                  <>
                    <span>•</span>
                    <span className={columnCards.length > column.wipLimit ? "text-red-500" : ""}>
                      WIP: {columnCards.length}/{column.wipLimit}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {editable && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowAddCard(column.id)}
                className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDeleteColumn(column.id)}
                className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Trash2 className="h-4 w-4 text-slate-500 hover:text-red-500" />
              </button>
            </div>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {columnCards.map(card => renderCard(card, column.id))}
          
          {showAddCard === column.id && (
            <div className="mb-3 rounded-lg border border-dashed border-slate-300 p-3 dark:border-slate-700">
              <Input
                placeholder="Enter card title..."
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                className="mb-2"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddCard(column.id);
                  if (e.key === 'Escape') setShowAddCard(null);
                }}
              />
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowAddCard(null)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleAddCard(column.id)}
                  disabled={!newCardTitle.trim()}
                >
                  Add Card
                </Button>
              </div>
            </div>
          )}
          
          {editable && !showAddCard && columnCards.length === 0 && (
            <button
              onClick={() => setShowAddCard(column.id)}
              className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-4 text-slate-500 hover:border-slate-400 hover:text-slate-700 dark:border-slate-700 dark:hover:border-slate-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add a card
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={cn("flex h-full flex-col", className)}>
      {/* Toolbar */}
      {(showSearch || showFilters) && (
        <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {showSearch && (
              <div className="flex-1">
                <Input
                  placeholder="Search cards..."
                  leftIcon={<Search size={16} />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md"
                />
              </div>
            )}
            
            {showFilters && (
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilters({ ...filters, priority: filters.priority ? undefined : ['high', 'critical'] })}
                  className={filters.priority?.length ? 'border-primary-500 text-primary-600' : ''}
                >
                  <Flag size={14} className="mr-2" />
                  High Priority
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilters({ ...filters, type: filters.type ? undefined : ['bug'] })}
                  className={filters.type?.length ? 'border-primary-500 text-primary-600' : ''}
                >
                  <Tag size={14} className="mr-2" />
                  Bugs Only
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilters({})}
                  disabled={!Object.keys(filters).some(key => filters[key as keyof typeof filters]?.length)}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
          
          {/* Active filters */}
          {Object.keys(filters).some(key => filters[key as keyof typeof filters]?.length) && (
            <div className="mt-3 flex flex-wrap gap-2">
              {filters.priority?.map(priority => (
                <Badge key={priority} variant="outline" className="capitalize">
                  Priority: {priority}
                </Badge>
              ))}
              {filters.type?.map(type => (
                <Badge key={type} variant="outline" className="capitalize">
                  Type: {type}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Board stats */}
      <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        {columns.map(column => {
          const columnCards = getColumnCards(column.id);
          return (
            <div key={column.id} className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
              <div className="text-sm text-slate-500">{column.title}</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                {columnCards.length}
              </div>
              <div className="text-xs text-slate-500">
                {columnCards.filter(c => c.priority === 'high' || c.priority === 'critical').length} urgent
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Board columns */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="grid min-h-[500px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {columns.map(column => renderColumn(column))}
          
          {editable && (
            <div className="flex flex-col">
              {showAddColumn ? (
                <div className="rounded-lg border border-dashed border-slate-300 p-4 dark:border-slate-700">
                  <Input
                    placeholder="Column title..."
                    value={newColumnTitle}
                    onChange={(e) => setNewColumnTitle(e.target.value)}
                    className="mb-3"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddColumn();
                      if (e.key === 'Escape') setShowAddColumn(false);
                    }}
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowAddColumn(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleAddColumn}
                      disabled={!newColumnTitle.trim()}
                    >
                      Add Column
                    </Button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAddColumn(true)}
                  className="flex h-full min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-slate-300 text-slate-500 hover:border-slate-400 hover:text-slate-700 dark:border-slate-700 dark:hover:border-slate-600"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add Column
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Instructions */}
      {editable && (
        <div className="mt-6 rounded-lg bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-900/30 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <GripVertical className="h-4 w-4" />
            <span>Drag cards between columns to update their status</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Card Detail Component
export interface CardDetailProps {
  card: KanbanCard;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updates: Partial<KanbanCard>) => void;
  onDelete: () => void;
}

export function CardDetail({
  card,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: CardDetailProps) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [priority, setPriority] = useState<CardPriority>(card.priority);
  const [type, setType] = useState<CardType>(card.type);
  
  const handleSave = () => {
    onSave({
      title,
      description,
      priority,
      type,
      updatedAt: new Date().toISOString(),
    });
    onClose();
  };
  
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Card"
      size="lg"
    >
      <div className="space-y-6 py-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Card title..."
          />
        </div>
        
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Card description..."
            className="w-full rounded-lg border border-slate-300 p-3 dark:border-slate-700 dark:bg-slate-900"
            rows={4}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as CardPriority)}
              className="w-full rounded-lg border border-slate-300 p-2 dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as CardType)}
              className="w-full rounded-lg border border-slate-300 p-2 dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="task">Task</option>
              <option value="bug">Bug</option>
              <option value="feature">Feature</option>
              <option value="improvement">Improvement</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button
            variant="destructive"
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Card
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}