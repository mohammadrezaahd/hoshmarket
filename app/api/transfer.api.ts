import {
  authorizedDelete,
  authorizedGet,
  authorizedPost,
} from "~/utils/authorizeReq";
import { apiUtils } from "./apiUtils.api";
import type { IPostTransfer } from "~/types/dtos/transfer.dto";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";
import type { ApiResponseData } from "~/types";
import type {
  ITransfer,
  ITransferList,
} from "~/types/interfaces/transfer.interface";

const createNewTransfer = async (data: IPostTransfer) => {
  return apiUtils<{ count: number }>(async () => {
    const response = await authorizedPost("/v1/transfer_product/create", data);

    return response.data;
  });
};

const getTransferList = async ({
  page = 1,
  limit = 100,
  status_filter,
  source,
}: {
  page?: number;
  limit?: number;
  status_filter?: string;
  source?: string;
}) => {
  return apiUtils<{ list: ITransferList[] }>(async () => {
    let url = `/v1/transfer_product/list?page=${page}&limit=${limit}`;

    if (status_filter && status_filter.trim().length > 0) {
      url += `&status_filter=${encodeURIComponent(status_filter)}`;
    }

    if (source && source.trim().length > 0) {
      url += `&source=${encodeURIComponent(source)}`;
    }
    const response = await authorizedGet(url);
    return response.data;
  });
};

const getTransfer = async (id: number) => {
  return apiUtils<ITransfer>(async () => {
    const response = await authorizedGet(`/v1/transfer_product/get/${id}`);
    return response.data;
  });
};

const deleteTransfer = async (id: number) => {
  return apiUtils(async () => {
    const response = await authorizedDelete(
      `/v1/transfer_product/delete/${id}`
    );
    return response.data;
  });
};

export const useCreateTransfer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNewTransfer,
    onSuccess: (data) => {
      // Invalidate related queries after successful creation
      queryClient.invalidateQueries({ queryKey: ["Transfer"] });
      console.log("✅ Transfer created successfully:", data);
    },
    onError: (error) => {
      console.error("❌ Error creating transfer:", error);
    },
  });
};

export const useTransfers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getTransferList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transfers list"] });
    },
    onError: (error) => {
      console.error("❌ Error fetching transfers list:", error);
    },
  });
};

export const useTransfer = (id: number) => {
  return useQuery({
    queryKey: ["transfer", id],
    queryFn: () => getTransfer(id),
    enabled: !!id,
    staleTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
  });
};

export const useDeleteTransfer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransfer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transfer delete"] });
      console.log("✅ transfer deleted successfully");
    },
    onError: (error) => {
      console.error("❌ Error deleting transfer:", error);
    },
  });
};
