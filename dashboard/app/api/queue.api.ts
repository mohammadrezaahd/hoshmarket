import type {
  IQueueList,
  QueueStatus,
} from "~/types/interfaces/queue.interface";
import { apiUtils } from "./apiUtils.api";
import { authorizedGet } from "~/utils/authorizeReq";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLiveWebSocket } from "~/hooks/useWebsocket";

const getQueueList = async ({
  status,
  queue_name,
  job_name,
}: {
  status?: QueueStatus;
  queue_name?: string;
  job_name?: string;
}) => {
  return apiUtils<{ list: IQueueList[] }>(async () => {
    const params = new URLSearchParams();

    if (status && status.trim().length > 0) {
      params.append("status_filter", status);
    }

    if (queue_name && queue_name.trim().length > 0) {
      params.append("queue_name", queue_name);
    }

    if (job_name && job_name.trim().length > 0) {
      params.append("job_name", job_name);
    }

    const queryString = params.toString();
    const url = `/v1/queue/list${queryString ? `?${queryString}` : ""}`;

    const response = await authorizedGet(url);
    return response.data;
  });
};

export const useQueueList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getQueueList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queue list"] });
    },
    onError: (error) => {
      console.error("❌ Error fetching queue list:", error);
    },
  });
};

export const useQueueListSocket = (enabled: boolean) => {
  const [queueList, setQueueList] = useState<IQueueList[]>([]);
  const [loading, setLoading] = useState(false);
  const { mutateAsync: fetchQueue } = useQueueList();

  const queueWsUrl =
    (import.meta.env.VITE_QUEUE_WS_URL as string) ||
    (() => {
      const loc = window.location;
      const proto = loc.protocol === "https:" ? "wss:" : "ws:";
      return `${proto}//${loc.host}/v1/queue/ws`;
    })();

  useEffect(() => {
    let mounted = true;
    if (!enabled) return;

    (async () => {
      try {
        setLoading(true);
        const res = await fetchQueue({});
        if (mounted && res?.data?.list) {
          setQueueList(res.data.list);
        }
      } catch (e) {
        console.error("Error fetching queue list", e);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [enabled]);

  useLiveWebSocket<IQueueList[], IQueueList | { list: IQueueList[] }>({
    url: queueWsUrl,
    enabled: Boolean(enabled),
    setState: setQueueList,
    onMessage: (message, prev) => {
      if ((message as any)?.list) {
        return (message as any).list as IQueueList[];
      }

      const item = message as IQueueList;
      const idx = prev.findIndex((p) => p.id === item.id);
      if (idx === -1) {
        return [item, ...prev].slice(0, 50);
      }
      const next = [...prev];
      next[idx] = { ...next[idx], ...item };
      return next;
    },
    reconnectDelay: 3000,
  });

  return { queueList, loading };
};
