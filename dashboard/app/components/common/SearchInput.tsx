import React, { useState, useEffect } from "react";
import { TextField, Box, InputAdornment } from "@mui/material";
import { SearchIcon } from "../icons/IconComponents";
interface SearchInputProps {
  value?: string;
  onSearchChange: (searchValue: string) => void;
  placeholder?: string;
  label?: string;
  debounceDelay?: number;
  disabled?: boolean;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: any;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value = "",
  onSearchChange,
  placeholder = "جستجو...",
  label = "جستجو",
  debounceDelay = 500,
  disabled = false,
  size = "small",
  fullWidth = false,
  sx = {},
}) => {
  const [localValue, setLocalValue] = useState<string>(value);

  // Initialize local value when prop value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localValue);
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [localValue, debounceDelay, onSearchChange]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(event.target.value);
  };

  return (
    <Box sx={{ ...sx, mt: 2 }}>
      <TextField
        label={label}
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        variant="outlined"
        size={size}
        fullWidth={fullWidth}
        disabled={disabled}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          sx: {
            fontSize: '0.875rem',
          },
        }}
        InputLabelProps={{
          sx: {
            fontSize: '0.875rem',
          },
        }}
        sx={{
          minWidth: fullWidth ? 'auto' : 320,
          '& .MuiInputBase-input::placeholder': {
            fontSize: '0.8125rem',
            opacity: 0.7,
          },
        }}
      />
    </Box>
  );
};

export default SearchInput;
