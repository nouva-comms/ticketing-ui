import { Box, Switch, Typography } from "@mui/material";

const UiSwitchRow = ({ label, checked, onChange, ...props }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Switch
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        size="small"
        {...props}
      />
      <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
        {label}
      </Typography>
    </Box>
  );
};

export default UiSwitchRow;