'use client';

import { cn, Option } from '@/lib/utils';
import { Check, MapPin } from 'lucide-react';
import React from 'react';
import { Button } from '../Button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../Command';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';

export type ComboBoxProps = {
  label?: string;
  icon?: React.ReactNode;
  defaultValue?: string;
  options: Option[];
  align?: 'center' | 'start' | 'end';
  onSelect: (value: string) => void;
};

const Combobox = ({
  label,
  icon,
  options,
  onSelect,
  align = 'center',
  defaultValue,
}: ComboBoxProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(defaultValue || '');
  const label_ = label ? label : 'Option';

  const sortedOptions = options.sort(a => {
    if (a.value === selectedValue) {
      return -1;
    }
    return 0;
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-full flex items-center justify-between"
        >
          {icon ? (
            icon
          ) : (
            <MapPin role="img" className="text-primary-800 mr-2" size={16} />
          )}
          {selectedValue
            ? options.find(option => option.value === selectedValue)?.label
            : label_}
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-[200px] p-0 bg-background">
        <Command
          filter={(value, search) => {
            const selectedLabel = options
              .find(option => option.value === value)
              ?.label.toLowerCase();

            if (
              selectedLabel &&
              selectedLabel.toLowerCase().includes(search.toLowerCase())
            ) {
              return 1;
            }

            return 0;
          }}
        >
          {' '}
          <CommandInput placeholder={`Search ${label?.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No {label?.toLocaleLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {sortedOptions.map(option => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={currentValue => {
                    const value =
                      currentValue === selectedValue ? '' : currentValue;
                    setSelectedValue(value);
                    onSelect(value);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex items-center py-2',
                    selectedValue === option.value
                      ? 'bg-primary-100 text-primary-900'
                      : 'hover:bg-primary-100 hover:text-primary-900',
                    'focus:bg-primary-200'
                  )}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedValue === option.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
