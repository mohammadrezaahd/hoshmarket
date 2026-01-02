import {
  Autocomplete,
  TextField,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Box,
  Skeleton,
  Stack,
} from "@mui/material";
import { useEffect, useState, useCallback, useRef } from "react";
import type { ICategoryList } from "~/types/interfaces/categories.interface";
import { useCategoriesList } from "~/api/categories.api";

const SectionCard = ({ title, children, ...props }: any) => (
  <Card sx={{ p: 2, ...props.sx }} {...props}>
    <CardContent>{children}</CardContent>
  </Card>
);

interface CategorySelectorProps {
  selectedCategory: ICategoryList | null;
  onCategoryChange: (category: ICategoryList | null) => void;
  // Props-based mode (optional - if provided, uses these instead of fetching)
  categories?: ICategoryList[];
  loadingCategories?: boolean;
  onSearchChange?: (search: string) => void;
  suggestedCategories?: ICategoryList[];
  loadingSuggestions?: boolean;
  // Styling
  title?: string;
  sx?: any;
  // Enabled/Disabled state
  enabled?: boolean;
}

const CategorySelector = ({
  selectedCategory,
  onCategoryChange,
  categories: externalCategories,
  loadingCategories: externalLoading,
  onSearchChange: externalOnSearchChange,
  suggestedCategories,
  loadingSuggestions,
  title = "دسته‌بندی قالب",
  sx,
  enabled = true,
}: CategorySelectorProps) => {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Determine if using props-based mode or autonomous mode
  const isPropsMode = externalCategories !== undefined;

  // Fetch categories based on search (autonomous mode only)
  const { data: categoriesData, isLoading: autonomousLoading } =
    useCategoriesList(isPropsMode ? "" : searchQuery, 1, 50);

  // Use either external categories or fetched ones
  const categories = isPropsMode
    ? externalCategories
    : (categoriesData?.data?.items ?? []);
  const loadingCategories = isPropsMode
    ? (externalLoading ?? false)
    : autonomousLoading;

  // Debounced search
  const handleInputChange = useCallback(
    (search: string) => {
      setInputValue(search);

      // Call external onSearchChange if provided (props mode)
      if (isPropsMode && externalOnSearchChange) {
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
        }
        searchTimeoutRef.current = setTimeout(() => {
          externalOnSearchChange(search);
        }, 300);
      } else if (!isPropsMode) {
        // Autonomous mode - update searchQuery
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
        }
        searchTimeoutRef.current = setTimeout(() => {
          setSearchQuery(search);
        }, 300);
      }
    },
    [isPropsMode, externalOnSearchChange]
  );

  const handleSuggestionClick = (suggestion: ICategoryList) => {
    onCategoryChange(suggestion);
    setInputValue(suggestion.title);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Grid size={{ xs: 12 }}>
      <SectionCard title={title} sx={sx}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Autocomplete
              fullWidth
              options={categories}
              getOptionLabel={(option) => option.title}
              value={selectedCategory}
              inputValue={inputValue}
              onChange={(_, newValue) => {
                onCategoryChange(newValue);
              }}
              onInputChange={(_, newInputValue) => {
                handleInputChange(newInputValue);
              }}
              loading={loadingCategories}
              disabled={!enabled}
              noOptionsText="دسته‌بندی یافت نشد"
              loadingText="در حال جستجو..."
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="دسته‌بندی دیجی‌کالا"
                  placeholder="جستجو..."
                />
              )}
            />
          </Grid>

          {/* Suggested Categories Section */}
          {suggestedCategories && suggestedCategories.length > 0 && (
            <Grid size={{ xs: 12 }}>
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, color: "text.secondary" }}
                >
                  پیشنهادات:
                </Typography>
                {loadingSuggestions ? (
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        variant="rounded"
                        width={80}
                        height={32}
                        sx={{ borderRadius: 2 }}
                      />
                    ))}
                  </Stack>
                ) : (
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {suggestedCategories?.map((suggestion) => (
                      <Chip
                        key={suggestion.id}
                        label={suggestion.title}
                        variant="outlined"
                        clickable={enabled}
                        disabled={!enabled}
                        onClick={() =>
                          enabled && handleSuggestionClick(suggestion)
                        }
                        sx={{
                          fontSize: "0.875rem",
                          transition: 'all 0.2s ease-in-out',
                          "&:hover": {
                            backgroundColor: "#6C5CE7 !important",
                            borderColor: "#6C5CE7 !important",
                            color: "#ffffff !important",
                          },
                        }}
                      />
                    ))}
                  </Stack>
                )}
              </Box>
            </Grid>
          )}
        </Grid>
      </SectionCard>
    </Grid>
  );
};

export default CategorySelector;
