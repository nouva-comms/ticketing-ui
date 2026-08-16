import { Button, Tooltip } from "@mui/material";

function UiButtonIcon({
  children,
  title,
  size = "medium",
  bordered = false,
  loading = false,
  active = false,
  ...prop
}) {
  const dimension = size === "small" ? "24px" : size == "large" ? "50px" : "2rem" ;
  const color = active ? "#032FD9" : "#858585";

  return (
    <Tooltip title={title} placement="bottom">
      <Button
        loading={loading}
        color="icon.main"
        sx={{
          minWidth: dimension,
          height: dimension,
          padding: 0,
          color: "icon.main",
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
          borderRadius:"8px",
          border: bordered ? `1px solid ${color}` : "none",
          "&:hover": {
            backgroundColor: "#0B120E24",
          },

          "&:active": {
            backgroundColor: "#0B120E24",
          },
        }}
        {...prop}
      >
        {children}
      </Button>
    </Tooltip>
  );
}

export default UiButtonIcon;
