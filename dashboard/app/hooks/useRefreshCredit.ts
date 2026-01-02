import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

/**
 * Hook for refreshing user credit across the application.
 * Call the returned function after actions that affect credit (purchase, usage, etc.).
 */
export const useRefreshCredit = () => {
  const queryClient = useQueryClient();

  const refreshCredit = useCallback(async () => {
    // mark the credits query stale and trigger refetch for active queries
    await queryClient.invalidateQueries({ queryKey: ["credits"] });
    // also try to immediately refetch active credit queries
    try {
      await queryClient.refetchQueries({ queryKey: ["credits"] });
    } catch (e) {
      // ignore refetch errors here; components using `useCredit` will handle fetch state
      // eslint-disable-next-line no-console
      console.debug("refetch credits failed", e);
    }
  }, [queryClient]);

  return refreshCredit;
};

export default useRefreshCredit;
