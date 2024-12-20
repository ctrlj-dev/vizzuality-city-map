import { cn } from '@/lib/utils';
import React from 'react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children, className, ...props }) => {
  return (
    <aside
      className={cn(
        'relative flex flex-col p-4 lg:p-10 bg-white border-r border-gray-200 md:overflow-y-auto h-[100vh] animate-slide-in',
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
};

export default Sidebar;
