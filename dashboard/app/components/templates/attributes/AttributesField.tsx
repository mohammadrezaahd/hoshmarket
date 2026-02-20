import {
  TextField,
  Box,
  Autocomplete,
  Chip,
  IconButton,
  Tooltip,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import React from "react";
import {
  AttributeType,
  type ICategoryAttr,
  type IAttr,
} from "~/types/interfaces/attributes.interface";
import SuggestedValues from "./SuggestedValues";
import { useAiSuggest } from "~/api/ai.api";
import { ApiStatus } from "~/types";
import { useSnackbar } from "notistack";

import { AiIcon } from "~/components/icons/IconComponents";

// کامپوننت آیکون AI
const AIIcon: React.FC<{
  attr: IAttr;
  categoryId?: number | null;
  aiData?: ICategoryAttr;
  onValueChange: (value: any) => void;
}> = ({ attr, categoryId, aiData, onValueChange }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: suggestAi, isPending } = useAiSuggest();

  const extractAiValue = (data: any) => {
    if (!data || typeof data !== "object") return undefined;
    if (data.ai !== undefined && data.ai !== null) return data.ai;
    if (data.Ai !== undefined && data.Ai !== null) return data.Ai;
    if (data.value !== undefined && data.value !== null) return data.value;
    return undefined;
  };

  const handleAIClick = async () => {
    if (!categoryId || isPending) return;

    try {
      const response = await suggestAi({
        categoryId,
        id: attr.id,
        data: aiData,
      });

      if (response.status === ApiStatus.SUCCEEDED) {
        const suggestedValue = extractAiValue(response.data);
        if (suggestedValue !== undefined) {
          onValueChange(suggestedValue);
        }
        return;
      }

      enqueueSnackbar(
        response.message || response.error || "خطا در دریافت پیشنهاد هوش مصنوعی",
        { variant: "error" },
      );
    } catch (error: any) {
      enqueueSnackbar(
        error?.message || "خطا در دریافت پیشنهاد هوش مصنوعی",
        { variant: "error" },
      );
    }
  };

  return (
    <Tooltip title="کمک هوش مصنوعی" placement="top">
      <IconButton
        onClick={handleAIClick}
        size="small"
        disabled={!categoryId || isPending}
        sx={{
          padding: "4px",
          marginLeft: "4px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          "&:hover": {
            background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
            transform: "scale(1.05)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
          transition: "all 0.2s ease-in-out",
          width: "24px",
          height: "24px",
        }}
      >
        {isPending ? (
          <CircularProgress size={14} sx={{ color: "white" }} />
        ) : (
          <AiIcon style={{ fontSize: "16px" }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

interface AttributesFieldProps {
  attr: IAttr;
  value: any;
  onChange: (attrId: number | string, value: any) => void;
  error?: string;
  categoryId?: number | null;
  aiData?: ICategoryAttr;
}

export default function AttributesField({
  attr,
  value,
  onChange,
  error,
  categoryId,
  aiData,
}: AttributesFieldProps) {
  const fieldKey = attr.code || attr.id;

  const isMultiSelect = (attr: IAttr): boolean => {
    return attr.type === AttributeType.Checkbox;
  };

  const shouldUseAutocomplete = (attr: IAttr): boolean => {
    const valuesCount = Object.keys(attr.values).length;
    return (
      (attr.type === AttributeType.Select ||
        attr.type === AttributeType.Checkbox) &&
      valuesCount > 0
    );
  };

  switch (attr.type) {
    case AttributeType.Input:
      return (
        <Box>
          <TextField
            fullWidth
            type="text"
            label={attr.title + (attr.required ? " *" : "")}
            helperText={error || attr.hint}
            value={value || ""}
            onChange={(e) => onChange(fieldKey, e.target.value)}
            required={attr.required}
            error={!!error}
            InputProps={{
              endAdornment: (
                <Box sx={{ display: "flex", alignItems: "end", gap: 0.5 }}>
                  {(attr.postfix || attr.unit) && (
                    <Box
                      component="span"
                      sx={{
                        fontSize: "0.7rem",
                        color: "text.secondary",
                        whiteSpace: "nowrap",
                        marginLeft: ".5rem",
                      }}
                    >
                      {attr.postfix || attr.unit}
                    </Box>
                  )}
                  {attr.Ai && (
                    <AIIcon
                      attr={attr}
                      categoryId={categoryId}
                      aiData={aiData}
                      onValueChange={(nextValue) => onChange(fieldKey, nextValue)}
                    />
                  )}
                </Box>
              ),
            }}
          />
          <SuggestedValues
            attr={attr}
            currentValue={value}
            onSuggestionClick={(suggestion) => onChange(fieldKey, suggestion)}
          />
        </Box>
      );

    case AttributeType.Select:
    case AttributeType.Checkbox:
      if (shouldUseAutocomplete(attr)) {
        const options = Object.entries(attr.values).map(
          ([valueId, valueData]) => ({
            id: valueId,
            label: valueData.text,
            value: valueId,
          })
        );

        const isMulti = isMultiSelect(attr);

        if (!isMulti) {
          const selectedOption =
            options.find((option) => option.id === value) || null;

          return (
            <Box>
              <Autocomplete
                fullWidth
                openOnFocus
                options={options}
                getOptionLabel={(option) => option.label}
                value={selectedOption}
                onChange={(_, newValue) => {
                  onChange(fieldKey, newValue?.id || "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={attr.title + (attr.required ? " *" : "")}
                    required={attr.required}
                    helperText={error || attr.hint}
                    placeholder="انتخاب کنید..."
                    error={!!error}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          {params.InputProps.endAdornment}
                          {attr.Ai && (
                            <AIIcon
                              attr={attr}
                              categoryId={categoryId}
                              aiData={aiData}
                              onValueChange={(nextValue) =>
                                onChange(fieldKey, nextValue)
                              }
                            />
                          )}
                        </Box>
                      ),
                    }}
                  />
                )}
                noOptionsText="گزینه‌ای یافت نشد"
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
              <SuggestedValues
                attr={attr}
                currentValue={value}
                onSuggestionClick={(suggestion) =>
                  onChange(fieldKey, suggestion)
                }
              />
            </Box>
          );
        } else {
          const selectedOptions = options.filter(
            (option) => value?.includes(option.id) || false
          );

          return (
            <Box>
              <Autocomplete
                multiple
                fullWidth
                openOnFocus
                options={options}
                getOptionLabel={(option) => option.label}
                value={selectedOptions}
                onChange={(_, newValues) => {
                  const selectedIds = newValues.map((item) => item.id);
                  onChange(fieldKey, selectedIds);
                }}
                disableCloseOnSelect
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option.label}
                      {...getTagProps({ index })}
                      key={option.id}
                      size="small"
                      sx={{ zIndex: "9" }}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={attr.title + (attr.required ? " *" : "")}
                    required={attr.required}
                    helperText={error || attr.hint}
                    error={!!error}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          {params.InputProps.endAdornment}
                          {attr.Ai && (
                            <AIIcon
                              attr={attr}
                              categoryId={categoryId}
                              aiData={aiData}
                              onValueChange={(nextValue) =>
                                onChange(fieldKey, nextValue)
                              }
                            />
                          )}
                        </Box>
                      ),
                    }}
                  />
                )}
                noOptionsText="گزینه‌ای یافت نشد"
                isOptionEqualToValue={(option, value) => option.id === value.id}
                filterSelectedOptions
                limitTags={3}
                getLimitTagsText={(more) => `+${more} بیشتر`}
              />
              <SuggestedValues
                attr={attr}
                currentValue={value}
                onSuggestionClick={(suggestion) => {
                  if (typeof suggestion === "function") {
                    const newValue = suggestion(value);
                    onChange(fieldKey, newValue);
                  } else {
                    onChange(fieldKey, suggestion);
                  }
                }}
              />
            </Box>
          );
        }
      } else {
        // اگر values خالی است یا شرایط autocomplete برقرار نیست، یک TextField ساده نمایش بده
        return (
          <TextField
            fullWidth
            label={attr.title + (attr.required ? " *" : "")}
            helperText={error || attr.hint || "گزینه‌ای برای انتخاب وجود ندارد"}
            value=""
            disabled
            placeholder="گزینه‌ای موجود نیست"
            error={!!error}
          />
        );
      }

    case AttributeType.Text:
      return (
        <Box>
          <TextField
            fullWidth
            label={attr.title + (attr.required ? " *" : "")}
            helperText={error || attr.hint}
            value={value || ""}
            onChange={(e) => onChange(fieldKey, e.target.value)}
            required={attr.required}
            error={!!error}
            InputProps={{
              endAdornment: attr.Ai ? (
                <AIIcon
                  attr={attr}
                  categoryId={categoryId}
                  aiData={aiData}
                  onValueChange={(nextValue) => onChange(fieldKey, nextValue)}
                />
              ) : undefined,
            }}
          />
          <SuggestedValues
            attr={attr}
            currentValue={value}
            onSuggestionClick={(suggestion) => onChange(fieldKey, suggestion)}
          />
        </Box>
      );

    case AttributeType.MultiText:
      return (
        <Box>
          <TextField
            fullWidth
            multiline
            rows={3}
            label={attr.title + (attr.required ? " *" : "")}
            helperText={error || attr.hint}
            value={value || ""}
            onChange={(e) => onChange(fieldKey, e.target.value)}
            required={attr.required}
            error={!!error}
            InputProps={{
              endAdornment: attr.Ai ? (
                <Box sx={{ alignSelf: "flex-end" }}>
                  <AIIcon
                    attr={attr}
                    categoryId={categoryId}
                    aiData={aiData}
                    onValueChange={(nextValue) => onChange(fieldKey, nextValue)}
                  />
                </Box>
              ) : undefined,
            }}
          />
          <SuggestedValues
            attr={attr}
            currentValue={value}
            onSuggestionClick={(suggestion) => onChange(fieldKey, suggestion)}
          />
        </Box>
      );

    default:
      return null;
  }
}
