import {
  FormGroup,
  FormLabel,
  ToggleButton,
  ToggleButtonGroup,
  FormHelperText,
} from "@mui/material";
import { useState, useEffect } from "react";

const UiToggleGroup = ({
  children,
  id,
  size = "small",
  options = [],
  value,
  onChange,
  fullWidth = false,
  error = "",
  ...props
}) => {
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    setErrorText(error);
  }, [error]);

  const isValidationError = (err = "") => err.trim().length > 0;

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
          "& .MuiToggleButton-root": {
            borderColor: isValidationError(errorText) ? "#d32f2f" : "border.main",
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
              borderColor: isValidationError(errorText) ? "#d32f2f" : "border.main",
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
      {isValidationError(errorText) && (
        <FormHelperText sx={{ fontSize: "14px" }} error>
          {errorText}
        </FormHelperText>
      )}
    </FormGroup>
  );
};

export default UiToggleGroup;
