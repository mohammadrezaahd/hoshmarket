import type {
  INotifList,
  NotifStatus,
} from "~/types/interfaces/notification.interface";
import { apiUtils } from "./apiUtils.api";
import { authorizedGet, authorizedPost, getToken } from "~/utils/authorizeReq";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLiveWebSocket } from "~/hooks/useWebsocket";
import { useEffect, useMemo, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const getNotifList = async ({
  status,
  notif_type,
}: {
  status?: NotifStatus;
  notif_type?: string;
}) => {
  return apiUtils<{ list: INotifList[] }>(async () => {
    const params = new URLSearchParams();

    if (status && status.trim().length > 0) {
      params.append("status_filter", status);
    }

    if (notif_type && notif_type.trim().length > 0) {
      params.append("queue_name", notif_type);
    }

    const queryString = params.toString();
    const url = `/v1/notification/list${queryString ? `?${queryString}` : ""}`;

    const response = await authorizedGet(url);
    return response.data;
  });
};

const notifRead = async (id: number) => {
  return apiUtils(async () => {
    const response = await authorizedPost(`/v1/notification/${id}/read`);

    return response.data;
  });
};

const notifReadAll = async () => {
  return apiUtils(async () => {
    const response = await authorizedPost(`/v1/notification/read-all`);

    return response.data;
  });
};

const getUnreadNotifsCount = async () => {
  return apiUtils<{ count: number }>(async () => {
    const response = await authorizedGet(`/v1/notification/unread-count`);
    return response.data;
  });
};

export const useNotifList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getNotifList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification list"] });
    },
    onError: (error) => {
      console.error("❌ Error fetching notifications list:", error);
    },
  });
};

export const useReadNotif = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notifRead,
    onSuccess: (data) => {
      // Invalidate related queries after successful creation
      queryClient.invalidateQueries({ queryKey: ["Read Notification"] });
    },
    onError: (error) => {
      console.error("❌ Error reading notification:", error);
    },
  });
};

export const useReadNotifAll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notifReadAll,
    onSuccess: (data) => {
      // Invalidate related queries after successful creation
      queryClient.invalidateQueries({ queryKey: ["Read All Notifications"] });
    },
    onError: (error) => {
      console.error("❌ Error reading All notification:", error);
    },
  });
};

export const useUnreadNotifCount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getUnreadNotifsCount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Unread notifications count"],
      });
    },
    onError: (error) => {
      console.error("❌ Error fetching unread notifications count:", error);
    },
  });
};

export const useNotifCountSocket = (enabled: boolean) => {
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { mutateAsync: fetchCount } = useUnreadNotifCount();

  // ✅ URL امن و وابسته به enabled
  const notifWsUrl = useMemo(() => {
    if (!enabled) return "";

    if (!apiUrl) {
      throw new Error("apiUrl is required for Notification WebSocket");
    }

    const token = getToken();
    if (!token) {
      throw new Error("JWT token not found");
    }

    const parsed = new URL(apiUrl);
    const wsProtocol = parsed.protocol === "https:" ? "wss:" : "ws:";

    return `${wsProtocol}//${parsed.host}/api/v1/ws/notification/notifications_count/${encodeURIComponent(
      token
    )}`;
  }, [enabled]);

  // ✅ initial fetch
  useEffect(() => {
    if (!enabled) return;

    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const res = await fetchCount();
        if (mounted && res?.data?.count !== undefined) {
          setUnreadCount(res.data.count);
        }
      } catch (e) {
        console.error("Fetch unread notification count error", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [enabled, fetchCount]);

  // ✅ WebSocket live updates
  useLiveWebSocket<
    number,
    { event: string; data: { count: number } } | { count: number } | number
  >({
    url: notifWsUrl,
    enabled,
    setState: setUnreadCount,
    onMessage: (message, prev) => {
      // event wrapper
      if (
        typeof message === "object" &&
        message !== null &&
        "event" in message &&
        "data" in message &&
        typeof message.data === "object" &&
        message.data !== null &&
        "count" in message.data
      ) {
        return message.data.count;
      }

      // direct object
      if (
        typeof message === "object" &&
        message !== null &&
        "count" in message
      ) {
        return message.count;
      }

      // direct number
      if (typeof message === "number") {
        return message;
      }

      // ✅ fallback امن
      return prev;
    },
    reconnectDelay: 3000,
  });

  return { unreadCount, loading };
};
