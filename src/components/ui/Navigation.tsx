import React, { useState, useRef, useEffect } from 'react';
 import { Menu, X, ChevronDown, Bell, Search, User, Home, Settings, Heart, Image as ImageIcon, Check } from 'lucide-react';
import { Button } from './Button';
import {  Avatar, Badge } from './Core';
import { cn } from '../../utils';

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean;
  glass?: boolean;
  isBordered?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Navbar = ({ 
  className, 
  children, 
  sticky = false, 
  glass = false,
  isBordered = true,
  ...props 
}: NavbarProps) => {
  return (
    <nav
      className={cn(
        "w-full z-40 transition-all duration-300",
        sticky && "sticky top-0",
        glass && "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md",
        !glass && "bg-white dark:bg-slate-950",
        isBordered && "border-b border-slate-200 dark:border-slate-800",
        className
      )}
      {...props}
    >
      {children}
    </nav>
  );
};

export const NavContainer = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8", className)} {...props}>
    {children}
  </div>
);

export const NavBrand = ({ className, children, href = "#", ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a 
    href={href}
    className={cn("flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 dark:text-white", className)}
    {...props}
  >
    {children}
  </a>
);

export const NavMenu = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("hidden lg:flex lg:gap-x-8 items-center", className)} {...props}>
    {children}
  </div>
);

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  className?: string;
  children?: React.ReactNode;
  href?: string;
}

export const NavLink = ({ className, children, active, ...props }: NavLinkProps) => (
  <a
    className={cn(
      "text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer",
      active ? "text-primary-600 dark:text-primary-400" : "text-slate-600 dark:text-slate-300",
      className
    )}
    {...props}
  >
    {children}
  </a>
);

interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export const MobileMenuToggle = ({ isOpen, onToggle, className }: MobileMenuToggleProps) => (
  <div className={cn("lg:hidden", className)}>
    <Button variant="ghost" size="icon" onClick={onToggle} aria-label="Toggle menu">
      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </Button>
  </div>
);

interface MobileMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const MobileMenu = ({ isOpen, children, className, ...props }: MobileMenuProps) => (
  <div
    className={cn(
      "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
      isOpen ? "max-h-[800px] opacity-100 border-b border-slate-200 dark:border-slate-800" : "max-h-0 opacity-0",
      className
    )}
    {...props}
  >
    <div className="space-y-1 px-4 pb-3 pt-2">
      {children}
    </div>
  </div>
);

export const MobileNavLink = ({ className, children, active, ...props }: NavLinkProps) => (
  <a
    className={cn(
      "block rounded-md px-3 py-2 text-base font-medium transition-colors",
      active 
        ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400" 
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
      className
    )}
    {...props}
  >
    {children}
  </a>
);

// --- Dropdown Support Components ---

export const NavDropdown = ({ label, children }: { label: React.ReactNode, children?: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => setIsOpen(false), 100);
  };

  return (
    <div 
      className="relative flex items-center h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className={cn(
          "flex items-center gap-1 text-sm font-medium transition-colors outline-none",
          isOpen ? "text-primary-600 dark:text-primary-400" : "text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400"
        )}
      >
        {label}
        <ChevronDown size={14} className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
      </button>
      
      <div 
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 pt-4 w-screen max-w-sm sm:max-w-md md:max-w-xl lg:max-w-3xl z-50 transition-all duration-200 origin-top",
          isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible pointer-events-none"
        )}
      >
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Notification Component ---

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  avatar?: string;
  type: 'info' | 'success' | 'alert';
}

