import { Box, IconButton, TextField, Typography } from "@mui/material";
import { Trash2 } from "lucide-react";

const DynamicPointsField = ({ label, placeholder, values, onChange }) => {
  const handleItemChange = (index, value) => {
    const next = [...values];
    next[index] = value;

    // Kalau poin terakhir baru saja diisi, otomatis buka poin berikutnya
    const isLast = index === next.length - 1;
    if (isLast && value.trim() !== "") {
      next.push("");
    }

    onChange(next);
  };

  const handleRemove = (index) => {
    const next = values.filter((_, i) => i !== index);
    onChange(next.length ? next : [""]);
  };

  return (
    <Box>
      <Typography sx={{ fontSize: "12px", fontWeight: 500, color: "text.secondary", mb: 1 }}>
        {label}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {values.map((val, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              sx={{
                width: 22,
                fontSize: "12px",
                fontWeight: 600,
                color: "text.secondary",
                flexShrink: 0,
              }}
            >
              {index + 1}.
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={val}
              placeholder={`${placeholder} ${index + 1}`}
              onChange={(e) => handleItemChange(index, e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: "13px" },
              }}
            />
            {values.length > 1 && (
              <IconButton
                size="small"
                onClick={() => handleRemove(index)}
                sx={{ color: "status.danger", flexShrink: 0 }}
              >
                <Trash2 size={16} />
              </IconButton>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DynamicPointsField;