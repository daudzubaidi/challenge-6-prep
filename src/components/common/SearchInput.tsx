import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export const SearchInput = ({
  onSearch,
  placeholder = 'Search movies...',
  debounceMs = 300,
}: SearchInputProps) => {
  const [value, setValue] = useState('');
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | undefined>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      onSearch(newValue);
    }, debounceMs);

    setDebounceTimer(timer);
  };

  const handleClear = () => {
    setValue('');
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    onSearch('');
  };

  return (
    <div className="relative w-[243px]">
      <div className="relative h-[56px] backdrop-blur-[20px] bg-[rgba(10,13,18,0.6)] border border-[#252b37] rounded-[16px] flex items-center px-4 gap-2">
        <Search className="h-6 w-6 text-neutral-600 flex-shrink-0" />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-0 py-3 text-neutral-25 placeholder-neutral-600 focus:outline-none transition-all text-text-md"
        />
        {value && (
          <button
            onClick={handleClear}
            className="text-neutral-600 hover:text-neutral-25 transition-colors flex-shrink-0"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};
