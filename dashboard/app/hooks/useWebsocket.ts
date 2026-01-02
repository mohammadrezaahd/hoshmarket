import { useEffect, useRef } from "react";

interface UseLiveWebSocketProps<TState, TMessage> {
  url: string;
  enabled?: boolean;
  setState: React.Dispatch<React.SetStateAction<TState>>;
  onMessage: (message: TMessage, prevState: TState) => TState;
  reconnectDelay?: number;
}

export function useLiveWebSocket<TState, TMessage>({
  url,
  enabled = true,
  setState,
  onMessage,
  reconnectDelay = 3000,
}: UseLiveWebSocketProps<TState, TMessage>) {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const manuallyClosedRef = useRef(false);

  const onMessageRef = useRef(onMessage);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    if (!enabled || !url) return;

    manuallyClosedRef.current = false;

    const connect = () => {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WS connected:", url);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as TMessage;
          setState((prev) => onMessageRef.current(data, prev));
        } catch (e) {
          console.error("WS message parse error", e);
        }
      };

      ws.onclose = (e) => {
        console.warn("WS closed:", e.code, e.reason);
        if (!manuallyClosedRef.current) {
          reconnectTimeoutRef.current = window.setTimeout(
            connect,
            reconnectDelay
          );
        }
      };

      ws.onerror = () => {
        ws.close();
      };
    };

    connect();

    return () => {
      manuallyClosedRef.current = true;
      wsRef.current?.close();
      wsRef.current = null;

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [url, enabled, reconnectDelay, setState]);
}
