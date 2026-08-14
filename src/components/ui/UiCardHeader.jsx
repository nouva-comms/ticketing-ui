import { Box, Typography } from "@mui/material";
import UiIconBox from "./UiIconBox";

const UiCardHeader = ({
  icon,
  iconBackground = "primary.background",
  title,
  description,
  mb = 2.2,
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb }}>
      {icon && (
        <UiIconBox background={iconBackground} size={34}>
          {icon}
        </UiIconBox>
      )}

      <Box>
        <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "text.primary" }}>
          {title}
        </Typography>

        {description && (
          <Typography sx={{ mt: 0.3, fontSize: "11px", color: "text.secondary" }}>
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default UiCardHeader;