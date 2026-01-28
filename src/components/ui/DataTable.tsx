import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, Filter  } from 'lucide-react';
import { Input } from './Core';
import { Button } from './Button';
import { cn } from '../../utils';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  sortable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  searchable?: boolean;
  selectable?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  className?: string;
  onRowClick?: (row: T) => void;
  actionColumn?: {
    label: string;
    actions: Array<{
      label: string;
      icon?: React.ReactNode;
      onClick: (row: T) => void;
      variant?: 'default' | 'destructive' | 'outline';
    }>;
  };
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  sortable = false,
  pagination = false,
  pageSize = 10,
  searchable = false,
  selectable = false,
  striped = true,
  hoverable = true,
  className,
  onRowClick,
  actionColumn,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // Filter data based on search
  const filteredData = searchable
    ? data.filter(row =>
        columns.some(col => {
          const value = row[col.key];
          return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
        })
      )
    : data;

  // Sort data
  const sortedData = sortable && sortConfig
    ? [...filteredData].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      })
    : filteredData;

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = pagination
    ? sortedData.slice(startIndex, startIndex + pageSize)
    : sortedData;

  const handleSort = (key: string) => {
    if (!sortable) return;
    
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map((_, index) => startIndex + index)));
    }
  };

  const handleSelectRow = (index: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
  };

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (!sortable) return null;
    
    if (!sortConfig || sortConfig.key !== columnKey) {
      return <ChevronsUpDown className="ml-1 h-4 w-4 opacity-50" />;
    }
    
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="ml-1 h-4 w-4" />
      : <ChevronDown className="ml-1 h-4 w-4" />;
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Toolbar */}
      {(searchable || selectable) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
          {searchable && (
            <div className="flex-1">
              <Input
                placeholder="Search..."
                leftIcon={<Search size={16} />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
            </div>
          )}
          
          {selectable && selectedRows.size > 0 && (
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {selectedRows.size} row(s) selected
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-slate-900/50">
            <tr>
              {selectable && (
                <th className="w-12 px-6 py-3">
                  <input
                    type="checkbox"
                    checked={paginatedData.length > 0 && selectedRows.size === paginatedData.length}
                    onChange={handleSelectAll}
                    className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 dark:border-slate-600"
                  />
                </th>
              )}
              
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400",
                    column.sortable && "cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-slate-800",
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right'
                  )}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(String(column.key))}
                >
                  <div className={cn(
                    "flex items-center",
                    column.align === 'center' && 'justify-center',
                    column.align === 'right' && 'justify-end'
                  )}>
                    {column.label}
                    <SortIcon columnKey={String(column.key)} />
                  </div>
                </th>
              ))}
              
              {actionColumn && (
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {actionColumn.label}
                </th>
              )}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={cn(
                    striped && rowIndex % 2 === 0 ? 'bg-slate-50/50 dark:bg-slate-900/30' : '',
                    hoverable && 'hover:bg-slate-100 dark:hover:bg-slate-800/50',
                    onRowClick && 'cursor-pointer'
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {selectable && (
                    <td className="whitespace-nowrap px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(startIndex + rowIndex)}
                        onChange={() => handleSelectRow(startIndex + rowIndex)}
                        className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 dark:border-slate-600"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                  )}
                  
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className={cn(
                        "whitespace-nowrap px-6 py-4 text-sm",
                        column.align === 'center' && 'text-center',
                        column.align === 'right' && 'text-right'
                      )}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key] !== undefined && row[column.key] !== null
                          ? row[column.key].toString()
                          : '-'}
                    </td>
                  ))}
                  
                  {actionColumn && (
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        {actionColumn.actions.map((action, actionIndex) => (
                          <Button
                            key={actionIndex}
                            size="sm"
                             onClick={(e) => {
                              e.stopPropagation();
                              action.onClick(row);
                            }}
                            className="h-7 px-2"
                          >
                            {action.icon}
                            <span className="hidden sm:inline">{action.label}</span>
                          </Button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length + (selectable ? 1 : 0) + (actionColumn ? 1 : 0)} 
                  className="px-6 py-12 text-center"
                >
                  <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                    <Filter className="h-12 w-12 mb-4 opacity-20" />
                    <p className="text-lg font-medium">No data found</p>
                    {searchable && searchTerm && (
                      <p className="text-sm mt-1">Try adjusting your search</p>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-800">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(startIndex + pageSize, sortedData.length)}
            </span>{' '}
            of <span className="font-medium">{sortedData.length}</span> results
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'primary' : 'outline'}
                    size="sm"
                    className="w-9 h-9 p-0"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}