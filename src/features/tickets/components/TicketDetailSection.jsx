import { Box, Stack, Typography } from "@mui/material";
import { Ticket, Mars, Venus } from "lucide-react";
import UiFormGroup from "../../../components/ui/UiFormGroup";
import UiSelectField from "../../../components/ui/UiSelectField";
import UiPhoneField from "../../../components/ui/UiPhoneField";
import UiToggleGroup from "../../../components/ui/UiToggleGroup";
import UiSwitchRow from "../../../components/ui/UiSwitchRow";
import UiBaseIcon from "../../../components/ui/UiBaseIcon";
import {
  IDENTITY_TYPE_OPTIONS,
  AGE_OPTIONS,
  GENDER_OPTIONS,
  SHIRT_SIZE_OPTIONS,
} from "../constants";

const RequiredLabel = ({ children, required = true }) => (
  <Stack direction="row" alignItems="center" spacing={0.25}>
    <Typography>{children}</Typography>
    {required && <Typography color="error">*</Typography>}
  </Stack>
);

const GENDER_ICONS = {
  male: <Mars size={16} />,
  female: <Venus size={16} />,
};

const TicketDetailSection = ({
  index,
  categoryLabel,
  value,
  onChange,
  buyerData,
  showSyncToggle = true,
}) => {
  const handleField = (field) => (e) =>
    onChange?.({ ...value, [field]: e.target.value });

  const handleSyncToggle = (checked) => {
    if (checked) {
      onChange?.({
        ...value,
        synced: true,
        name: buyerData?.name || "",
        identityType: buyerData?.identityType || "",
        identityNumber: buyerData?.identityNumber || "",
        email: buyerData?.email || "",
        whatsapp: buyerData?.whatsapp || "",
      });
    } else {
      onChange?.({ ...value, synced: false });
    }
  };

  const disabled = !!value.synced;

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <UiBaseIcon active>
            <Ticket />
          </UiBaseIcon>
          <Typography sx={{ fontWeight: 600 }}>
            Detail Tiket - {index}
          </Typography>
        </Box>
        {/* {showSyncToggle && (
          <UiSwitchRow
            label="Samakan dengan detail pemesan"
            checked={disabled}
            onChange={handleSyncToggle}
          />
        )} */}
      </Box>

      <Box
        sx={{
          backgroundColor: "primary.background",
          borderRadius: "8px",
          textAlign: "center",
          py: 1,
          fontWeight: 700,
          fontSize: "14px",
        }}
      >
        {categoryLabel}
      </Box>

      {/* Nama Lengkap */}
      {/* <UiFormGroup
        id={`ticket-${index}-name`}
        placeholder="Masukkan nama lengkap Anda"
        value={value.name}
        onChange={handleField("name")}
        disabled={disabled}
      >
        <RequiredLabel>Nama Lengkap</RequiredLabel>
      </UiFormGroup> */}

      {/* Identitas */}
      {/* <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
        }}
      >
        <UiSelectField
          id={`ticket-${index}-identity-type`}
          placeholder="Pilih tipe identitas Anda"
          options={IDENTITY_TYPE_OPTIONS}
          value={value.identityType}
          onChange={(e) =>
            onChange?.({ ...value, identityType: e.target.value })
          }
          disabled={disabled}
        >
          <RequiredLabel>Tipe Identitas</RequiredLabel>
        </UiSelectField>

        <UiFormGroup
          id={`ticket-${index}-identity-number`}
          placeholder="Masukkan nomor identitas Anda"
          value={value.identityNumber}
          onChange={handleField("identityNumber")}
          disabled={disabled}
        >
          <RequiredLabel>Nomor Identitas</RequiredLabel>
        </UiFormGroup>
      </Box> */}

      {/* Email */}
      {/* <UiFormGroup
        id={`ticket-${index}-email`}
        placeholder="Masukkan email Anda"
        type="email"
        value={value.email}
        onChange={handleField("email")}
        disabled={disabled}
      >
        <RequiredLabel>Email</RequiredLabel>
      </UiFormGroup> */}

      <UiToggleGroup
        id={`ticket-${index}-gender`}
        options={GENDER_OPTIONS.map((o) => ({
          ...o,
          icon: GENDER_ICONS[o.value],
        }))}
        value={value.gender}
        onChange={(v) => onChange?.({ ...value, gender: v })}
        fullWidth
      >
        <RequiredLabel>Jenis Kelamin</RequiredLabel>
      </UiToggleGroup>

      {/* Phone Number */}
      {/* <UiPhoneField
        id={`ticket-${index}-whatsapp`}
        placeholder="8123456789"
        value={value.whatsapp}
        onChange={handleField("whatsapp")}
        disabled={disabled}
      >
        <RequiredLabel>No. WhatsApp</RequiredLabel>
      </UiPhoneField> */}

      <UiSelectField
        id={`ticket-${index}-age`}
        placeholder="Usia"
        options={AGE_OPTIONS}
        value={value.age}
        onChange={(e) => onChange?.({ ...value, age: e.target.value })}
      >
        <RequiredLabel>Usia</RequiredLabel>
      </UiSelectField>

      <UiFormGroup
        id={`ticket-${index}-address`}
        placeholder="Alamat"
        value={value.address}
        onChange={handleField("address")}
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
        >
          <RequiredLabel>Kota</RequiredLabel>
        </UiFormGroup>

        <UiFormGroup
          id={`ticket-${index}-province`}
          placeholder="Provinsi"
          value={value.province}
          onChange={handleField("province")}
        >
          <RequiredLabel>Provinsi</RequiredLabel>
        </UiFormGroup>
      </Box>

      <UiFormGroup
        id={`ticket-${index}-disease`}
        placeholder="Penyakit Bawaan"
        value={value.disease}
        onChange={handleField("disease")}
      >
        <RequiredLabel>Penyakit Bawaan</RequiredLabel>
      </UiFormGroup>

      <UiFormGroup
        id={`ticket-${index}-emergency-contact`}
        placeholder="Kontak Darurat"
        value={value.emergencyContact}
        onChange={handleField("emergencyContact")}
      >
        <RequiredLabel>Kontak Darurat</RequiredLabel>
      </UiFormGroup>

      <UiToggleGroup
        id={`ticket-${index}-shirt-size`}
        options={SHIRT_SIZE_OPTIONS.map((o) => ({
          ...o,
        }))}
        value={value.shirtSize}
        onChange={(v) => onChange?.({ ...value, shirtSize: v })}
        fullWidth
      >
        <RequiredLabel>Ukuran Baju</RequiredLabel>
      </UiToggleGroup>

      <UiFormGroup
        id={`ticket-${index}-bib-name`}
        placeholder="Nama BIB"
        value={value.bibName}
        onChange={handleField("bibName")}
      >
        <RequiredLabel>Nama BIB</RequiredLabel>
      </UiFormGroup>
    </Box>
  );
};

export default TicketDetailSection;
