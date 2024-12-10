import { cn } from '@/lib/utils'; // Utility function for conditional class names if you're using shadcn/ui conventions
import React from 'react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children, className, ...props }) => {
  return (
    <aside
      className={cn(
        'flex flex-col h-full p-10 bg-white border-r border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
};

export default Sidebar;
