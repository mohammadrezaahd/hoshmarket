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
  const reconnectTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let manuallyClosed = false;

    const connect = () => {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as TMessage;
          setState((prev) => onMessage(data, prev));
        } catch (e) {
          console.error("WS message error", e);
        }
      };

      ws.onclose = () => {
        if (!manuallyClosed) {
          reconnectTimeout.current = window.setTimeout(connect, reconnectDelay);
        }
      };

      ws.onerror = () => {
        ws.close();
      };
    };

    connect();

    return () => {
      manuallyClosed = true;
      wsRef.current?.close();
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, [url, enabled]);
}
