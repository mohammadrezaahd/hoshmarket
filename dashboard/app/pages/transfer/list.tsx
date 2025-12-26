import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Alert,
  Skeleton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Container,
  LinearProgress,
  Avatar,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import {
  RefreshIcon,
  DeleteIcon,
  ExportIcon,
} from "~/components/icons/IconComponents";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import {
  useTransfers,
  useDeleteTransfer,
  useSetCategory,
  useConvertTransfer,
} from "~/api/transfer.api";
import type { ITransferList } from "~/types/interfaces/transfer.interface";
import type { ICategoryList } from "~/types/interfaces/categories.interface";
import { TransferStatus } from "~/types/interfaces/transfer.interface";
import { TransferSource } from "~/types/dtos/transfer.dto";
import AppLayout from "~/components/layout/AppLayout";
import CategorySelector from "~/components/templates/CategorySelector";
import {
  PageSizeSelector,
  PaginationControls,
  SearchInput,
  TitleCard,
} from "~/components/common";
import { ApiStatus } from "~/types";

export function meta() {
  return [
    { title: "لیست انتقالات" },
    { name: "description", content: "صفحه لیست انتقالات" },
  ];
}

const TransferList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchValue, setSearchValue] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const [sourceFilter, setSourceFilter] = useState<string | undefined>(
    undefined
  );

  const [items, setItems] = useState<ITransferList[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [metaData, setMetaData] = useState<any | null>(null);

  // Category editing state
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null
  );
  const [editingRow, setEditingRow] = useState<ITransferList | null>(null);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    mutateAsync: getList,
    isPending: isLoading,
    error: fetchError,
  } = useTransfers();

  const { mutateAsync: deleteTransfer, isPending: isDeleting } =
    useDeleteTransfer();

  const { mutateAsync: convertTransfer, isPending: isConverting } =
    useConvertTransfer();

  const { mutateAsync: setCategory, isPending: isSettingCategory } =
    useSetCategory();

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    id: number | null;
    title?: string;
  }>({
    open: false,
    id: null,
    title: "",
  });

  // Initial load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getList({
          page: 1,
          limit: 10,
          status_filter: undefined,
          source: undefined,
        });

        if (res.status === ApiStatus.SUCCEEDED && res.data) {
          setItems(res.data.list || []);
          setTotalItems(res.data.list?.length || 0);
          setMetaData(res.meta_data || null);
          setTotalItems(
            res.meta_data?.total_items ?? res.data.list?.length ?? 0
          );
        } else {
          enqueueSnackbar(res.message || "خطا در دریافت لیست انتقالات", {
            variant: "error",
          });
        }
      } catch (err: any) {
        enqueueSnackbar(err.message || "خطا در دریافت لیست انتقالات", {
          variant: "error",
        });
      }
    };

    fetchData();
  }, []);

  // Fetch when filters change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getList({
          page: 1,
          limit,
          status_filter: statusFilter,
          source: sourceFilter,
        });

        if (res.status === ApiStatus.SUCCEEDED && res.data) {
          setItems(res.data.list || []);
          setTotalItems(res.data.list?.length || 0);
          setMetaData(res.meta_data || null);
          setTotalItems(
            res.meta_data?.total_items ?? res.data.list?.length ?? 0
          );
        } else {
          enqueueSnackbar(res.message || "خطا در دریافت لیست انتقالات", {
            variant: "error",
          });
        }
      } catch (err: any) {
        enqueueSnackbar(err.message || "خطا در دریافت لیست انتقالات", {
          variant: "error",
        });
      }
    };

    // فقط وقتی filter واقعا تغییر کرده باشد
    if (statusFilter !== undefined || sourceFilter !== undefined) {
      setPage(1); // Reset to page 1
      fetchData();
    }
  }, [statusFilter, sourceFilter, limit, getList, enqueueSnackbar]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) =>
    setPage(value);
  const handleLimitChange = (event: any) => {
    setLimit(Number(event.target.value));
    setPage(1);
  };
  const handleSearchChange = (val: string) => {
    setSearchValue(val);
  };

  const handleRefresh = async () => {
    try {
      const res = await getList({
        page,
        limit,
        status_filter: statusFilter,
        source: sourceFilter,
      });

      if (res.status === ApiStatus.SUCCEEDED && res.data) {
        setItems(res.data.list || []);
        setTotalItems(res.data.list?.length || 0);
        setMetaData(res.meta_data || null);
        setTotalItems(res.meta_data?.total_items ?? res.data.list?.length ?? 0);
      }
    } catch (err: any) {
      enqueueSnackbar(err.message || "خطا در دریافت لیست انتقالات", {
        variant: "error",
      });
    }
  };

  const openDelete = (id: number, title?: string) =>
    setDeleteDialog({ open: true, id, title });
  const closeDelete = () =>
    setDeleteDialog({ open: false, id: null, title: "" });

  const confirmDelete = async () => {
    if (!deleteDialog.id) return;
    try {
      const res = await deleteTransfer(deleteDialog.id);
      if (res.status === ApiStatus.SUCCEEDED) {
        enqueueSnackbar("انتقال با موفقیت حذف شد", { variant: "success" });
        // Refresh current page
        const res = await getList({
          page,
          limit,
          status_filter: statusFilter,
          source: sourceFilter,
        });
        if (res.status === ApiStatus.SUCCEEDED && res.data) {
          setItems(res.data.list || []);
          setTotalItems(
            res.meta_data?.total_items ?? res.data.list?.length ?? 0
          );
          setMetaData(res.meta_data || null);
        }
      } else {
        enqueueSnackbar(res.message || "خطا در حذف انتقال", {
          variant: "error",
        });
      }
    } catch (err: any) {
      enqueueSnackbar(err.message || "خطا در حذف انتقال", { variant: "error" });
    } finally {
      closeDelete();
    }
  };

  const handleCategoryEdit = (row: ITransferList) => {
    setEditingRow(row);
    setEditingCategoryId(row.id);
  };

  const closeCategoryEdit = () => {
    setEditingRow(null);
    setEditingCategoryId(null);
  };

  const handlePublish = async (id: number) => {
    try {
      const res = await convertTransfer(id);

      if (res.status === ApiStatus.SUCCEEDED) {
        enqueueSnackbar(res.message || "تبدیل با موفقیت انجام شد", {
          variant: "success",
        });

        // Refresh current list to get server updates
        const listRes = await getList({
          page,
          limit,
          status_filter: statusFilter,
          source: sourceFilter,
        });

        if (listRes.status === ApiStatus.SUCCEEDED && listRes.data) {
          setItems(listRes.data.list || []);
          setMetaData(listRes.meta_data || null);
          setTotalItems(
            listRes.meta_data?.total_items ?? listRes.data.list?.length ?? 0
          );
        }
      } else {
        enqueueSnackbar(res.message || "خطا در تبدیل انتقال", {
          variant: "error",
        });
      }
    } catch (err: any) {
      enqueueSnackbar(err.message || "خطا در تبدیل انتقال", {
        variant: "error",
      });
    }
  };

  const handleCategoryChange = useCallback(
    async (selectedCategory: ICategoryList | null) => {
      if (!selectedCategory || !editingRow || isSettingCategory) return;

      try {
        const res = await setCategory({
          transferId: editingRow.id,
          categoryId: selectedCategory.id,
        });

        if (res.status === ApiStatus.SUCCEEDED) {
          enqueueSnackbar("دسته‌بندی با موفقیت ذخیره شد", {
            variant: "success",
          });
          // Update the row in state immediately
          setItems((prevItems) =>
            prevItems.map((item) =>
              item.id === editingRow.id
                ? {
                    ...item,
                    digikala_category_id: String(selectedCategory.id),
                    digikala_category_name: selectedCategory.title,
                  }
                : item
            )
          );
          closeCategoryEdit();
        } else {
          enqueueSnackbar(res.message || "خطا در ذخیره دسته‌بندی", {
            variant: "error",
          });
        }
      } catch (err: any) {
        enqueueSnackbar(err.message || "خطا در ذخیره دسته‌بندی", {
          variant: "error",
        });
      }
    },
    [editingRow, isSettingCategory, setCategory, enqueueSnackbar]
  );

  const getStatusLabel = (s: TransferStatus | string) => {
    const map: Record<string, string> = {
      raw: "خام",
      data_fetched: "داده‌برداری شده",
      converted: "تبدیل شده",
      error_fetching_data: "خطا در دریافت داده",
      asin_not_found: "یافت نشد",
    };
    return map[String(s)] || String(s);
  };

  const getStatusColor = (s: TransferStatus | string) => {
    const map: Record<
      string,
      "default" | "error" | "warning" | "info" | "success"
    > = {
      raw: "warning",
      data_fetched: "info",
      converted: "success",
      error_fetching_data: "error",
      asin_not_found: "default",
    };
    return map[String(s)] || "default";
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <>
      {[...Array(6)].map((_, i) => (
        <TableRow key={i}>
          <TableCell align="center">
            <Skeleton variant="circular" width={56} height={56} />
          </TableCell>

          <TableCell>
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={140} sx={{ mt: 0.5 }} />
          </TableCell>

          <TableCell>
            <Skeleton variant="text" width={120} />
          </TableCell>

          <TableCell>
            <Skeleton variant="text" width={150} />
          </TableCell>

          <TableCell>
            <Skeleton variant="text" width={100} />
          </TableCell>
          <TableCell>
            <Skeleton variant="rectangular" width={160} height={12} />
            <Skeleton variant="text" width={40} sx={{ mt: 1 }} />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" width={120} />
          </TableCell>
          <TableCell align="center">
            <Box display="flex" gap={1} justifyContent="center">
              <Skeleton variant="circular" width={36} height={36} />
              <Skeleton variant="circular" width={36} height={36} />
            </Box>
          </TableCell>
        </TableRow>
      ))}
    </>
  );

  // Data rendering
  const rows = items;

  // client-side search filtering
  const filteredRows = rows.filter((r) => {
    if (!searchValue) return true;
    const s = searchValue.trim().toLowerCase();
    return (
      String(r.id).includes(s) ||
      String(r.title).toLowerCase().includes(s) ||
      String(r.brand || "")
        .toLowerCase()
        .includes(s) ||
      String(r.source_name || "")
        .toLowerCase()
        .includes(s)
    );
  });

  // Pagination info
  const totalPages = metaData?.total_pages || 1;
  const total = metaData?.total_items ?? totalItems;

  return (
    <AppLayout title="انتقال‌های ثبت‌شده">
      <Container maxWidth="xl">
        <Box sx={{ mb: 3 }}>
          <TitleCard
            title="مدیریت انتقال‌ها"
            description="مشاهده و مدیریت درخواست‌های انتقال"
          />
        </Box>

        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <PageSizeSelector
                  value={limit}
                  onChange={handleLimitChange}
                  options={[5, 10, 20, 50]}
                />

                <SearchInput
                  onSearchChange={handleSearchChange}
                  label="جستجو در انتقال‌ها"
                  placeholder="عنوان یا برند یا شناسه..."
                  size="small"
                />

                <FormControl size="small">
                  <InputLabel>وضعیت</InputLabel>
                  <Select
                    value={statusFilter ?? ""}
                    label="وضعیت"
                    onChange={(e) =>
                      setStatusFilter(
                        e.target.value ? String(e.target.value) : undefined
                      )
                    }
                    sx={{ minWidth: 140 }}
                  >
                    <MenuItem value="">همه</MenuItem>
                    <MenuItem value={TransferStatus.RAW}>خام</MenuItem>
                    <MenuItem value={TransferStatus.FETCHED}>
                      داده‌برداری شده
                    </MenuItem>
                    <MenuItem value={TransferStatus.ERROR}>خطا</MenuItem>
                    <MenuItem value={TransferStatus.NOT_FOUND}>
                      یافت نشد
                    </MenuItem>
                  </Select>
                </FormControl>

                <FormControl size="small">
                  <InputLabel>منبع</InputLabel>
                  <Select
                    value={sourceFilter ?? ""}
                    label="منبع"
                    onChange={(e) =>
                      setSourceFilter(
                        e.target.value ? String(e.target.value) : undefined
                      )
                    }
                    sx={{ minWidth: 140 }}
                  >
                    <MenuItem value="">همه</MenuItem>
                    <MenuItem value={TransferSource.AMAZON}>Amazon</MenuItem>
                    <MenuItem value={TransferSource.TOROB}>Torob</MenuItem>
                    <MenuItem value={TransferSource.DIGIKALA}>
                      Digikala
                    </MenuItem>
                    <MenuItem value={TransferSource.BAZAR}>Bazar</MenuItem>
                    <MenuItem value={TransferSource.SHEYPUR}>Sheypoor</MenuItem>
                    <MenuItem value={TransferSource.OTHER}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Tooltip title="به‌روزرسانی">
                  <IconButton onClick={handleRefresh} disabled={isLoading}>
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
                <Typography variant="body2" color="text.secondary">
                  مجموع: {total} مورد{" "}
                  {searchValue && `(${filteredRows.length} در این صفحه)`}
                </Typography>
              </Box>
            </Box>

            {fetchError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                خطا در دریافت اطلاعات: {fetchError?.message}
              </Alert>
            )}

            <TableContainer
              component={Paper}
              variant="outlined"
              dir="rtl"
              sx={{ overflowX: "auto" }}
            >
              <Table sx={{ minWidth: 1200 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: 64, textAlign: "center" }}>
                      {/* تصویر */}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>
                      عنوان
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>
                      منبع
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>
                      دسته‌بندی دیجی‌کالا
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>
                      وضعیت
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>
                      پیشرفت
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>
                      تاریخ
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                      عملیات
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading ? (
                    <LoadingSkeleton />
                  ) : filteredRows.length > 0 ? (
                    filteredRows.map((r) => (
                      <TableRow key={r.id} hover>
                        <TableCell align="center" sx={{ width: 64 }}>
                          <Avatar
                            src={r.main_image}
                            alt={r.title}
                            variant="rounded"
                            sx={{ width: 56, height: 56 }}
                          />
                        </TableCell>

                        <TableCell
                          sx={{
                            textAlign: "right",
                            minWidth: 0,
                            maxWidth: 280,
                          }}
                        >
                          <Tooltip title={r.title} arrow>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              noWrap
                              sx={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                              }}
                            >
                              {r.title}
                            </Typography>
                          </Tooltip>
                          {r.brand && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                display: "block",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                mt: 0.5,
                              }}
                            >
                              {r.brand}
                            </Typography>
                          )}
                        </TableCell>

                        <TableCell sx={{ textAlign: "right" }}>
                          <Chip
                            label={r.source_name}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </TableCell>

                        <TableCell sx={{ textAlign: "right", minWidth: 250 }}>
                          {r.status === TransferStatus.FETCHED ||
                          r.status === TransferStatus.CONVERTED ? (
                            <>
                              {editingCategoryId === r.id ? (
                                <Box sx={{ py: 1, position: "relative" }}>
                                  {isSettingCategory && (
                                    <Box
                                      sx={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        left: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor:
                                          "rgba(255, 255, 255, 0.7)",
                                        zIndex: 10,
                                        borderRadius: 1,
                                      }}
                                    >
                                      <CircularProgress size={24} />
                                    </Box>
                                  )}
                                  <CategorySelector
                                    selectedCategory={
                                      // Find the category by ID (we don't have categories list anymore)
                                      r.digikala_category_id
                                        ? ({
                                            id: Number(r.digikala_category_id),
                                            title:
                                              r.digikala_category_name || "",
                                          } as ICategoryList)
                                        : null
                                    }
                                    onCategoryChange={handleCategoryChange}
                                    title=""
                                    enabled={r.status !== TransferStatus.CONVERTED}
                                    sx={{ p: 0 }}
                                    
                                  />
                                </Box>
                              ) : (
                                <Box
                                  onClick={() => r.status !== TransferStatus.CONVERTED && handleCategoryEdit(r)}
                                  sx={{
                                    py: 0.5,
                                    px: 1,
                                    borderRadius: 1,
                                    cursor: r.status !== TransferStatus.CONVERTED ? "pointer" : "default",
                                    "&:hover": {
                                      backgroundColor: r.status !== TransferStatus.CONVERTED ? "action.hover" : "transparent",
                                    },
                                    minHeight: 36,
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {r.digikala_category_name ? (
                                    <Tooltip title={r.status !== TransferStatus.CONVERTED ? "برای ویرایش کلیک کنید" : "تبدیل شده - غیرقابل ویرایش"}>
                                      <Typography variant="body2">
                                        {r.digikala_category_name}
                                      </Typography>
                                    </Tooltip>
                                  ) : (
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      sx={{ fontStyle: "italic" }}
                                    >
                                      انتخاب دسته‌بندی...
                                    </Typography>
                                  )}
                                </Box>
                              )}
                            </>
                          ) : (
                            <Typography>
                              تا دریافت کامل اطلاعات صبر کنید
                            </Typography>
                          )}
                        </TableCell>

                        <TableCell sx={{ textAlign: "right" }}>
                          <Chip
                            label={getStatusLabel(r.status)}
                            size="small"
                            color={getStatusColor(r.status)}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell sx={{ textAlign: "right", minWidth: 200 }}>
                          <Box>
                            <LinearProgress
                              variant="determinate"
                              value={Math.max(
                                0,
                                Math.min(100, r.progress || 0)
                              )}
                              sx={{ height: 8, borderRadius: 2 }}
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ mt: 0.5, display: "block" }}
                            >
                              {r.progress ?? 0}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ textAlign: "right" }}>
                          <Typography variant="body2">
                            {new Date(r.created_at).toLocaleDateString("fa-IR")}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(r.updated_at).toLocaleString("fa-IR")}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              justifyContent: "center",
                            }}
                          >
                            <Tooltip title="انتشار">
                              <IconButton
                                size="small"
                                color="success"
                                onClick={() => {
                                  closeCategoryEdit();
                                  handlePublish(r.id);
                                }}
                                disabled={
                                  isConverting ||
                                  !r.digikala_category_id ||
                                  !r.digikala_category_name ||
                                  r.status !== TransferStatus.FETCHED
                                }
                              >
                                <ExportIcon size="small" />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="حذف">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => openDelete(r.id, r.title)}
                                disabled={isDeleting}
                              >
                                <DeleteIcon size="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                          {searchValue
                            ? "نتیجه‌ای یافت نشد"
                            : "هیچ انتقالی یافت نشد"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {total > 0 && totalPages > 1 && (
              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <PaginationControls
                  currentPage={page}
                  totalPages={totalPages}
                  totalItems={total}
                  onPageChange={handlePageChange}
                  disabled={isLoading}
                />
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>

      {/* Delete confirmation */}
      <Dialog open={deleteDialog.open} onClose={closeDelete}>
        <DialogTitle>حذف انتقال</DialogTitle>
        <DialogContent>
          <Typography>
            آیا از حذف انتقال "{deleteDialog.title}" مطمئن هستید؟
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDelete}>انصراف</Button>
          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
            disabled={isDeleting}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
};

export default TransferList;
