import type { LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
export type SidebarCategory = "General" | "Data Display" | "Feedback" | "Navigation" | "Templates";

export interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  category: SidebarCategory;
}

export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
export type Size = 'sm' | 'md' | 'lg' | 'icon';

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

// --- Buttons ---
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
// --- Input ---
export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, BaseProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
}

export interface AvatarProps extends BaseProps {
  src?: string;
  alt?: string;
  fallback: string;
}
// --- Badge ---
export interface BadgeProps extends BaseProps {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning';
}
// --- Cards ---
export interface CardProps extends BaseProps {
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
}
// --- Alert ---
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  icon?: boolean;
}

// --- Textarea ---
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

// --- Gallery Image ---
export type GalleryLayout = 'grid' | 'masonry' | 'carousel' | 'justified';
export type GalleryMode = 'lightbox' | 'inline' | 'slideshow';
export type ImageFit = 'cover' | 'contain' | 'fill';

export interface GalleryImage {
  id: string | number;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
  thumbnail?: string;
  tags?: string[];
  liked?: boolean;
  downloads?: number;
}

export interface ImageGalleryProps {
  images: GalleryImage[];
  layout?: GalleryLayout;
  mode?: GalleryMode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: number;
  showThumbnails?: boolean;
  showControls?: boolean;
  showCaptions?: boolean;
  showOverlay?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  enableZoom?: boolean;
  enableDownload?: boolean;
  enableLike?: boolean;
  enableShare?: boolean;
  imageFit?: ImageFit;
  maxHeight?: number | string;
  className?: string;
  onImageClick?: (image: GalleryImage, index: number) => void;
  onLike?: (image: GalleryImage) => void;
  onDownload?: (image: GalleryImage) => void;
  onShare?: (image: GalleryImage) => void;
}

 export interface JustifiedGridProps {
  images: GalleryImage[];
  targetHeight?: number;
  gap?: number;
  className?: string;
  onImageClick?: (image: GalleryImage, index: number) => void;
}

// --- Navbar ---
export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean;
  glass?: boolean;
  isBordered?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  className?: string;
  children?: React.ReactNode;
  href?: string;
}
export interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}
export interface MobileMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  className?: string;
  children?: React.ReactNode;
}

// --- Notification Component ---

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  avatar?: string;
  type: 'info' | 'success' | 'alert';
}
// --- Slider ---
export type SliderVariant = 'default' | 'range' | 'gradient' | 'thumb' | 'vertical';
export type SliderSize = 'sm' | 'md' | 'lg';
export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  variant?: SliderVariant;
  sliderSize?: SliderSize;
  showValue?: boolean;
  showLabels?: boolean;
  showMarks?: boolean;
  marks?: number[];
  label?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  trackClassName?: string;
  thumbClassName?: string;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  formatValue?: (value: number) => string;
}

export interface RangeSliderProps {
  minValue?: number;
  maxValue?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  className?: string;
  onChange?: (values: { min: number; max: number }) => void;
  formatValue?: (value: number) => string;
}

// --- State Cards ---
export type StatVariant = 'default' | 'card' | 'minimal' | 'gradient' | 'glass' | 'highlight';
export type StatTrend = 'up' | 'down' | 'neutral';
export type StatSize = 'sm' | 'md' | 'lg' | 'xl';

export interface StatItem {
  id: string | number;
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  description?: string;
  trend?: StatTrend;
  trendValue?: number | string;
  icon?: React.ReactNode;
  color?: string;
  delay?: number;
  duration?: number;
  format?: 'number' | 'currency' | 'percent' | 'decimal';
  decimals?: number;
  loading?: boolean;
  target?: number;
  progress?: number;
}

export interface StatsProps {
  items: StatItem[];
  variant?: StatVariant;
  size?: StatSize;
  columns?: 1 | 2 | 3 | 4;
  animate?: boolean;
  autoAnimate?: boolean;
  animationDuration?: number;
  className?: string;
  onComplete?: () => void;
}

export interface SingleStatProps extends Omit<StatItem, 'id' | 'title'> {
  title?: string;
  variant?: StatVariant;
  size?: StatSize;
  className?: string;
  animate?: boolean;
}

// --- Data Table ---
export interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  filterable?: boolean;
  filterType?: 'text' | 'select' | 'date' | 'number' | 'range';
  filterOptions?: Array<{ label: string; value: any }>;
}

export interface FilterConfig {
  [key: string]: {
    type: 'text' | 'select' | 'date' | 'number' | 'range';
    value: any;
    operator?: 'equals' | 'contains' | 'greaterThan' | 'lessThan' | 'between';
  };
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
  enableFilters?: boolean;
  enableColumnReorder?: boolean;
  enableExport?: boolean;
  onExport?: (format: 'excel' | 'pdf' | 'csv') => void;
  onColumnsReorder?: (columns: Column<T>[]) => void;
}
export interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  salary: number;
  department: string;
}

// --- Dialog / Modal ---
export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

// --- Switch ---
export interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

// --- Checkbox ---
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

// --- Select (Native Wrapper) ---
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
  error?: string;
}

