import  { useState } from 'react';
import { Check, Users, Clock, TrendingUp, BarChart,  Plus, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Layout';
import { CardDetail, KanbanBoard } from '../components/ui/KanbanBoard';
import ComponentPreview from './ComponentPreview';
import type { KanbanCard, KanbanColumn } from '../types';

const KanbanBoardView = () => {
  const [selectedCard, setSelectedCard] = useState<KanbanCard | null>(null);
  const [isCardDetailOpen, setIsCardDetailOpen] = useState(false);

  // Sample data
  const initialColumns: KanbanColumn[] = [
    {
      id: 'todo',
      title: 'To Do',
      status: 'todo',
      color: '#94a3b8',
      wipLimit: 5,
      cardIds: ['1', '2', '3'],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      status: 'in-progress',
      color: '#3b82f6',
      wipLimit: 3,
      cardIds: ['4', '5'],
    },
    {
      id: 'review',
      title: 'Review',
      status: 'review',
      color: '#f59e0b',
      cardIds: ['6'],
    },
    {
      id: 'done',
      title: 'Done',
      status: 'done',
      color: '#10b981',
      cardIds: ['7', '8'],
    },
  ];

  const initialCards: KanbanCard[] = [
    {
      id: '1',
      title: 'Design Homepage Redesign',
      description: 'Create new layout for homepage with improved UX and accessibility',
      status: 'todo',
      priority: 'high',
      type: 'feature',
      assignee: { id: '1', name: 'Alex Chen' },
      dueDate: '2024-02-15',
      tags: ['Design', 'UI/UX'],
      comments: 3,
      attachments: 2,
      watchers: 5,
      estimate: '3d',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-25',
    },
    {
      id: '2',
      title: 'Fix Login Authentication Bug',
      description: 'Users unable to login with social media accounts',
      status: 'todo',
      priority: 'critical',
      type: 'bug',
      assignee: { id: '2', name: 'Sarah Miller' },
      dueDate: '2024-01-30',
      tags: ['Backend', 'Security'],
      comments: 8,
      attachments: 1,
      watchers: 3,
      estimate: '1d',
      createdAt: '2024-01-24',
      updatedAt: '2024-01-24',
    },
    {
      id: '3',
      title: 'Write API Documentation',
      description: 'Document new payment gateway integration endpoints',
      status: 'todo',
      priority: 'medium',
      type: 'task',
      assignee: { id: '3', name: 'David Kim' },
      dueDate: '2024-02-10',
      tags: ['Documentation', 'API'],
      comments: 2,
      attachments: 0,
      watchers: 2,
      estimate: '2d',
      createdAt: '2024-01-22',
      updatedAt: '2024-01-22',
    },
    {
      id: '4',
      title: 'Implement Dark Mode',
      description: 'Add dark mode support across all application screens',
      status: 'in-progress',
      priority: 'high',
      type: 'feature',
      assignee: { id: '1', name: 'Alex Chen' },
      dueDate: '2024-02-05',
      tags: ['Frontend', 'Theme'],
      comments: 5,
      attachments: 3,
      watchers: 7,
      estimate: '4d',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-28',
    },
    {
      id: '5',
      title: 'Database Performance Optimization',
      description: 'Optimize slow queries and add indexing',
      status: 'in-progress',
      priority: 'medium',
      type: 'improvement',
      assignee: { id: '4', name: 'Maria Garcia' },
      dueDate: '2024-02-20',
      tags: ['Database', 'Performance'],
      comments: 4,
      attachments: 2,
      watchers: 4,
      estimate: '5d',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-27',
    },
    {
      id: '6',
      title: 'Mobile Responsiveness Testing',
      description: 'Test and fix responsive issues on mobile devices',
      status: 'review',
      priority: 'medium',
      type: 'task',
      assignee: { id: '5', name: 'James Wilson' },
      dueDate: '2024-02-01',
      tags: ['Testing', 'Mobile'],
      comments: 6,
      attachments: 5,
      watchers: 3,
      estimate: '2d',
      createdAt: '2024-01-25',
      updatedAt: '2024-01-29',
    },
    {
      id: '7',
      title: 'User Profile Page Redesign',
      description: 'Redesigned user profile with new layout and features',
      status: 'done',
      priority: 'low',
      type: 'feature',
      assignee: { id: '1', name: 'Alex Chen' },
      dueDate: '2024-01-20',
      tags: ['Design', 'Profile'],
      comments: 12,
      attachments: 4,
      watchers: 8,
      estimate: '3d',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-20',
    },
    {
      id: '8',
      title: 'Fix Notification System',
      description: 'Fixed issue with push notifications not being delivered',
      status: 'done',
      priority: 'medium',
      type: 'bug',
      assignee: { id: '2', name: 'Sarah Miller' },
      dueDate: '2024-01-18',
      tags: ['Backend', 'Notifications'],
      comments: 7,
      attachments: 1,
      watchers: 5,
      estimate: '1d',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-18',
    },
  ];

  const handleCardMove = (cardId: string, fromColumn: string, toColumn: string, position: number) => {
    console.log(`Card ${cardId} moved from ${fromColumn} to ${toColumn} at position ${position}`);
  };

  const handleCardAdd = (columnId: string, card: any) => {
    console.log('New card added to column', columnId, card);
  };

  const handleCardEdit = (cardId: string, updates: Partial<KanbanCard>) => {
    console.log('Card edited', cardId, updates);
  };

  const handleCardDelete = (cardId: string) => {
    console.log('Card deleted', cardId);
  };

   

  const handleExport = () => {
    console.log('Exporting board data...');
    // Implement export logic here
  };

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Kanban Board</h1>
        <p className="text-sm sm:text-lg text-slate-500 dark:text-slate-400">
          Interactive drag-and-drop task management board with advanced filtering and statistics.
        </p>
      </div>

      {/* Interactive Kanban Board */}
      <ComponentPreview
        title="Interactive Kanban Board"
        description="Full-featured Kanban board with drag-and-drop, filters, and real-time updates."
        code={`const initialColumns = [
  {
    id: 'todo',
    title: 'To Do',
    status: 'todo',
    color: '#94a3b8',
    wipLimit: 5,
    cardIds: ['1', '2', '3'],
  },
  // ... more columns
];

const initialCards = [
  {
    id: '1',
    title: 'Design Homepage Redesign',
    description: 'Create new layout for homepage',
    status: 'todo',
    priority: 'high',
    type: 'feature',
    assignee: { id: '1', name: 'Alex Chen' },
    dueDate: '2024-02-15',
    tags: ['Design', 'UI/UX'],
    comments: 3,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-25',
  },
  // ... more cards
];

<KanbanBoard
  columns={initialColumns}
  cards={initialCards}
  editable={true}
  showFilters={true}
  showSearch={true}
  onCardMove={handleCardMove}
  onCardAdd={handleCardAdd}
  onCardEdit={handleCardEdit}
  onCardDelete={handleCardDelete}
/>`}
      >
        <div className="p-4 sm:p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-50">
                  Project Tasks Board
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  8 tasks across 4 stages • Updated just now
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download size={14} className="mr-2" />
                  Export
                </Button>
                <Button size="sm">
                  <Plus size={14} className="mr-2" />
                  Add Task
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <Card className="p-1 md:p-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-slate-50">3</div>
                    <div className="text-xs sm:text-sm text-slate-500">To Do</div>
                  </div>
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Clock className="text-slate-600 dark:text-slate-400 size-4 sm:size-5" />
                  </div>
                </div>
              </Card>

              <Card className="p-1 md:p-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400">2</div>
                    <div className="text-xs sm:text-sm text-slate-500">In Progress</div>
                  </div>
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <TrendingUp className="text-blue-600 dark:text-blue-400 size-4 sm:size-5" />
                  </div>
                </div>
              </Card>

              <Card className="p-1 md:p-2">
                <div className="">
                  <div className='flex items-center justify-between'>
                    <div className="text-lg sm:text-2xl font-bold text-yellow-600 dark:text-yellow-400">1</div>
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <Users className="text-yellow-600 dark:text-yellow-400 size-4 sm:size-5" />
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500">In Review</div>
                </div>
              </Card>

              <Card className="p-1 md:p-2">
                <div className="">
                  <div className='flex items-center justify-between'>
                    <div className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">2</div>
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Check className="text-green-600 dark:text-green-400 size-4 sm:size-5" />
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500">Completed</div>
                </div>
              </Card>
            </div>
          </div>

          <KanbanBoard
            columns={initialColumns}
            cards={initialCards}
            editable={true}
            showFilters={true}
            showSearch={true}
            onCardMove={handleCardMove}
            onCardAdd={handleCardAdd}
            onCardEdit={handleCardEdit}
            onCardDelete={handleCardDelete}
            className="min-h-[400px] sm:min-h-[600px]"
          />
        </div>
      </ComponentPreview>

      {/* Read-only Kanban Board */}
      <ComponentPreview
        title="Read-only Kanban Board"
        description="Display-only board for dashboards and reporting."
        code={`<KanbanBoard
  columns={initialColumns}
  cards={initialCards}
  editable={false}
  showFilters={false}
  showSearch={false}
/>`}
      >
        <div className="p-4 sm:p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-50">
              Project Status Dashboard (Read-only)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Display-only board for stakeholders and reports
            </p>
          </div>

          <KanbanBoard
            columns={initialColumns.map(col => ({ ...col, wipLimit: undefined }))}
            cards={initialCards.slice(0, 6)}
            editable={false}
            showFilters={false}
            showSearch={false}
            className="min-h-[300px] sm:min-h-[400px]"
          />
        </div>
      </ComponentPreview>

      {/* Minimal Kanban Board */}
      <ComponentPreview
        title="Minimal Kanban Board"
        description="Simple board with basic functionality."
        code={`<KanbanBoard
  columns={initialColumns.slice(0, 3)}
  cards={initialCards.slice(0, 4)}
  editable={true}
  showFilters={false}
  showSearch={true}
/>`}
      >
        <div className="p-4 sm:p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-50">
              Simple Task Board
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Basic board for small teams and personal projects
            </p>
          </div>

          <KanbanBoard
            columns={initialColumns.slice(0, 3)}
            cards={initialCards.slice(0, 4)}
            editable={true}
            showFilters={false}
            showSearch={true}
            className="min-h-[250px] sm:min-h-[300px]"
          />
        </div>
      </ComponentPreview>

      {/* Card Detail Modal */}
      <ComponentPreview
        title="Card Detail View"
        description="Modal for viewing and editing card details."
        code={`const [selectedCard, setSelectedCard] = useState<KanbanCard | null>(null);
const [isCardDetailOpen, setIsCardDetailOpen] = useState(false);

const handleCardClick = (card: KanbanCard) => {
  setSelectedCard(card);
  setIsCardDetailOpen(true);
};

{selectedCard && (
  <CardDetail
    card={selectedCard}
    isOpen={isCardDetailOpen}
    onClose={() => setIsCardDetailOpen(false)}
    onSave={(updates) => console.log('Save:', updates)}
    onDelete={() => console.log('Delete card')}
  />
)}`}
      >
        <div className="p-4 sm:p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="h-12 w-12 sm:h-16 sm:w-16 mx-auto rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <BarChart className="text-primary-600 dark:text-primary-400 size-6 sm:size-8" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-50">
              Card Detail Modal
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Click on any card in the board to open a detailed modal for editing card information,
              changing priority, adding descriptions, and more.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCard(initialCards[0]);
                setIsCardDetailOpen(true);
              }}
            >
              Open Card Detail Demo
            </Button>
          </div>
        </div>
      </ComponentPreview>

      {/* Implementation Example */}
      <ComponentPreview
        title="Implementation Example"
        description="Complete code example showing how to implement Kanban board in your application."
        code={`import { KanbanBoard, CardDetail, KanbanCard, KanbanColumn } from '../components/ui/KanbanBoard';
import { useState } from 'react';

const ProjectBoard = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>([
    {
      id: 'todo',
      title: 'To Do',
      status: 'todo',
      color: '#94a3b8',
      cardIds: ['1', '2'],
    },
    // ... more columns
  ]);
  
  const [cards, setCards] = useState<KanbanCard[]>([
    {
      id: '1',
      title: 'Implement User Authentication',
      description: 'Add login and registration functionality',
      status: 'todo',
      priority: 'high',
      type: 'feature',
      assignee: { id: '1', name: 'John Doe' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    // ... more cards
  ]);
  
  const [selectedCard, setSelectedCard] = useState<KanbanCard | null>(null);
  const [isCardDetailOpen, setIsCardDetailOpen] = useState(false);
  
  const handleCardMove = (cardId: string, fromColumn: string, toColumn: string) => {
    console.log(\`Card \${cardId} moved from \${fromColumn} to \${toColumn}\`);
    
    // Update cards status
    const newCards = cards.map(card => {
      if (card.id === cardId) {
        const newStatus = columns.find(c => c.id === toColumn)?.status || card.status;
        return { 
          ...card, 
          status: newStatus,
          updatedAt: new Date().toISOString()
        };
      }
      return card;
    });
    
    setCards(newCards);
    
    // Update columns
    const newColumns = columns.map(column => {
      if (column.id === fromColumn) {
        return { ...column, cardIds: column.cardIds.filter(id => id !== cardId) };
      }
      if (column.id === toColumn) {
        return { ...column, cardIds: [...column.cardIds, cardId] };
      }
      return column;
    });
    
    setColumns(newColumns);
  };
  
  const handleCardAdd = (columnId: string, newCard: any) => {
    const cardWithId: KanbanCard = {
      ...newCard,
      id: \`card-\${Date.now()}\`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setCards([...cards, cardWithId]);
    
    setColumns(columns.map(column => 
      column.id === columnId 
        ? { ...column, cardIds: [...column.cardIds, cardWithId.id] }
        : column
    ));
  };
  
  const handleCardEdit = (cardId: string, updates: Partial<KanbanCard>) => {
    setCards(cards.map(card => 
      card.id === cardId 
        ? { ...card, ...updates, updatedAt: new Date().toISOString() }
        : card
    ));
  };
  
  const handleCardDelete = (cardId: string) => {
    setCards(cards.filter(card => card.id !== cardId));
    setColumns(columns.map(column => ({
      ...column,
      cardIds: column.cardIds.filter(id => id !== cardId),
    })));
  };
  
  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Project Management Board</h1>
      
      <KanbanBoard
        columns={columns}
        cards={cards}
        editable={true}
        showFilters={true}
        showSearch={true}
        onCardMove={handleCardMove}
        onCardAdd={handleCardAdd}
        onCardEdit={handleCardEdit}
        onCardDelete={handleCardDelete}
      />
      
      {selectedCard && (
        <CardDetail
          card={selectedCard}
          isOpen={isCardDetailOpen}
          onClose={() => setIsCardDetailOpen(false)}
          onSave={handleCardEdit}
          onDelete={() => handleCardDelete(selectedCard.id)}
        />
      )}
    </div>
  );
};`}
      >
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="text-center space-y-3">
            <div className="h-8 w-8 sm:h-10 sm:w-10 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <Check className="text-primary-600 dark:text-primary-400 size-4 sm:size-5" />
            </div>
            <h3 className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-50">Enterprise Kanban Board</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              The Kanban Board component supports drag-and-drop, WIP limits, advanced filtering,
              real-time updates, and full TypeScript support for enterprise project management.
            </p>
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 pt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Drag & Drop</span>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">WIP Limits</span>
              <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">Filters</span>
              <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">Real-time</span>
              <span className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400">Statistics</span>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Card Detail Modal (hidden until triggered) */}
      {selectedCard && (
        <CardDetail
          card={selectedCard}
          isOpen={isCardDetailOpen}
          onClose={() => setIsCardDetailOpen(false)}
          onSave={(updates) => {
            console.log('Card saved:', updates);
            setIsCardDetailOpen(false);
          }}
          onDelete={() => {
            console.log('Card deleted:', selectedCard.id);
            setIsCardDetailOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default KanbanBoardView;