export const NavNotification = ({ 
  className 
}: { 
  className?: string; 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'New message',
      message: 'Sarah sent you a direct message regarding the project.',
      time: '2m ago',
      unread: true,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      type: 'info'
    },
    {
      id: '2',
      title: 'Payment successful',
      message: 'Your subscription for Pro Plan has been renewed.',
      time: '1h ago',
      unread: true,
      type: 'success'
    },
    {
      id: '3',
      title: 'Security alert',
      message: 'New login detected from a Safari browser in London.',
      time: '5h ago',
      unread: false,
      type: 'alert'
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const toggleRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: !n.unread } : n));
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsOpen(!isOpen)} 
        className={cn("relative text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50", className)}
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-2.5 right-2.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white dark:border-slate-950"></span>
          </span>
        )}
      </Button>

      {/* Dropdown Menu */}
      <div 
        className={cn(
          "absolute right-0 top-full mt-2 w-80 sm:w-96 z-50 overflow-hidden transition-all duration-200 origin-top-right",
          isOpen ? "opacity-100 translate-y-0 visible scale-100" : "opacity-0 -translate-y-2 invisible scale-95 pointer-events-none"
        )}
      >
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[500px]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              Notifications
              {unreadCount > 0 && <Badge variant="destructive" className="px-1.5 py-0 min-w-[18px] justify-center">{unreadCount}</Badge>}
            </h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-[11px] font-bold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors uppercase tracking-wider"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {notifications.map((n) => (
                  <div 
                    key={n.id} 
                    onClick={() => toggleRead(n.id)}
                    className={cn(
                      "flex gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group",
                      n.unread && "bg-primary-50/30 dark:bg-primary-900/10"
                    )}
                  >
                    <div className="relative flex-shrink-0">
                      {n.avatar ? (
                        <Avatar src={n.avatar} fallback={n.title} className="h-10 w-10" />
                      ) : (
                        <div className={cn(
                          "h-10 w-10 rounded-full flex items-center justify-center",
                          n.type === 'info' ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" :
                          n.type === 'success' ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" :
                          "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        )}>
                          {n.type === 'info' ? <ImageIcon size={18} /> : 
                           n.type === 'success' ? <Check size={18} /> : 
                           <AlertCircleIcon size={18} />}
                        </div>
                      )}
                      {n.unread && <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-blue-500 border-2 border-white dark:border-slate-900"></span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <h4 className={cn("text-sm truncate", n.unread ? "font-bold text-slate-900 dark:text-white" : "font-medium text-slate-600 dark:text-slate-400")}>{n.title}</h4>
                        <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">{n.time}</span>
                      </div>
                      <p className={cn("text-xs leading-relaxed", n.unread ? "text-slate-700 dark:text-slate-300" : "text-slate-500 dark:text-slate-500")}>
                        {n.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
                  <Bell size={24} />
                </div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">No new notifications</p>
                <p className="text-xs text-slate-500 mt-1">We'll notify you when something happens.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-100 dark:border-slate-800 p-2">
            <Button variant="ghost" className="w-full text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">
              View All Notifications
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AlertCircleIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);

// --- Compound Components for common patterns ---

export const SimpleNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Navbar sticky glass>
      <NavContainer>
        <NavBrand>
            <div className="h-6 w-6 rounded bg-primary-600" />
            <span>Brand</span>
        </NavBrand>
        <NavMenu>
          <NavLink href="#" active>Home</NavLink>
          <NavLink href="#">Features</NavLink>
          <NavLink href="#">Pricing</NavLink>
          <NavLink href="#">About</NavLink>
          <div className="ml-4 flex items-center gap-1">
            <NavNotification />
            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>
            <Button variant="ghost" size="sm">Log in</Button>
            <Button size="sm">Sign up</Button>
          </div>
        </NavMenu>
        <div className="flex items-center gap-2 lg:hidden">
            <NavNotification />
            <MobileMenuToggle isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
        </div>
      </NavContainer>
      <MobileMenu isOpen={isOpen}>
        <MobileNavLink href="#" active>Home</MobileNavLink>
        <MobileNavLink href="#">Features</MobileNavLink>
        <MobileNavLink href="#">Pricing</MobileNavLink>
        <MobileNavLink href="#">About</MobileNavLink>
        <div className="mt-4 flex flex-col gap-2">
            <Button variant="outline" className="w-full justify-center">Log in</Button>
            <Button className="w-full justify-center">Sign up</Button>
        </div>
      </MobileMenu>
    </Navbar>
  );
};

// --- New: Visual Mega Menu Navbar ---
export const VisualMegaNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Navbar sticky glass className="border-b-0 shadow-sm z-50">
      <NavContainer>
        <NavBrand>
           <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
             VIVID
           </span>
        </NavBrand>
        
        <NavMenu>
           <NavLink href="#">New Arrivals</NavLink>
           
           {/* Dropdown with Images */}
           <NavDropdown label="Collections">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Card 1 */}
                 <div className="group cursor-pointer space-y-3">
                    <div className="overflow-hidden rounded-lg aspect-[4/3]">
                       <img 
                          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                          alt="Fashion" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                       />
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">Women's Fashion</h4>
                       <p className="text-xs text-slate-500 mt-1">Explore the latest trends in summer wear.</p>
                    </div>
                 </div>
                 
                 {/* Card 2 */}
                 <div className="group cursor-pointer space-y-3">
                    <div className="overflow-hidden rounded-lg aspect-[4/3]">
                       <img 
                          src="https://images.unsplash.com/photo-1488161628813-99c974c76949?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                          alt="Streetwear" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                       />
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">Urban Streetwear</h4>
                       <p className="text-xs text-slate-500 mt-1">Bold looks for the modern city life.</p>
                    </div>
                 </div>

                 {/* Card 3 */}
                 <div className="group cursor-pointer space-y-3">
                    <div className="overflow-hidden rounded-lg aspect-[4/3]">
                       <img 
                          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                          alt="Accessories" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                       />
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors">Accessories</h4>
                       <p className="text-xs text-slate-500 mt-1">Complete your look with our new items.</p>
                    </div>
                 </div>
              </div>
              <div className="mt-6 bg-slate-50 dark:bg-slate-800/50 -m-6 p-4 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Seasonal Sale is Live</span>
                  <a href="#" className="text-sm font-bold text-primary-600 hover:underline">View All Collections &rarr;</a>
              </div>
           </NavDropdown>

           <NavLink href="#">Editorial</NavLink>
        </NavMenu>

        <div className="hidden lg:flex items-center gap-4">
           <Button variant="ghost" size="icon"><Search size={20} /></Button>
           <Button variant="ghost" size="icon"><Heart size={20} /></Button>
           <NavNotification />
           <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800"></div>
           <Button>Shop Now</Button>
        </div>
        
        <div className="flex items-center gap-2 lg:hidden">
            <NavNotification />
            <MobileMenuToggle isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
        </div>
      </NavContainer>
      <MobileMenu isOpen={isOpen}>
         <MobileNavLink href="#">New Arrivals</MobileNavLink>
         <MobileNavLink href="#">Collections</MobileNavLink>
         <MobileNavLink href="#">Editorial</MobileNavLink>
         <div className="p-4 grid grid-cols-2 gap-4">
             <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="rounded-lg w-full h-24 object-cover" />
             <img src="https://images.unsplash.com/photo-1488161628813-99c974c76949?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" className="rounded-lg w-full h-24 object-cover" />
         </div>
      </MobileMenu>
    </Navbar>
  );
};