// --- Grid ---
export interface GridProps extends BaseProps {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 2 | 4 | 6 | 8;
}

//---Tabs---
export type TabVariant = 'default' | 'underline' | 'pills' | 'segmented' | 'vertical';
export type TabSize = 'sm' | 'md' | 'lg';

export interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
  variant: TabVariant;
  size: TabSize;
}
export interface TabsProps {
  defaultValue: string;
  variant?: TabVariant;
  size?: TabSize;
  className?: string;
  children: React.ReactNode;
  onChange?: (tabId: string) => void;
}
export interface TabsListProps {
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  centered?: boolean;
}
export interface TabTriggerProps {
  value: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}
export interface TabContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

//---Time Line---
export type TimelineItemType = 'default' | 'success' | 'warning' | 'error' | 'info' | 'primary';

export interface TimelineItem {
  id: string | number;
  title: string;
  description?: string;
  timestamp: string;
  time?: string;
  type?: TimelineItemType;
  icon?: React.ReactNode;
  color?: string;
  avatar?: string;
  user?: string;
  tags?: string[];
  action?: React.ReactNode;
  completed?: boolean;
  meta?: Record<string, any>;
}

export interface TimelineProps {
  items: TimelineItem[];
  mode?: 'default' | 'compact' | 'detailed';
  direction?: 'vertical' | 'horizontal';
  align?: 'left' | 'right' | 'alternate';
  showConnectors?: boolean;
  showDates?: boolean;
  animate?: boolean;
  className?: string;
  itemClassName?: string;
  onItemClick?: (item: TimelineItem) => void;
}

//---Chat Bot---
 export interface UniversalChatBotProps {
  apiKey: string;          
  model: string;           
  baseUrl?: string;        
  systemPrompt?: string;    
  title?: string;           
  welcomeMessage?: string;  
  primaryColor?: string;   
  language?: 'ar' | 'en';   
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

//---Kanban Board---
export type CardStatus = 'todo' | 'in-progress' | 'review' | 'done';
export type CardPriority = 'low' | 'medium' | 'high' | 'critical';
export type CardType = 'task' | 'bug' | 'feature' | 'improvement';

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  status: CardStatus;
  priority: CardPriority;
  type: CardType;
  assignee?: {
    id: string;
    name: string;
    avatar?: string;
  };
  dueDate?: string;
  tags?: string[];
  comments?: number;
  attachments?: number;
  watchers?: number;
  estimate?: string; // e.g., "3h", "1d"
  createdAt: string;
  updatedAt: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  status: CardStatus;
  color: string;
  wipLimit?: number; // Work in Progress limit
  cardIds: string[];
}

export interface KanbanBoardProps {
  columns?: KanbanColumn[];
  cards?: KanbanCard[];
  editable?: boolean;
  showFilters?: boolean;
  showSearch?: boolean;
  onCardMove?: (cardId: string, fromColumn: string, toColumn: string, position: number) => void;
  onCardAdd?: (columnId: string, card: Omit<KanbanCard, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCardEdit?: (cardId: string, updates: Partial<KanbanCard>) => void;
  onCardDelete?: (cardId: string) => void;
  onColumnAdd?: (title: string, status: CardStatus) => void;
  onColumnEdit?: (columnId: string, updates: Partial<KanbanColumn>) => void;
  onColumnDelete?: (columnId: string) => void;
  className?: string;
}

//---Backgrounds---
// في ملف types.ts - إضافة هذه الأنواع
export type BackgroundPattern = 
  | 'gradient' 
  | 'grid' 
  | 'dots' 
  | 'lines' 
  | 'waves' 
  | 'circuit' 
  | 'topography' 
  | 'stars' 
  | 'bubbles' 
  | 'hexagon' 
  | 'noise' 
  | 'abstract';

export type GradientType = 
  | 'linear' 
  | 'radial' 
  | 'conic' 
  | 'mesh';

export interface GradientStop {
  color: string;
  position: number;
}

export interface GradientConfig {
  type: GradientType;
  stops: GradientStop[];
  angle?: number;
  size?: number;
}

export interface BackgroundConfig {
  id: string | number;
  name: string;
  description?: string;
  pattern: BackgroundPattern;
  gradient?: GradientConfig;
  colors: string[];
  animated?: boolean;
  animationSpeed?: number;
  blur?: number;
  opacity?: number;
  className?: string;
}

export interface BackgroundPreviewProps {
  config: BackgroundConfig;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  className?: string;
  onSelect?: (config: BackgroundConfig) => void;
}

export interface BackgroundsGalleryProps {
  backgrounds: BackgroundConfig[];
  columns?: 2 | 3 | 4 | 5 | 6;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  showLabels?: boolean;
  className?: string;
  onBackgroundSelect?: (config: BackgroundConfig) => void;
  onBackgroundCopy?: (config: BackgroundConfig) => void;
}

export interface BackgroundGeneratorProps {
  defaultConfig?: Partial<BackgroundConfig>;
  onConfigChange?: (config: BackgroundConfig) => void;
  showControls?: boolean;
  className?: string;
}