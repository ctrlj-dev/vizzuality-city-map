'use client';

import { cn } from '@/lib/utils';
import { Search as SearchIcon } from 'lucide-react';
import React from 'react';
import { Input } from '../Input';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const Search = ({
  placeholder = 'Search...',
  className,
  ...props
}: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <SearchIcon
        role="img"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-800"
        size={24}
      />
      <Input
        type="text"
        placeholder={placeholder}
        className={cn(
          'w-full h-full rounded-full pl-12 pr-4 py-3 border border-primary-200 text-primary-800 font-medium focus-visible:outline-none focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-primary-800 placeholder:text-primary-800 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    </div>
  );
};

export default Search;
