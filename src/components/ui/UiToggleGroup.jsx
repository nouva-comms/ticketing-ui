import {
  FormGroup,
  FormLabel,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

const UiToggleGroup = ({
  children,
  id,
  size = "small",
  options = [],
  value,
  onChange,
  fullWidth = false,
  ...props
}) => {
  return (
    <FormGroup>
      {children && (
        <FormLabel
          sx={{
            fontSize: size === "extraSmall" ? "14px" : "1rem",
            color: "text.primary",
          }}
          htmlFor={id}
        >
          {children}
        </FormLabel>
      )}
      <ToggleButtonGroup
        id={id}
        exclusive
        value={value}
        onChange={(e, newValue) => {
          if (newValue !== null) onChange?.(newValue);
        }}
        sx={{
          gap: 1,
          "& .MuiToggleButtonGroup-lastButton, & .MuiToggleButtonGroup-middleButton":
            {
              borderLeft: "1px solid #D1D9E0",
              "&.Mui-selected": {
                color: "primary.main",
                borderColor: "primary.main",
                backgroundColor: "primary.background",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "primary.background",
              },
            },
        }}
        {...props}
      >
        {options.map((opt) => (
          <ToggleButton
            key={opt.value}
            value={opt.value}
            sx={{
              flex: fullWidth ? 1 : "0 0 auto",
              display: "flex",
              gap: 0.75,
              textTransform: "none",
              borderRadius: "8px !important",
              border: "1px solid",
              borderColor: "border.main",
              color: "text.secondary",
              fontSize: size === "extraSmall" ? "14px" : "1rem",
              "&.Mui-selected": {
                color: "primary.main",
                borderColor: "primary.main",
                backgroundColor: "primary.background",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "primary.background",
              },
            }}
          >
            {opt.icon}
            {opt.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </FormGroup>
  );
};

export default UiToggleGroup;
