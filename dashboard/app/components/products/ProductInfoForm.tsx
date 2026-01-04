import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import DynamicTitleBuilder from "./DynamicTitleBuilder";
import { AiIcon } from "~/components/icons/IconComponents";
import { useDescSuggest } from "~/api/product.api";
import { useSnackbar } from "notistack";
import type { ICategoryAttr } from "~/types/interfaces/attributes.interface";
import type { ICategoryDetails } from "~/types/interfaces/details.interface";

interface ProductInfoFormProps {
  title: string;
  description: string;
  categoryId?: number;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
  hasValidationErrors?: boolean;
  stepValidationErrors?: {
    [key: string]: boolean;
  };
  attributesData?: ICategoryAttr[];
  detailsData?: ICategoryDetails[];
  suggestedBadgeLabels?: { [key: string]: string };
  locked?: boolean;
  submitButtonLabel?: string;
}

const ProductInfoForm: React.FC<ProductInfoFormProps> = ({
  title,
  description,
  categoryId,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
  onBack,
  isSubmitting = false,
  hasValidationErrors = false,
  stepValidationErrors = {},
  attributesData = [],
  detailsData = [],
  suggestedBadgeLabels = {},
  locked = false,
  submitButtonLabel = "ایجاد محصول",
}) => {
  const [errors, setErrors] = useState<{ title?: string }>({});
  const { enqueueSnackbar } = useSnackbar();

  // AI suggestion hooks (description only)
  const { mutateAsync: suggestDesc, isPending: isDescSuggesting } =
    useDescSuggest();

  const handleDescSuggest = async () => {
    if (!categoryId) {
      enqueueSnackbar("لطفاً ابتدا دسته‌بندی را انتخاب کنید", {
        variant: "warning",
      });
      return;
    }

    try {
      const response = await suggestDesc({ categoryId });
      if (response?.data?.description) {
        onDescriptionChange(response.data.description);
        enqueueSnackbar("توضیحات با موفقیت پیشنهاد شد", { variant: "success" });
      }
    } catch (error: any) {
      enqueueSnackbar(`خطا در دریافت پیشنهاد توضیحات: ${error.message}`, {
        variant: "error",
      });
    }
  };

  const handleSubmit = () => {
    const newErrors: { title?: string } = {};

    if (!title.trim()) {
      newErrors.title = "عنوان محصول الزامی است";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && !hasValidationErrors) {
      onSubmit();
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        اطلاعات محصول
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        اطلاعات نهایی محصول را وارد کنید.
      </Typography>

      {hasValidationErrors && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2">
            لطفاً ابتدا خطاهای موجود در مراحل قبلی را رفع کنید. مراحل دارای خطا
            با علامت ضربدر مشخص شده‌اند.
          </Typography>
        </Alert>
      )}

      <Box sx={{ mb: 3 }}>
        <DynamicTitleBuilder
          value={title}
          onChange={(value) => {
            onTitleChange(value);
            if (errors.title && value.trim()) {
              setErrors({ ...errors, title: undefined });
            }
          }}
          attributesData={attributesData}
          detailsData={detailsData}
          label="عنوان محصول"
          placeholder="عنوان محصول را وارد کنید..."
          suggestedBadgeLabels={suggestedBadgeLabels}
          locked={locked}
        />

        {errors.title && (
          <Alert severity="error" sx={{ mt: 1, mb: 2 }}>
            {errors.title}
          </Alert>
        )}

        <Box sx={{ position: "relative", mt: 2 }}>
          <TextField
            label="توضیحات محصول"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            fullWidth
            multiline
            rows={4}
            placeholder="توضیحات اختیاری در مورد محصول..."
            sx={{
              // add left padding so text doesn't collide with absolute icon
              "& .MuiInputBase-root": { paddingLeft: "44px" },
            }}
          />

          <Box sx={{ position: "absolute", bottom: 10, left: 10, zIndex: 20 }}>
            <Tooltip title="دریافت پیشنهاد از هوش مصنوعی" placement="top">
              <span>
                <IconButton
                  onClick={handleDescSuggest}
                  disabled={isDescSuggesting || !categoryId}
                  size="small"
                  sx={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    width: 20,
                    height: 20,
                    minWidth: 20,
                    padding: 0,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                    },
                  }}
                >
                  {isDescSuggesting ? (
                    <CircularProgress size={10} sx={{ color: "white" }} />
                  ) : (
                    <AiIcon style={{ fontSize: 10 }} />
                  )}
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={onBack} disabled={isSubmitting}>
          مرحله قبل
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={
            isSubmitting ||
            hasValidationErrors ||
            (!!errors.title && !title.trim())
          }
          sx={{ minWidth: 120 }}
        >
          {isSubmitting ? `در حال ${submitButtonLabel}...` : submitButtonLabel}
        </Button>
      </Box>
    </Paper>
  );
};

export default ProductInfoForm;
