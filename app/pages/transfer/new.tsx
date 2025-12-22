import React, { useMemo, useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  Divider,
  useTheme,
  CircularProgress,
  Grid,
} from "@mui/material";
import TransferSources from "~/components/transfer/Sources";
import TransferResult from "~/components/transfer/Result";
import CategorySelector from "~/components/templates/CategorySelector";
import { useCreateTransfer } from "~/api/transfer.api";
import { useCategoriesList } from "~/api/categories.api";
import type { TransferSource, IPostTransfer } from "~/types/dtos/transfer.dto";
import type { ICategoryList } from "~/types/interfaces/categories.interface";
import { ApiStatus } from "~/types";
import { useSnackbar } from "notistack";

import { AddIcon, CloseIcon } from "~/components/icons/IconComponents";
import AppLayout from "~/components/layout/AppLayout";
import { TitleCard } from "~/components/common";

const NewTransferPage = () => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: createTransferMutate, isPending: isCreating } =
    useCreateTransfer();

  const [selectedSource, setSelectedSource] = useState<TransferSource | null>(
    null
  );
  const [urls, setUrls] = useState<string[]>([""]);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [successPayload, setSuccessPayload] = useState<{
    message?: string;
  } | null>(null);

  // Category state
  const [selectedCategory, setSelectedCategory] =
    useState<ICategoryList | null>(null);
  const [categorySearch, setCategorySearch] = useState("");

  // Categories API
  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategoriesList(categorySearch, 1, 50);
  const categories = categoriesData?.data?.items ?? [];
  const suggestedCategories = categoriesData?.data?.suugest ?? [];

  const hasValidUrl = useMemo(
    () => urls.some((u) => u.trim().length > 0),
    [urls]
  );
  const isValid = !!selectedSource && hasValidUrl;

  const handleAddUrl = () => setUrls((s) => [...s, ""]);
  const handleRemoveUrl = (idx: number) =>
    setUrls((s) => s.filter((_, i) => i !== idx));
  const handleChangeUrl = (idx: number, value: string) =>
    setUrls((s) => s.map((u, i) => (i === idx ? value : u)));

  const handleSubmit = async () => {
    setAttemptedSubmit(true);
    if (!isValid) return;

    try {
      const payload: IPostTransfer = {
        source: selectedSource!,
        urls: urls.filter((u) => u.trim().length > 0),
        ...(selectedCategory && { category_id: selectedCategory.id }),
      };
      const res = await createTransferMutate(payload);
      if (res.status === ApiStatus.SUCCEEDED) {
        enqueueSnackbar(res.message ?? "عملیات با موفقیت انجام شد", {
          variant: "success",
        });
        setSuccessPayload({ message: res.message });
      } else {
        enqueueSnackbar(res.message ?? "خطا در انجام عملیات", {
          variant: "error",
        });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar("خطا در ارتباط با سرور", { variant: "error" });
    }
  };

  const handleCreateAnother = () => {
    setSuccessPayload(null);
    setSelectedSource(null);
    setUrls([""]);
    setSelectedCategory(null);
    setAttemptedSubmit(false);
  };

  if (successPayload) {
    return (
      <TransferResult
        message={successPayload.message}
        onCreateAnother={handleCreateAnother}
      />
    );
  }

  return (
    <AppLayout title="انتقال محصول">
      <TitleCard
        title="انتقال محصول از منابع دیگر"
        description="ابتدا منبع را انتخاب کنید و سپس آدرس یا آدرس‌های محصول را وارد کنید."
      />

      <Box sx={{ minHeight: "100vh", py: 4 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
            <Grid container spacing={3}>
              {/* Transfer Sources Selection */}
              <Grid size={{ xs: 12 }}>
                <Box sx={{ mb: 3 }}>
                  <TransferSources
                    selected={selectedSource}
                    onSelect={(s) => setSelectedSource(s)}
                    sx={{
                      "& .MuiButtonBase-root": {
                        height: 120,
                        borderRadius: `${theme.shape.borderRadius}px`,
                        overflow: "hidden",
                      },
                      ".logoBg": {
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        height: "100%",
                      },
                    }}
                  />

                  {attemptedSubmit && !selectedSource && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ mt: 1, display: "block" }}
                    >
                      لطفا یک منبع را انتخاب کنید
                    </Typography>
                  )}
                </Box>
              </Grid>

              {/* Category Selection */}
              <Grid size={{ xs: 12 }}>
                <CategorySelector
                  categories={categories}
                  selectedCategory={selectedCategory}
                  loadingCategories={categoriesLoading}
                  onCategoryChange={(category) => setSelectedCategory(category)}
                  onSearchChange={setCategorySearch}
                  suggestedCategories={suggestedCategories}
                  loadingSuggestions={categoriesLoading}
                  title="دسته‌بندی محصول (اختیاری)"
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              {/* URLs Input */}
              <Grid size={{ xs: 12 }}>
                <Box sx={{ mb: 2 }}>
                  <Stack spacing={2}>
                    {urls.map((u, idx) => (
                      <Box key={idx} sx={{ display: "flex", gap: 1 }}>
                        <TextField
                          fullWidth
                          placeholder="آدرس محصول (لینک)"
                          value={u}
                          onChange={(e) => handleChangeUrl(idx, e.target.value)}
                          error={attemptedSubmit && u.trim().length === 0}
                          helperText={
                            attemptedSubmit && u.trim().length === 0
                              ? "آدرس نباید خالی باشد"
                              : ""
                          }
                        />
                        <IconButton
                          aria-label="remove"
                          color="error"
                          onClick={() => handleRemoveUrl(idx)}
                          disabled={urls.length === 1}
                          sx={{ alignSelf: "center" }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Box>
                    ))}

                    <Button
                      startIcon={<AddIcon />}
                      onClick={handleAddUrl}
                      sx={{ alignSelf: "flex-start", textTransform: "none" }}
                    >
                      افزودن آدرس جدید
                    </Button>

                    {attemptedSubmit && !hasValidUrl && (
                      <Typography variant="caption" color="error">
                        لطفا حداقل یک آدرس معتبر وارد کنید
                      </Typography>
                    )}
                  </Stack>
                </Box>
              </Grid>

              {/* Submit Button */}
              <Grid size={{ xs: 12 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!isValid || isCreating}
                    sx={{ textTransform: "none", minWidth: 160 }}
                  >
                    {isCreating ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      "ارسال درخواست"
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </AppLayout>
  );
};

export default NewTransferPage;
