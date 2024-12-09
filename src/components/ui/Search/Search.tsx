// SearchBar.tsx
import { cn } from '@/lib/utils'; // Asegúrate de tener esta función para concatenar clases
import { Search as SearchIcon } from 'lucide-react'; // Importa el ícono de la biblioteca lucide
import React from 'react';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const Search = ({ placeholder, className, ...props }: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <SearchIcon
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-800"
        size={24}
      />
      <input
        type="text"
        placeholder={placeholder || 'Search...'}
        className={cn(
          'w-full rounded-full pl-12 pr-4 py-3 border border-primary-200 text-primary-800 placeholder:text-primary-800 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    </div>
  );
};

export default Search;
