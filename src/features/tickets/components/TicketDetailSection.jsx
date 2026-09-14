import { Box, Stack, Typography } from "@mui/material";
import { Ticket } from "lucide-react";
import UiFormGroup from "../../../components/ui/UiFormGroup";
import UiSelectField from "../../../components/ui/UiSelectField";
import UiPhoneField from "../../../components/ui/UiPhoneField";
import UiToggleGroup from "../../../components/ui/UiToggleGroup";
import UiBaseIcon from "../../../components/ui/UiBaseIcon";
import { AGE_OPTIONS } from "../constants";

const RequiredLabel = ({ children, required = true }) => (
  <Stack direction="row" alignItems="center" spacing={0.25}>
    <Typography>{children}</Typography>
    {required && <Typography color="error">*</Typography>}
  </Stack>
);

const TicketDetailSection = ({
  index,
  categoryLabel,
  value,
  onChange,
  errors = {},
  genderOptions = [],
  sizeOptions = [],
}) => {
  const handleField = (field) => (e) =>
    onChange?.({ ...value, [field]: e.target.value });

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "border.main",
        borderRadius: "12px",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <UiBaseIcon active>
          <Ticket />
        </UiBaseIcon>
        <Typography sx={{ fontWeight: 600 }}>Detail Tiket</Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "primary.background",
          borderRadius: "8px",
          textAlign: "center",
          py: 1,
          fontWeight: 700,
          fontSize: "1rem",
          color: "primary.main",
        }}
      >
        {categoryLabel}
      </Box>

      <UiToggleGroup
        id={`ticket-${index}-gender`}
        options={genderOptions}
        value={value.gender}
        onChange={(v) => onChange?.({ ...value, gender: v })}
        fullWidth
        error={errors.gender}
      >
        <RequiredLabel>Jenis Kelamin</RequiredLabel>
      </UiToggleGroup>

      <UiSelectField
        id={`ticket-${index}-age`}
        placeholder="Usia"
        options={AGE_OPTIONS}
        value={value.age}
        onChange={(e) => onChange?.({ ...value, age: e.target.value })}
        error={errors.age}
      >
        <RequiredLabel>Usia</RequiredLabel>
      </UiSelectField>

      <UiFormGroup
        id={`ticket-${index}-address`}
        placeholder="Alamat"
        value={value.address}
        onChange={handleField("address")}
        error={errors.address}
      >
        <RequiredLabel>Alamat</RequiredLabel>
      </UiFormGroup>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
        }}
      >
        <UiFormGroup
          id={`ticket-${index}-city`}
          placeholder="Kota"
          value={value.city}
          onChange={handleField("city")}
          error={errors.city}
        >
          <RequiredLabel>Kota</RequiredLabel>
        </UiFormGroup>

        <UiFormGroup
          id={`ticket-${index}-province`}
          placeholder="Provinsi"
          value={value.province}
          onChange={handleField("province")}
          error={errors.province}
        >
          <RequiredLabel>Provinsi</RequiredLabel>
        </UiFormGroup>
      </Box>

      <UiFormGroup
        id={`ticket-${index}-blood-type`}
        placeholder="Contoh: A / B / AB / O"
        value={value.bloodType}
        onChange={handleField("bloodType")}
        error={errors.bloodType}
      >
        <RequiredLabel>Golongan Darah</RequiredLabel>
      </UiFormGroup>

      <UiFormGroup
        id={`ticket-${index}-disease`}
        placeholder="Penyakit Bawaan"
        value={value.disease}
        onChange={handleField("disease")}
        error={errors.disease}
      >
        <RequiredLabel>Penyakit Bawaan</RequiredLabel>
      </UiFormGroup>

      <UiPhoneField
        id={`ticket-${index}-emergency-contact`}
        placeholder="Kontak Darurat"
        value={value.emergencyContact}
        onChange={handleField("emergencyContact")}
        error={errors.emergencyContact}
      >
        <RequiredLabel>Kontak Darurat</RequiredLabel>
      </UiPhoneField>

      <UiToggleGroup
        id={`ticket-${index}-shirt-size`}
        options={sizeOptions}
        value={value.shirtSize}
        onChange={(v) => onChange?.({ ...value, shirtSize: v })}
        fullWidth
        error={errors.shirtSize}
      >
        <RequiredLabel>Ukuran Baju</RequiredLabel>
      </UiToggleGroup>

      <UiFormGroup
        id={`ticket-${index}-bib-name`}
        placeholder="Nama BIB"
        value={value.bibName}
        onChange={handleField("bibName")}
        error={errors.bibName}
      >
        <RequiredLabel>Nama BIB</RequiredLabel>
      </UiFormGroup>
    </Box>
  );
};

export default TicketDetailSection;