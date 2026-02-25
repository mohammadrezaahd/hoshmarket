import React, { useEffect, useState } from "react";
import { Box, Typography, Stack } from "@mui/material";

const DEADLINE = new Date("2026-03-10T23:59:59").getTime();

const calculateTimeLeft = () => {
  const now = new Date().getTime();
  const difference = DEADLINE - now;

  if (difference <= 0) {
    return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    expired: false,
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (timeLeft.expired) {
    return (
      <Typography sx={{ color: "#EF4444", fontWeight: 700 }}>
        زمان این پیشنهاد به پایان رسیده است.
      </Typography>
    );
  }

  const items = [
    { label: "روز", value: timeLeft.days },
    { label: "ساعت", value: timeLeft.hours },
    { label: "دقیقه", value: timeLeft.minutes },
    { label: "ثانیه", value: timeLeft.seconds },
  ];

  return (
    <Box>
      {/* ⏳ Countdown */}
      <Stack direction="row" spacing={0} justifyContent="center">
        {items.map((item) => (
          <Box
            key={item.label}
            sx={{
              m: "3px",
              background: "rgba(0, 0, 0, 0.17)",
              border: "1px solid rgba(253, 252, 255, 1)",
              backdropFilter: "blur(20px)",
              p: 3,
              borderRadius: 3,
              minWidth: 90,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ color: "#F8FAFC" }}
            >
              {item.value.toString().padStart(2, "0")}
            </Typography>
            <Typography variant="body2" sx={{ color: "#CBD5E1" }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Stack>

      {/* 🔥 Promotion Message */}
      <Typography
        sx={{
          textAlign: "center",
          mt: 1,
          fontSize: 12,
          color: "#ffffffff",
        }}
      >
        <Box
          component="span"
          sx={{
            fontSize: 42,
            fontWeight: 900,
            fontFamily: "Kalameh-Bold",
            color: "#8d8d8dff",
            mx: 1,
          }}
          
        >
          تا پایان
        </Box>
        <br />
        <br />
        تخفیف‌های جشن تولد سرویس‌هاب دیجی‌کالا{" "}
        <br />
        <br />
        <Box
          component="span"
          sx={{
            fontSize: 22,
            fontWeight: 900,
            fontFamily: "Kalameh-Bold",
            color: "#d7e0ffff",
            mx: 1,
          }}
          
        >
          ٪20
        </Box>
        تا
        <Box
          component="span"
          sx={{
            fontSize: 22,
            fontWeight: 900,
            fontFamily: "Kalameh-Bold",
            color: "#d7e0ffff",
            mx: 1,
          }}
        >
          50٪
        </Box>
      </Typography>
    </Box>
  );
};

export default CountdownTimer;