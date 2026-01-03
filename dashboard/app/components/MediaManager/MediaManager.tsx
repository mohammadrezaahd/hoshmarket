import React from "react";
import { Box } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import MediaGrid from "./MediaGrid";
import MediaFilters from "./MediaFilters";
import { FileUpload } from "./";
import type { MediaType } from "./FileUpload";
import type { IMediaQueryParams } from "~/types";

// Media file interface
interface IMediaFile {
  _id: string;
  filename: string;
  filepath: string;
  size: number;
  mimetype: string;
  createdAt: string;
  packaging?: boolean;
  product?: boolean;
}

interface MediaManagerProps {
  media: IMediaFile[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  loading?: boolean;
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  onPageSizeChange: (event: SelectChangeEvent<number>) => void;
  pageSizeOptions?: number[];
  showUpload?: boolean;
  title?: string;
  // Selection props
  selectionMode?: boolean;
  selectedItems?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  // FileUpload props
  allowedType?: "packaging" | "product" | "none";
  onUploadSuccess?: () => void;
  onUploadError?: (error: string) => void;
  editImageId?: number | null;
  onEditComplete?: () => void;
  allowMultiple?: boolean;
  // Filter props
  showFilters?: boolean;
  filters?: IMediaQueryParams;
  onFiltersChange?: (filters: IMediaQueryParams) => void;
  defaultType?: MediaType;
}

const MediaManager: React.FC<MediaManagerProps> = ({
  media,
  onDelete,
  onEdit,
  loading = false,
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [12, 24, 48],
  showUpload = true,
  title = "مدیریت رسانه",
  selectionMode = false,
  selectedItems = [],
  onSelectionChange,
  // FileUpload props
  allowedType = "none",
  onUploadSuccess,
  onUploadError,
  editImageId = null,
  onEditComplete,
  allowMultiple = false,
  // Filter props
  showFilters = false,
  filters,
  onFiltersChange,
  defaultType,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* File Upload */}
      {showUpload && (
        <FileUpload
          allowedType={allowedType}
          onUploadSuccess={onUploadSuccess}
          onUploadError={onUploadError}
          editImageId={editImageId}
          onEditComplete={onEditComplete}
          allowMultiple={allowMultiple}
          defaultType={defaultType}
        />
      )}

      {/* Media Filters */}
      {showFilters && filters && onFiltersChange && (
        <MediaFilters
          filters={filters}
          onFiltersChange={onFiltersChange}
          totalItems={totalItems}
        />
      )}

      <MediaGrid
        media={media}
        onDelete={onDelete}
        onEdit={onEdit}
        loading={loading}
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        pageSizeOptions={pageSizeOptions}
        selectionMode={selectionMode}
        selectedItems={selectedItems}
        onSelectionChange={onSelectionChange}
      />
    </Box>
  );
};

export default MediaManager;
