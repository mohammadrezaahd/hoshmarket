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
      console.log("✅ Notification read successfully:", data);
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
      console.log("✅ All Notification read successfully:", data);
    },
    onError: (error) => {
      console.error("❌ Error reading All notification:", error);
    },
  });
};

// export const useQueueListSocket = (enabled: boolean) => {
//   const [queueList, setQueueList] = useState<INotifList[]>([]);
//   const [loading, setLoading] = useState(false);
//   const { mutateAsync: fetchQueue } = useQueueList();

//   const queueWsUrl = useMemo(() => {
//     if (!apiUrl) {
//       throw new Error("apiUrl is required for Queue WebSocket");
//     }

//     const token = getToken();
//     if (!token) {
//       throw new Error("JWT token not found");
//     }

//     const parsed = new URL(apiUrl);
//     const wsProtocol = parsed.protocol === "https:" ? "wss:" : "ws:";

//     return `${wsProtocol}//${parsed.host}/api/v1/ws/notification/notifications_ws/${encodeURIComponent(
//       token
//     )}`;
//   }, []);

//   useEffect(() => {
//     if (!enabled) return;

//     let mounted = true;

//     (async () => {
//       try {
//         setLoading(true);
//         const res = await fetchQueue({});
//         if (mounted && res?.data?.list) {
//           setQueueList(res.data.list);
//         }
//       } catch (e) {
//         console.error("Fetch queue list error", e);
//       } finally {
//         setLoading(false);
//       }
//     })();

//     return () => {
//       mounted = false;
//     };
//   }, [enabled, fetchQueue]);

//   // 🔹 WebSocket live updates
//   useLiveWebSocket<INotifList[], INotifList | { list: INotifList[] }>({
//     url: queueWsUrl,
//     enabled,
//     setState: setQueueList,
//     onMessage: (message, prev) => {
//       // اگر لیست کامل آمده
//       if ("list" in (message as any)) {
//         return (message as any).list;
//       }

//       // اگر event-based update آمده (مثل JOB_UPDATE)، فقط data را استخراج کن
//       let item: INotifList;
//       if ("event" in (message as any) && "data" in (message as any)) {
//         item = (message as any).data;
//       } else {
//         item = message as INotifList;
//       }

//       const idx = prev.findIndex((p) => p.id === item.id);

//       if (idx === -1) {
//         return [item, ...prev].slice(0, 50);
//       }

//       const next = [...prev];
//       next[idx] = { ...next[idx], ...item };
//       return next;
//     },
//     reconnectDelay: 3000,
//   });

//   return { queueList, loading };
// };
