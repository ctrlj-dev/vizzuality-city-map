'use client';

import { cn } from '@/lib/utils';
import { X as ClearIcon, Search as SearchIcon } from 'lucide-react';
import React from 'react';
import { Input } from '../Input';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  onClear?: () => void; // Función para limpiar el contenido
}

const Search = ({
  placeholder = 'Search...',
  className,
  value,
  onChange,
  onClear,
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
        value={value}
        onChange={onChange}
        className={cn(
          'w-full h-full rounded-full pl-12 pr-12 py-3 border border-primary-200 text-primary-800 font-medium focus-visible:outline-none focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-primary-800 placeholder:text-primary-800 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
      {value && value.toString().length > 0 && (
        <button
          type="button"
          aria-label="Clear search"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary-800 hover:text-primary-900 focus:outline-none"
          onClick={onClear}
        >
          <ClearIcon size={20} />
        </button>
      )}
    </div>
  );
};

export default Search;
