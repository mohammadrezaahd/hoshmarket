import { useEffect, useRef, useState } from "react";
import { Box, Container, Typography } from "@mui/material";

/* =======================
   Types
======================= */

type LogLevel = "INFO" | "ANALYZE" | "WARNING" | "OK";

interface LogItem {
  level: LogLevel;
  message: string;
}

interface RenderLog {
  time: string;
  item: LogItem;
}

/* =======================
   Constants
======================= */

const logColors: Record<LogLevel, string> = {
  INFO: "#38BDF8",
  ANALYZE: "#A855F7",
  WARNING: "#FACC15",
  OK: "#22C55E",
};

const fakeLogs: LogItem[] = [
  { level: "INFO", message: "Initializing Hoshyar core modules" },
  { level: "ANALYZE", message: "Reading product input parameters" },
  { level: "ANALYZE", message: "Detecting Digikala category constraints" },
  { level: "INFO", message: "Matching attributes with marketplace standards" },
  { level: "WARNING", message: "Missing attribute detected: brand_origin" },
  { level: "ANALYZE", message: "Estimating optimal values from dataset" },
  { level: "INFO", message: "Optimizing title structure for visibility" },
  { level: "INFO", message: "Normalizing specification format" },
  { level: "OK", message: "Product structure validated successfully" },
  { level: "OK", message: "Ready for creation pipeline" },
];

/* =======================
   Utils
======================= */

const getTime = () =>
  new Date().toLocaleTimeString("en-US", { hour12: false });

/* =======================
   Component
======================= */

const HoshyarAILogsSection = () => {
  const [logs, setLogs] = useState<RenderLog[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  /* Stream logs */
  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      const nextLog = fakeLogs[index];

      if (!nextLog) {
        clearInterval(interval);
        return;
      }

      setLogs((prev) => [
        ...prev,
        { time: getTime(), item: nextLog },
      ]);

      index += 1;
    }, 850);

    return () => clearInterval(interval);
  }, []);

  /* Auto scroll */
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <Box
      sx={{
        py: { xs: 14, md: 20 },
        backgroundColor: "#020617",
        color: "#E5E7EB",
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            sx={{
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              color: "#38BDF8",
              mb: 2,
            }}
          >
            HOSHYAR INTERNAL STREAM
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "2rem", md: "2.6rem" },
              fontWeight: 900,
              lineHeight: 1.25,
            }}
          >
            هوشیار در حال پردازش است
          </Typography>

          <Typography
            sx={{
              color: "#94A3B8",
              mt: 3,
              maxWidth: 520,
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            این‌ها پیام تبلیغاتی نیستند.
            <br />
            بخشی از جریان تصمیم‌سازی قبل از ساخت هر محصول‌اند.
          </Typography>
        </Box>

        {/* Log Console */}
        <Box
          ref={containerRef}
          sx={{
            height: 340,
            overflowY: "auto",
            backgroundColor: "#020617",
            border: "1px solid rgba(148,163,184,0.2)",
            borderRadius: "1rem",
            p: 3,
            fontFamily: "monospace",
            boxShadow: "0 0 60px rgba(56,189,248,0.12)",
          }}
        >
          {logs.map((log, i) => {
            if (!log?.item) return null;

            return (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  gap: 2,
                  mb: 1.2,
                  fontSize: "0.85rem",
                }}
              >
                <Box sx={{ color: "#64748B", minWidth: 80 }}>
                  [{log.time}]
                </Box>

                <Box
                  sx={{
                    color: logColors[log.item.level],
                    minWidth: 80,
                  }}
                >
                  {log.item.level}
                </Box>

                <Box sx={{ color: "#E5E7EB" }}>
                  {log.item.message}
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Footer */}
        <Typography
          sx={{
            textAlign: "center",
            color: "#64748B",
            fontSize: "0.85rem",
            mt: 4,
          }}
        >
          هوشیار همیشه قبل از خروجی، این مسیر را طی می‌کند.
        </Typography>
      </Container>
    </Box>
  );
};

export default HoshyarAILogsSection;
