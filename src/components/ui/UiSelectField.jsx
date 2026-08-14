import { useEffect, useState } from "react";
import {
  FormGroup,
  FormLabel,
  FormHelperText,
  Select,
  MenuItem,
} from "@mui/material";
import { ChevronDown } from "lucide-react";

const UiSelectField = ({
  children,
  id,
  size = "small",
  placeholder = "",
  options = [],
  value,
  onChange,
  helperText = "",
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
      <Select
        id={id}
        name={id}
        size={size === "medium" ? "medium" : "small"}
        displayEmpty
        value={value ?? ""}
        onChange={onChange}
        error={isValidationError(errorText)}
        IconComponent={(iconProps) => (
          <ChevronDown
            size={18}
            style={{
              position: "absolute",
              right: 12,
              pointerEvents: "none",
            }}
            {...iconProps}
          />
        )}
        sx={{
          borderRadius: "8px",
          fontSize: size === "extraSmall" ? "14px" : "1rem",
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "8px",
          },
        }}
        renderValue={(selected) => {
          if (!selected) {
            return <span style={{ color: "#9AA3AF" }}>{placeholder}</span>;
          }
          const found = options.find((o) => o.value === selected);
          return found ? found.label : selected;
        }}
        {...props}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {isValidationError(errorText) && (
        <FormHelperText sx={{ fontSize: "14px" }} error>
          {errorText}
        </FormHelperText>
      )}
      {helperText.trim().length > 0 && (
        <FormHelperText sx={{ fontSize: "14px" }}>{helperText}</FormHelperText>
      )}
    </FormGroup>
  );
};

export default UiSelectField;