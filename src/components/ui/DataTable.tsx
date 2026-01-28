import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, Filter, Download, FileText, FileSpreadsheet, GripVertical, X } from 'lucide-react';
import { Input } from './Core';
import { Button } from './Button';
import { cn } from '../../utils';
import { Select } from './Form';
import { Dialog } from './Feedback';
import type { Column, DataTableProps, FilterConfig } from '../../types';



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
  enableFilters = false,
  enableColumnReorder = false,
  enableExport = false,
  onExport,
  onColumnsReorder,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [filters, setFilters] = useState<FilterConfig>({});
  const [showFilters, setShowFilters] = useState(false);
  const [reorderedColumns, setReorderedColumns] = useState(columns);
  const [draggingColumn, setDraggingColumn] = useState<string | null>(null);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);

   useEffect(() => {
    setReorderedColumns(columns);
  }, [columns]);

   const filteredData = data.filter(row => {
     if (searchable && searchTerm) {
      const matchesSearch = columns.some(col => {
        const value = row[col.key];
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
      });
      if (!matchesSearch) return false;
    }

     for (const [key, filter] of Object.entries(filters)) {
      if (!filter.value) continue;

      const cellValue = row[key];

      switch (filter.type) {
        case 'text':
          if (filter.operator === 'contains') {
            if (!cellValue?.toString().toLowerCase().includes(filter.value.toLowerCase())) {
              return false;
            }
          } else {
            if (cellValue?.toString().toLowerCase() !== filter.value.toLowerCase()) {
              return false;
            }
          }
          break;

        case 'select':
          if (!filter.value.includes(cellValue)) {
            return false;
          }
          break;

        case 'number':
          if (filter.operator === 'greaterThan') {
            if (Number(cellValue) <= Number(filter.value)) return false;
          } else if (filter.operator === 'lessThan') {
            if (Number(cellValue) >= Number(filter.value)) return false;
          } else {
            if (Number(cellValue) !== Number(filter.value)) return false;
          }
          break;

        case 'range':
          const [min, max] = filter.value;
          if (Number(cellValue) < min || Number(cellValue) > max) return false;
          break;

        case 'date':
           break;
      }
    }

    return true;
  });

   const sortedData = sortable && sortConfig
    ? [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    })
    : filteredData;

   const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = pagination
    ? sortedData.slice(startIndex, startIndex + pageSize)
    : sortedData;

   const handleDragStart = (e: React.DragEvent, columnKey: string) => {
    setDraggingColumn(columnKey);
    e.dataTransfer.setData('text/plain', columnKey);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnKey: string) => {
    e.preventDefault();
    if (!draggingColumn || draggingColumn === targetColumnKey) return;

    const newColumns = [...reorderedColumns];
    const dragIndex = newColumns.findIndex(col => String(col.key) === draggingColumn);
    const targetIndex = newColumns.findIndex(col => String(col.key) === targetColumnKey);

    if (dragIndex !== -1 && targetIndex !== -1) {
      const [draggedColumn] = newColumns.splice(dragIndex, 1);
      newColumns.splice(targetIndex, 0, draggedColumn);

      setReorderedColumns(newColumns);
      onColumnsReorder?.(newColumns);
    }

    setDraggingColumn(null);
  };

   const handleFilterChange = (columnKey: string, value: any, type: any, operator?: any) => {
    setFilters(prev => ({
      ...prev,
      [columnKey]: {
        type,
        value,
        operator,
      },
    }));
    setCurrentPage(1);
  };

  const clearFilter = (columnKey: string) => {
    const newFilters = { ...filters };
    delete newFilters[columnKey];
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({});
    setSearchTerm('');
    setCurrentPage(1);
  };

   const handleExport = (format: 'excel' | 'pdf' | 'csv') => {
    if (onExport) {
      onExport(format);
    } else {
       const exportData = sortedData.map(row => {
        const exportRow: any = {};
        reorderedColumns.forEach(col => {
          exportRow[col.label] = row[col.key];
        });
        return exportRow;
      });

      switch (format) {
        case 'csv':
          exportToCSV(exportData);
          break;
        case 'excel':
          exportToExcel(exportData);
          break;
        case 'pdf':
          exportToPDF(exportData);
          break;
      }
    }

    setExportDialogOpen(false);
  };

  const exportToCSV = (data: any[]) => {
    const headers = Object.keys(data[0] || {}).join(',');
    const rows = data.map(row =>
      Object.values(row).map(value =>
        typeof value === 'string' ? `"${value}"` : value
      ).join(',')
    ).join('\n');

    const csvContent = `${headers}\n${rows}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    downloadBlob(blob, 'data.csv');
  };

  const exportToExcel = (data: any[]) => {
     alert('Excel export would use xlsx library in production');
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    downloadBlob(blob, 'data.json');
  };

  const exportToPDF = (data: any[]) => {
     alert('PDF export would use jsPDF library in production');
    const content = data.map(row => JSON.stringify(row)).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    downloadBlob(blob, 'data.txt');
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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

  const renderFilterInput = (column: Column<T>) => {
    const filter = filters[String(column.key)];

    if (column.filterType === 'select' && column.filterOptions) {
      return (
        <Select
          options={column.filterOptions}
          value={filter?.value || ''}
          onChange={(value) => handleFilterChange(String(column.key), value, 'select')}
          className="w-full"
        />
      );
    }

    if (column.filterType === 'range') {
      return (
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filter?.value?.[0] || ''}
            onChange={(e) => handleFilterChange(
              String(column.key),
              [e.target.value, filter?.value?.[1] || ''],
              'range'
            )}
            className="w-full"
          />
          <Input
            type="number"
            placeholder="Max"
            value={filter?.value?.[1] || ''}
            onChange={(e) => handleFilterChange(
              String(column.key),
              [filter?.value?.[0] || '', e.target.value],
              'range'
            )}
            className="w-full"
          />
        </div>
      );
    }

     return (
      <Input
        placeholder={`Filter ${column.label}`}
        value={filter?.value || ''}
        onChange={(e) => handleFilterChange(
          String(column.key),
          e.target.value,
          column.filterType || 'text',
          column.filterType === 'number' ? 'equals' : 'contains'
        )}
        type={column.filterType === 'number' ? 'number' : 'text'}
        className="w-full"
      />
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
        <div className="flex-1 flex flex-wrap items-center gap-3">
          {searchable && (
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search in all columns..."
                leftIcon={<Search size={16} />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
          )}

          {enableFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={Object.keys(filters).length > 0 ? "border-primary-500 text-primary-600" : ""}
            >
              <Filter size={16} className="mr-2" />
              Filters {Object.keys(filters).length > 0 && `(${Object.keys(filters).length})`}
            </Button>
          )}

          {enableExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExportDialogOpen(true)}
            >
              <Download size={16} className="mr-2" />
              Export
            </Button>
          )}
        </div>

        {selectable && selectedRows.size > 0 && (
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {selectedRows.size} row(s) selected
          </div>
        )}
      </div>

       {showFilters && enableFilters && (
        <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-950">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-slate-900 dark:text-slate-50">Advanced Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              disabled={Object.keys(filters).length === 0 && !searchTerm}
            >
              Clear All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reorderedColumns
              .filter(col => col.filterable || col.filterType)
              .map((column) => {
                const filter = filters[String(column.key)];

                return (
                  <div key={String(column.key)} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {column.label}
                      </label>
                      {filter?.value && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => clearFilter(String(column.key))}
                          className="h-6 w-6 p-0"
                        >
                          <X size={14} />
                        </Button>
                      )}
                    </div>
                    {renderFilterInput(column)}
                  </div>
                );
              })}
          </div>

           {Object.keys(filters).length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap gap-2">
                {Object.entries(filters).map(([key, filter]) => {
                  const column = reorderedColumns.find(col => String(col.key) === key);
                  if (!column || !filter.value) return null;

                  return (
                    <div
                      key={key}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 text-sm"
                    >
                      <span className="font-medium">{column.label}:</span>
                      <span>{Array.isArray(filter.value) ? filter.value.join(' - ') : filter.value}</span>
                      <button
                        onClick={() => clearFilter(key)}
                        className="ml-1 hover:text-primary-900"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

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

              {reorderedColumns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 relative",
                    column.sortable && "cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-slate-800",
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    enableColumnReorder && "group"
                  )}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(String(column.key))}
                  draggable={enableColumnReorder}
                  onDragStart={(e) => handleDragStart(e, String(column.key))}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, String(column.key))}
                >
                  <div className={cn(
                    "flex items-center",
                    column.align === 'center' && 'justify-center',
                    column.align === 'right' && 'justify-end'
                  )}>
                    {enableColumnReorder && (
                      <GripVertical
                        className="mr-2 h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 cursor-move"
                        onMouseDown={(e) => e.stopPropagation()}
                      />
                    )}

                    {column.label}
                    <SortIcon columnKey={String(column.key)} />

                    {filters[String(column.key)]?.value && (
                      <div className="ml-2 h-2 w-2 rounded-full bg-primary-500"></div>
                    )}
                  </div>

                  {enableFilters && (column.filterable || column.filterType) && (
                    <div className="mt-2">
                      {renderFilterInput(column)}
                    </div>
                  )}
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

                  {reorderedColumns.map((column) => (
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
                  colSpan={reorderedColumns.length + (selectable ? 1 : 0) + (actionColumn ? 1 : 0)}
                  className="px-6 py-12 text-center"
                >
                  <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                    <Filter className="h-12 w-12 mb-4 opacity-20" />
                    <p className="text-lg font-medium">No data found</p>
                    {(searchable && searchTerm) || Object.keys(filters).length > 0 ? (
                      <p className="text-sm mt-1">
                        Try adjusting your search or filters
                        <Button
                          variant="link"
                          size="sm"
                          onClick={clearAllFilters}
                          className="ml-1"
                        >
                          Clear all
                        </Button>
                      </p>
                    ) : null}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

       {pagination && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 py-3 border-t border-slate-200 dark:border-slate-800">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(startIndex + pageSize, sortedData.length)}
            </span>{' '}
            of <span className="font-medium">{sortedData.length}</span> results
            {Object.keys(filters).length > 0 && (
              <span className="ml-2 text-primary-600 dark:text-primary-400">
                (Filtered from {data.length} total)
              </span>
            )}
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

       <Dialog
        isOpen={exportDialogOpen}
        onClose={() => setExportDialogOpen(false)}
        title="Export Data"
        size="sm"
      >
        <div className="space-y-4 py-4">
          <p className="text-slate-600 dark:text-slate-400">
            Choose export format for {sortedData.length} records
          </p>

          <div className="grid grid-cols-1 gap-3">
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => handleExport('excel')}
            >
              <FileSpreadsheet className="mr-3 h-5 w-5 text-green-600" />
              <div className="text-left">
                <div className="font-medium">Excel (.xlsx)</div>
                <div className="text-sm text-slate-500">Best for data analysis</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="justify-start"
              onClick={() => handleExport('csv')}
            >
              <FileText className="mr-3 h-5 w-5 text-blue-600" />
              <div className="text-left">
                <div className="font-medium">CSV (.csv)</div>
                <div className="text-sm text-slate-500">Universal format</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="justify-start"
              onClick={() => handleExport('pdf')}
            >
              <FileText className="mr-3 h-5 w-5 text-red-600" />
              <div className="text-left">
                <div className="font-medium">PDF (.pdf)</div>
                <div className="text-sm text-slate-500">For printing & sharing</div>
              </div>
            </Button>
          </div>

          {selectedRows.size > 0 && (
            <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <p className="text-sm text-primary-700 dark:text-primary-400">
                Note: Only {selectedRows.size} selected rows will be exported
              </p>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
}