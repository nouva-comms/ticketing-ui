import { Box, Select, MenuItem, Typography } from "@mui/material";

const EventFilterBar = ({ categories, active, onChange, cities, city, onCityChange, resultCount }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", flex: 1 }}>
        {categories.map((cat) => (
          <Box
            key={cat}
            component="button"
            onClick={() => onChange(cat)}
            sx={{
              fontFamily: "monospace",
              fontSize: 12,
              px: 2,
              py: 1.1,
              borderRadius: 100,
              border: "1px solid",
              borderColor: active === cat ? "#0A0A0C" : "border.main",
              bgcolor: active === cat ? "#0A0A0C" : "#fff",
              color: active === cat ? "#fff" : "text.primary",
              cursor: "pointer",
              transition: "all .25s",
              "&:hover": { borderColor: active === cat ? "#0A0A0C" : "primary.main" },
            }}
          >
            {cat}
          </Box>
        ))}
      </Box>

      <Select
        size="small"
        value={city}
        onChange={(e) => onCityChange(e.target.value)}
        sx={{ borderRadius: 100, bgcolor: "#fff", fontSize: 13, minWidth: 150 }}
      >
        <MenuItem value="Semua Kota">Semua Kota</MenuItem>
        {cities.map((c) => (
          <MenuItem key={c} value={c}>
            {c}
          </MenuItem>
        ))}
      </Select>

      <Typography sx={{ fontFamily: "monospace", fontSize: 12, color: "#8a8a8f", whiteSpace: "nowrap" }}>
        {resultCount} event
      </Typography>
    </Box>
  );
};

export default EventFilterBar;
