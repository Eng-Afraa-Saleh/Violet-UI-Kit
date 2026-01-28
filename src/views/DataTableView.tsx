 import { Edit, Trash2, Eye, Mail,  User, Check  } from 'lucide-react';
  import { Badge } from '../components/ui/Core';
 import { DataTable, type Column } from '../components/ui/DataTable';
import ComponentPreview from './ComponentPreview';

// نوع البيانات للمثال
interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  salary: number;
}

const DataTableView = () => {
 
  // بيانات المثال
  const sampleData: UserData[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinDate: '2023-01-15', salary: 75000 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', status: 'active', joinDate: '2023-02-20', salary: 65000 },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Designer', status: 'pending', joinDate: '2023-03-10', salary: 55000 },
    { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'Manager', status: 'active', joinDate: '2023-04-05', salary: 85000 },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', role: 'Developer', status: 'inactive', joinDate: '2023-05-12', salary: 60000 },
    { id: 6, name: 'Sarah Davis', email: 'sarah@example.com', role: 'Designer', status: 'active', joinDate: '2023-06-18', salary: 58000 },
    { id: 7, name: 'David Miller', email: 'david@example.com', role: 'Admin', status: 'pending', joinDate: '2023-07-22', salary: 72000 },
    { id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', role: 'Manager', status: 'active', joinDate: '2023-08-30', salary: 90000 },
    { id: 9, name: 'James Taylor', email: 'james@example.com', role: 'Developer', status: 'active', joinDate: '2023-09-14', salary: 68000 },
    { id: 10, name: 'Emma Thomas', email: 'emma@example.com', role: 'Designer', status: 'inactive', joinDate: '2023-10-25', salary: 52000 },
  ];

  // الأعمدة الأساسية
  const basicColumns: Column<UserData>[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
  ];

  // أعمدة متقدمة مع render مخصص
  const advancedColumns: Column<UserData>[] = [
    { 
      key: 'name', 
      label: 'Employee', 
      sortable: true,
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
      label: 'Contact', 
      sortable: true,
      render: (value) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Mail size={12} className="text-slate-400" />
            <span>{value}</span>
          </div>
        </div>
      )
    },
    { 
      key: 'role', 
      label: 'Role', 
      sortable: true,
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
      key: 'status', 
      label: 'Status', 
      sortable: true,
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
      align: 'right',
      render: (value) => (
        <div className="font-medium">
          ${value.toLocaleString()}
        </div>
      )
    },
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

      {/* Advanced Table */}
      <ComponentPreview
        title="Advanced Table"
        description="Full-featured table with search, pagination, selection, and custom rendering."
        code={`const advancedColumns: Column<UserData>[] = [
  { 
    key: 'name', 
    label: 'Employee',
    render: (value, row) => (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-primary-100">
          <User size={14} />
        </div>
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-xs">ID: {row.id}</div>
        </div>
      </div>
    )
  },
  // ... more columns with custom render
];

<DataTable
  columns={advancedColumns}
  data={sampleData}
  sortable
  pagination
  pageSize={5}
  searchable
  selectable
  striped
  hoverable
  actionColumn={actionColumn}
/>`}
      >
        <DataTable
          columns={advancedColumns}
          data={sampleData}
          sortable
          pagination
          pageSize={5}
          searchable
          selectable
          striped
          hoverable
          actionColumn={actionColumn}
        />
      </ComponentPreview>

      {/* Table with Row Click */}
      <ComponentPreview
        title="Interactive Table"
        description="Table with row click events and compact design."
        code={`<DataTable
  columns={basicColumns}
  data={sampleData}
  onRowClick={(row) => alert(\`Clicked: \${row.name}\`)}
  className="border-0"
  striped={false}
/>`}
      >
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
          <DataTable
            columns={basicColumns}
            data={sampleData.slice(0, 4)}
            onRowClick={(row) => alert(`Clicked row: ${row.name}`)}
            className="border-0"
            striped={false}
          />
        </div>
      </ComponentPreview>

      {/* Usage Example */}
      <ComponentPreview
        title="Implementation Example"
        description="Complete code example showing how to implement the DataTable component."
        code={`import { DataTable, Column } from '../components/ui/DataTable';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const ProductTable = () => {
  const products: Product[] = [...];
  
  const columns: Column<Product>[] = [
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { 
      key: 'price', 
      label: 'Price', 
      sortable: true,
      render: (value) => \`$\${value.toFixed(2)}\`
    },
    { 
      key: 'stock', 
      label: 'Stock', 
      sortable: true,
      render: (value) => (
        <Badge variant={value > 10 ? 'success' : 'destructive'}>
          {value} units
        </Badge>
      )
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={products}
      sortable
      pagination
      searchable
      pageSize={10}
    />
  );
};`}
      >
        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="text-center space-y-3">
            <div className="h-10 w-10 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <Check className="text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="font-medium text-slate-900 dark:text-slate-50">Ready to Implement</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Copy the code example and customize the columns and data structure for your use case.
              The DataTable component is fully typed with TypeScript.
            </p>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
};

export default DataTableView;