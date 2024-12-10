'use client';
import { Option } from '@/lib/utils';
import { X as CloseIcon, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../Button';
import IconButton from '../IconButton/IconButton';
import { ExtendedPopover as Popover } from '../Popover';
import { Search } from '../Search';

type ComboBoxProps = {
  label?: string;
  icon?: React.ReactNode;
  options: Option[];
  value?: Option | null;
  onSelect?: (option: Option | null) => void;
};

const Combobox = ({
  label = 'Select',
  icon,
  options,
  value = null,
  onSelect,
}: ComboBoxProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState<Option | null>(value);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  const handleClearSelection = () => {
    setSelectedOption(null);
    if (onSelect) {
      onSelect(null);
    }
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <div className="flex flex-row items-center">
          <Button
            size="default"
            variant="outline"
            className="h-full flex items-center justify-between"
            onClick={() => setOpen(true)}
          >
            {icon ? (
              icon
            ) : (
              <MapPin role="img" className="text-primary-800 mr-2" size={16} />
            )}
            {selectedOption ? selectedOption.label : label}
          </Button>
          {selectedOption && (
            <IconButton
              icon={<CloseIcon size={12} />}
              size={'sm'}
              variant={'ghost'}
              className="ml-1"
              onClick={e => {
                e.stopPropagation();
                handleClearSelection();
              }}
            />
          )}
        </div>
      </Popover.Trigger>
      <Popover.Content
        align="end"
        className="w-[200] p-0 bg-white border border-primary-200 rounded-lg"
      >
        <Search
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className=" placeholder:text-primary-900/50 border-0 items-center border-zinc-400 border-b-2 rounded-b-none 
          focus-within:ring-0 focus-within:ring-offset-0"
        />
        <div className="max-h-48 overflow-y-auto p-2">
          {filteredOptions.length > 0 ? (
            filteredOptions.map(option => (
              <div
                key={option.value}
                className={`p-2 flex items-center cursor-pointer hover:bg-primary-100 text-primary-900 ${
                  selectedOption?.value === option.value
                    ? 'bg-primary-100 text-primary-900'
                    : ''
                }`}
                onClick={() => handleSelect(option)}
              >
                {selectedOption?.value === option.value && (
                  <span className="w-2 h-2 rounded-full bg-primary-800 mr-2" />
                )}
                {option.label}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No options found</div>
          )}
        </div>
      </Popover.Content>
    </Popover>
  );
};

export default Combobox;
