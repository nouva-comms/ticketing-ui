import { FormGroup, FormLabel, InputAdornment, TextField, Box } from "@mui/material";

const flagColors = {
  ID: ["#FF0000", "#FFFFFF"],
};

const FlagChip = ({ country = "ID" }) => {
  const [top, bottom] = flagColors[country] || flagColors.ID;
  return (
    <Box
      sx={{
        width: 22,
        height: 16,
        borderRadius: "3px",
        overflow: "hidden",
        border: "1px solid #E0E0E0",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      <Box sx={{ flex: 1, backgroundColor: top }} />
      <Box sx={{ flex: 1, backgroundColor: bottom }} />
    </Box>
  );
};

/**
 * Reusable labeled phone input: flag + dial code prefix + number input.
 */
const UiPhoneField = ({
  children,
  id,
  size = "small",
  dialCode = "+62",
  country = "ID",
  value,
  onChange,
  placeholder = "",
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
      <TextField
        id={id}
        name={id}
        size={size === "medium" ? "medium" : "small"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type="tel"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" sx={{ gap: 0.75 }}>
                <FlagChip country={country} />
                <Box component="span" sx={{ color: "text.primary" }}>
                  {dialCode}
                </Box>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
          "& .MuiInputBase-input": {
            fontSize: size === "extraSmall" ? "14px" : "1rem",
          },
        }}
        {...props}
      />
    </FormGroup>
  );
};

export default UiPhoneField;