// --- New: Profile / Dashboard Navbar ---
export const ProfileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar className="bg-slate-900 text-white border-b border-slate-800">
       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-2 font-bold text-xl">
                <div className="bg-indigo-500 p-1 rounded-lg">
                   <Settings className="text-white h-5 w-5" />
                </div>
                <span>DevDash</span>
             </div>
             <div className="hidden md:flex items-center gap-6">
                <a href="#" className="text-sm font-medium text-slate-300 hover:text-white">Overview</a>
                <a href="#" className="text-sm font-medium text-white">Projects</a>
                <a href="#" className="text-sm font-medium text-slate-300 hover:text-white">Team</a>
             </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden md:flex relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-slate-800 border-none rounded-full py-2 pl-9 pr-4 text-sm text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 w-64 transition-all"
                />
             </div>
             <NavNotification className="text-slate-300 hover:bg-slate-800 hover:text-white" />
             <div className="h-8 w-[1px] bg-slate-800 mx-1"></div>
             <div className="flex items-center gap-3 pl-1 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="text-right hidden sm:block">
                   <div className="text-sm font-medium">Alex Morgan</div>
                   <div className="text-xs text-slate-400">Pro Member</div>
                </div>
                <div className="relative">
                   <Avatar 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                      fallback="AM" 
                      className="h-9 w-9 border-2 border-indigo-500" 
                   />
                   <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-slate-900"></div>
                </div>
             </div>
             <MobileMenuToggle isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} className="text-white hover:bg-slate-800" />
          </div>
       </div>
       <MobileMenu isOpen={isOpen} className="bg-slate-900 border-slate-800 text-white">
          <MobileNavLink href="#" className="text-slate-300 hover:bg-slate-800 hover:text-white">Overview</MobileNavLink>
          <MobileNavLink href="#" active className="bg-slate-800 text-white">Projects</MobileNavLink>
          <MobileNavLink href="#" className="text-slate-300 hover:bg-slate-800 hover:text-white">Team</MobileNavLink>
       </MobileMenu>
    </Navbar>
  );
};

// --- New: Floating Dock Navbar ---
export const FloatingDock = () => {
    return (
        <div className="flex justify-center w-full py-6">
            <div className="flex items-center gap-2 px-3 py-3 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl">
                {[
                    { icon: <Home size={20} />, label: "Home", active: true },
                    { icon: <User size={20} />, label: "Profile" },
                    { icon: <ImageIcon size={20} />, label: "Gallery" },
                    { icon: <Heart size={20} />, label: "Likes" },
                    { icon: <Settings size={20} />, label: "Settings" }
                ].map((item, i) => (
                    <div key={i} className="group relative">
                        <button 
                            className={cn(
                                "flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 hover:scale-110",
                                item.active 
                                    ? "bg-primary-600 text-white shadow-lg shadow-primary-600/30" 
                                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                            )}
                        >
                            {item.icon}
                        </button>
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {item.label}
                        </span>
                        {item.active && (
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/50 rounded-full"></span>
                        )}
                    </div>
                ))}
                <div className="w-[1px] h-8 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                 <div className="group relative">
                    <button className="w-12 h-12 rounded-xl overflow-hidden hover:scale-110 transition-transform duration-300 border-2 border-transparent hover:border-primary-500">
                         <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" alt="User" className="w-full h-full object-cover" />
                    </button>
                    {/* Floating Dock Notification */}
                     <span className="absolute top-0 right-0 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white dark:border-slate-800"></span>
                    </span>
                 </div>
            </div>
        </div>
    );
};