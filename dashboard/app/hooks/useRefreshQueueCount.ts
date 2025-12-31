import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

/**
 * Hook for refreshing queue count across the application
 * Use this hook whenever an operation affects the queue count
 * (e.g., after creating a transfer, product, etc.)
 */
export const useRefreshQueueCount = () => {
  const queryClient = useQueryClient();

  const refreshQueueCount = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["queue count"] });
  }, [queryClient]);

  return refreshQueueCount;
};
