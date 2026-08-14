import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";

const TABS = ["Deskripsi", "Syarat & Ketentuan", "Fasilitas"];

const EventTabs = ({ active, onChange }) => {
  const containerRef = useRef(null);
  const tabRefs = useRef([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const measure = () => {
    const el = tabRefs.current[active];
    const container = containerRef.current;
    if (!el || !container) return;
    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setIndicator({ left: elRect.left - containerRect.left, width: elRect.width });
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <Box ref={containerRef} sx={{ position: "relative" }}>
      <Box sx={{ display: "flex", gap: 3, borderBottom: "1px solid", borderColor: "border.main" }}>
        {TABS.map((label, i) => (
          <Box
            key={label}
            ref={(el) => (tabRefs.current[i] = el)}
            onClick={() => onChange(i)}
            sx={{ pb: 1.5, cursor: "pointer", whiteSpace: "nowrap" }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: active === i ? 700 : 500,
                color: active === i ? "text.primary" : "text.secondary",
                transition: "color .25s",
              }}
            >
              {label}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          height: 2,
          bgcolor: "primary.main",
          left: indicator.left,
          width: indicator.width,
          transition: "left .3s cubic-bezier(.16,1,.3,1), width .3s cubic-bezier(.16,1,.3,1)",
        }}
      />
    </Box>
  );
};

export default EventTabs;