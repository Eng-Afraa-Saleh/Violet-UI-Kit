import  { useState } from 'react';
import { Edit, Trash2, Eye, Mail, User, Check, Calendar, DollarSign } from 'lucide-react';
import { Badge } from '../components/ui/Core';
 import ComponentPreview from './ComponentPreview';
import type { Column, UserData } from '../types';
import { DataTable } from '../components/ui/DataTable';



const DataTableView = () => {
  const [columns, setColumns] = useState<Column<UserData>[]>([
    { 
      key: 'name', 
      label: 'Employee', 
      sortable: true,
      filterable: true,
      filterType: 'text',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
            <User size={14} />
          </div>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-xs text-slate-500">ID: {row.id}</div>
          </div>
        </div>
      )
    },
    { 
      key: 'email', 
      label: 'Email', 
      sortable: true,
      filterable: true,
      filterType: 'text',
      render: (value) => (
        <div className="flex items-center gap-2">
          <Mail size={12} className="text-slate-400" />
          <span>{value}</span>
        </div>
      )
    },
    { 
      key: 'role', 
      label: 'Role', 
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { label: 'Admin', value: 'Admin' },
        { label: 'Manager', value: 'Manager' },
        { label: 'Developer', value: 'Developer' },
        { label: 'Designer', value: 'Designer' },
      ],
      render: (value) => (
        <Badge 
          variant={
            value === 'Admin' ? 'destructive' :
            value === 'Manager' ? 'warning' :
            'secondary'
          }
          className="capitalize"
        >
          {value}
        </Badge>
      )
    },
    { 
      key: 'department', 
      label: 'Department', 
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { label: 'Engineering', value: 'Engineering' },
        { label: 'Design', value: 'Design' },
        { label: 'Marketing', value: 'Marketing' },
        { label: 'Sales', value: 'Sales' },
        { label: 'HR', value: 'HR' },
      ],
      render: (value) => (
        <Badge variant="outline" className="capitalize">
          {value}
        </Badge>
      )
    },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Pending', value: 'pending' },
      ],
      render: (value) => (
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${
            value === 'active' ? 'bg-success-500' :
            value === 'pending' ? 'bg-warning-500' :
            'bg-slate-400'
          }`} />
          <span className="capitalize">{value}</span>
        </div>
      )
    },
    { 
      key: 'salary', 
      label: 'Salary', 
      sortable: true,
      filterable: true,
      filterType: 'range',
      align: 'right',
      render: (value) => (
        <div className="flex items-center justify-end gap-2">
          <DollarSign size={14} className="text-slate-400" />
          <span className="font-medium">
            ${value.toLocaleString()}
          </span>
        </div>
      )
    },
    { 
      key: 'joinDate', 
      label: 'Join Date', 
      sortable: true,
      filterable: true,
      filterType: 'date',
      render: (value) => (
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-slate-400" />
          <span>{value}</span>
        </div>
      )
    },
  ]);

  const sampleData: UserData[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', department: 'Engineering', status: 'active', joinDate: '2023-01-15', salary: 75000 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', department: 'Engineering', status: 'active', joinDate: '2023-02-20', salary: 65000 },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Designer', department: 'Design', status: 'pending', joinDate: '2023-03-10', salary: 55000 },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'Manager', department: 'Marketing', status: 'active', joinDate: '2023-04-05', salary: 85000 },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', role: 'Developer', department: 'Engineering', status: 'inactive', joinDate: '2023-05-12', salary: 60000 },
    { id: 6, name: 'Sarah Davis', email: 'sarah@example.com', role: 'Designer', department: 'Design', status: 'active', joinDate: '2023-06-18', salary: 58000 },
    { id: 7, name: 'David Miller', email: 'david@example.com', role: 'Admin', department: 'HR', status: 'pending', joinDate: '2023-07-22', salary: 72000 },
    { id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', role: 'Manager', department: 'Sales', status: 'active', joinDate: '2023-08-30', salary: 90000 },
    { id: 9, name: 'James Taylor', email: 'james@example.com', role: 'Developer', department: 'Engineering', status: 'active', joinDate: '2023-09-14', salary: 68000 },
    { id: 10, name: 'Emma Thomas', email: 'emma@example.com', role: 'Designer', department: 'Design', status: 'inactive', joinDate: '2023-10-25', salary: 52000 },
    { id: 11, name: 'Alex Johnson', email: 'alex@example.com', role: 'Developer', department: 'Engineering', status: 'active', joinDate: '2023-11-05', salary: 72000 },
    { id: 12, name: 'Sophia Wilson', email: 'sophia@example.com', role: 'Manager', department: 'Marketing', status: 'active', joinDate: '2023-12-15', salary: 88000 },
  ];

  const basicColumns: Column<UserData>[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ];

  const handleEdit = (row: UserData) => {
    alert(`Editing: ${row.name}`);
  };

  const handleDelete = (row: UserData) => {
    alert(`Deleting: ${row.name}`);
  };

  const handleView = (row: UserData) => {
    alert(`Viewing: ${row.name}`);
  };

  const handleExport = (format: 'excel' | 'pdf' | 'csv') => {
    alert(`Exporting data to ${format} format`);
   };

  const handleColumnsReorder = (newColumns: Column<UserData>[]) => {
    setColumns(newColumns);
  };

  const actionColumn = {
    label: 'Actions',
    actions: [
      {
        label: 'View',
        icon: <Eye size={14} />,
        onClick: handleView,
        variant: 'outline' as const,
      },
      {
        label: 'Edit',
        icon: <Edit size={14} />,
        onClick: handleEdit,
        variant: 'default' as const,
      },
      {
        label: 'Delete',
        icon: <Trash2 size={14} />,
        onClick: handleDelete,
        variant: 'destructive' as const,
      },
    ],
  };

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Data Table</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Interactive data tables with sorting, filtering, pagination, and row actions.
        </p>
      </div>

      {/* Table with Advanced Features */}
      <ComponentPreview
        title="Advanced Data Table"
        description="Full-featured table with filters, column reordering, and export options."
        code={`<DataTable
  columns={columns}
  data={sampleData}
  sortable
  pagination
  pageSize={5}
  searchable
  selectable
  striped
  hoverable
  enableFilters={true}
  enableColumnReorder={true}
  enableExport={true}
  actionColumn={actionColumn}
  onExport={handleExport}
  onColumnsReorder={handleColumnsReorder}
/>`}
      >
        <DataTable
          columns={columns}
          data={sampleData}
          sortable
          pagination
          pageSize={5}
          searchable
          selectable
          striped
          hoverable
          enableFilters={true}
          enableColumnReorder={true}
          enableExport={true}
          actionColumn={actionColumn}
          onExport={handleExport}
          onColumnsReorder={handleColumnsReorder}
        />
      </ComponentPreview>

      {/* Basic Table */}
      <ComponentPreview
        title="Basic Table"
        description="Simple table with sorting and default styling."
        code={`<DataTable
  columns={basicColumns}
  data={sampleData}
  sortable
/>`}
      >
        <DataTable
          columns={basicColumns}
          data={sampleData}
          sortable
        />
      </ComponentPreview>

      {/* Table with Filters */}
      <ComponentPreview
        title="Table with Filters"
        description="Table with column-specific filters and search."
        code={`<DataTable
  columns={columns.slice(0, 4)}
  data={sampleData}
  sortable
  searchable
  enableFilters={true}
  pagination
  pageSize={5}
/>`}
      >
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
          <DataTable
            columns={columns.slice(0, 4)}
            data={sampleData}
            sortable
            searchable
            enableFilters={true}
            pagination
            pageSize={5}
          />
        </div>
      </ComponentPreview>

      {/* Export Example */}
      <ComponentPreview
        title="Export Functionality"
        description="Table with export options to Excel, PDF, and CSV."
        code={`const handleExport = (format: 'excel' | 'pdf' | 'csv') => {
  alert(\`Exporting data to \${format} format\`);
  // Implement export logic here
};

<DataTable
  columns={basicColumns}
  data={sampleData.slice(0, 3)}
  enableExport={true}
  onExport={handleExport}
/>`}
      >
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
          <DataTable
            columns={basicColumns}
            data={sampleData.slice(0, 3)}
            enableExport={true}
            onExport={handleExport}
          />
        </div>
      </ComponentPreview>

      {/* Column Reordering Example */}
      <ComponentPreview
        title="Column Reordering"
        description="Drag and drop to reorder table columns."
        code={`<DataTable
  columns={columns.slice(0, 5)}
  data={sampleData.slice(0, 4)}
  enableColumnReorder={true}
  onColumnsReorder={handleColumnsReorder}
/>`}
      >
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
          <DataTable
            columns={columns.slice(0, 5)}
            data={sampleData.slice(0, 4)}
            enableColumnReorder={true}
            onColumnsReorder={handleColumnsReorder}
          />
        </div>
      </ComponentPreview>

      {/* Implementation Example */}
      <ComponentPreview
        title="Complete Implementation"
        description="Complete code example showing all advanced features."
        code={`import { DataTable, Column } from '../components/ui/DataTable';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'in-stock' | 'out-of-stock' | 'low-stock';
}

const ProductTable = () => {
  const [columns, setColumns] = useState<Column<Product>[]>([
    { 
      key: 'name', 
      label: 'Product Name', 
      sortable: true,
      filterable: true,
      filterType: 'text',
    },
    { 
      key: 'category', 
      label: 'Category', 
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { label: 'Electronics', value: 'electronics' },
        { label: 'Clothing', value: 'clothing' },
      ],
    },
    { 
      key: 'price', 
      label: 'Price', 
      sortable: true,
      filterable: true,
      filterType: 'range',
      render: (value) => \`$\${value.toFixed(2)}\`
    },
    { 
      key: 'stock', 
      label: 'Stock', 
      sortable: true,
      filterable: true,
      filterType: 'number',
      render: (value) => (
        <Badge variant={value > 10 ? 'success' : 'destructive'}>
          {value} units
        </Badge>
      )
    },
  ]);

  const products: Product[] = [...];

  const handleExport = (format: 'excel' | 'pdf' | 'csv') => {
    // Implement export logic
    console.log(\`Exporting to \${format}\`);
  };

  const handleColumnsReorder = (newColumns: Column<Product>[]) => {
    setColumns(newColumns);
  };

  return (
    <DataTable
      columns={columns}
      data={products}
      sortable
      pagination
      searchable
      enableFilters={true}
      enableColumnReorder={true}
      enableExport={true}
      onExport={handleExport}
      onColumnsReorder={handleColumnsReorder}
    />
  );
};`}
      >
        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="text-center space-y-3">
            <div className="h-10 w-10 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <Check className="text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="font-medium text-slate-900 dark:text-slate-50">Enterprise-Grade Data Table</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Now with advanced filters, column reordering, export functionality, and full TypeScript support.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Advanced Filters</span>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Drag & Drop</span>
              <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">Export to Excel</span>
              <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">Export to PDF</span>
              <span className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400">Column Reorder</span>
            </div>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
};

export default DataTableView;