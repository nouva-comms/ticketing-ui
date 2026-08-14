import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const formatTime = (totalSeconds) => {
  const s = Math.max(0, totalSeconds);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

const UiCountdown = ({ seconds = 600, label = "Batas Waktu Tersisa", onExpire }) => {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (remaining <= 0) {
      onExpire?.();
      return;
    }
    const timer = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [remaining, onExpire]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        backgroundColor: "status.warning",
        color: "#fff",
        borderRadius: "10px",
        px: 2,
        py: 1.25,
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: "1rem" }}>
        {formatTime(remaining)}
      </Typography>
      <Box sx={{ width: "1px", alignSelf: "stretch", backgroundColor: "rgba(255,255,255,0.6)" }} />
      <Typography sx={{ fontSize: "14px" }}>{label}</Typography>
    </Box>
  );
};

export default UiCountdown;