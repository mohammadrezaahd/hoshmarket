import type {
  IQueueList,
  QueueStatus,
} from "~/types/interfaces/queue.interface";
import { apiUtils } from "./apiUtils.api";
import { authorizedGet, getToken } from "~/utils/authorizeReq";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useLiveWebSocket } from "~/hooks/useWebsocket";

const apiUrl = import.meta.env.VITE_API_URL;

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

const getQueueCount = async () => {
  return apiUtils<{ count: number }>(async () => {
    const response = await authorizedGet(`/v1/queue/jobs_count`);
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

export const useQueueCount = () => {
  return useQuery({
    queryKey: ["queue count"],
    queryFn: () => getQueueCount(),
    staleTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
  });
};

export const useQueueListSocket = (enabled: boolean) => {
  const [queueList, setQueueList] = useState<IQueueList[]>([]);
  const [loading, setLoading] = useState(false);
  const { mutateAsync: fetchQueue } = useQueueList();

  const queueWsUrl = useMemo(() => {
    if (!apiUrl) {
      throw new Error("apiUrl is required for Queue WebSocket");
    }

    const token = getToken();
    if (!token) {
      throw new Error("JWT token not found");
    }

    const parsed = new URL(apiUrl);
    const wsProtocol = parsed.protocol === "https:" ? "wss:" : "ws:";

    // 👇 دقیقاً مطابق بک‌اند
    return `${wsProtocol}//${parsed.host}/api/v1/ws/queue/queue_ws/${encodeURIComponent(
      token
    )}`;
  }, []);

  // 🔹 fetch اولیه لیست
  useEffect(() => {
    if (!enabled) return;

    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const res = await fetchQueue({});
        if (mounted && res?.data?.list) {
          setQueueList(res.data.list);
        }
      } catch (e) {
        console.error("Fetch queue list error", e);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [enabled, fetchQueue]);

  // 🔹 WebSocket live updates
  useLiveWebSocket<IQueueList[], IQueueList | { list: IQueueList[] }>({
    url: queueWsUrl,
    enabled,
    setState: setQueueList,
    onMessage: (message, prev) => {
      // اگر لیست کامل آمده
      if ("list" in (message as any)) {
        return (message as any).list;
      }

      // اگر event-based update آمده (مثل JOB_UPDATE)، فقط data را استخراج کن
      let item: IQueueList;
      if ("event" in (message as any) && "data" in (message as any)) {
        item = (message as any).data;
      } else {
        item = message as IQueueList;
      }

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

export const useQueueCountSocket = (enabled: boolean = true) => {
  const [queueCount, setQueueCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { data: initialCount } = useQueueCount();

  const queueCountWsUrl =
    (import.meta.env.VITE_QUEUE_COUNT_WS_URL as string) ||
    (() => {
      const token = getToken();
      if (apiUrl) {
        try {
          const parsed = new URL(apiUrl);
          const proto = parsed.protocol === "https:" ? "wss:" : "ws:";
          return `${proto}//${parsed.host}/v1/queue/count_ws${
            token ? `?access_token=${encodeURIComponent(token)}` : ""
          }`;
        } catch (e) {
          // fallthrough to window location
        }
      }
      const loc = window.location;
      const proto = loc.protocol === "https:" ? "wss:" : "ws:";
      return `${proto}//${loc.host}/v1/queue/count_ws${
        token ? `?access_token=${encodeURIComponent(token)}` : ""
      }`;
    })();

  useEffect(() => {
    if (initialCount?.data?.count !== undefined) {
      setQueueCount(initialCount.data.count);
    }
  }, [initialCount]);

  useLiveWebSocket<number, { count: number } | number>({
    url: queueCountWsUrl,
    enabled: Boolean(enabled),
    setState: setQueueCount,
    onMessage: (message) => {
      if (typeof message === "number") {
        return message;
      }
      return (message as { count: number }).count;
    },
    reconnectDelay: 3000,
  });

  return { queueCount, loading };
};
