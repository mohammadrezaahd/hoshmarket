import { authorizedPost } from "~/utils/authorizeReq";
import { apiUtils } from "./apiUtils.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IAiSuggestion } from "~/types/dtos/ai.dto";
import { ApiStatus } from "~/types";

const aiSuggest = async (Inp: IAiSuggestion) => {
  return apiUtils<{ ai?: any; Ai?: any; id?: string | number }>(async () => {
    const { data, categoryId, id } = Inp;
    const response = await authorizedPost(
      `/v1/suggest/hoshyar/GenAi?category_id=${categoryId}&id=${id}`,
      data ? data : {},
    );

    return {
      status:
        response.data?.status === ApiStatus.SUCCEEDED
          ? ApiStatus.SUCCEEDED
          : ApiStatus.FAILED,
      code: response.status as any,
      data: response.data.data,
      message: response.data?.message,
    };
  });
};

export const useAiSuggest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: aiSuggest,
    onSuccess: (id) => {
      // Invalidate related queries after successful creation
      queryClient.invalidateQueries({ queryKey: ["ai suggest"] });
    },
    onError: (error) => {
      console.error("❌ Error suggesting AI:", error);
    },
  });
};
