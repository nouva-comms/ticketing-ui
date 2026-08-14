import { Box, Stack, Typography } from "@mui/material";
import { UserRound } from "lucide-react";
import UiFormGroup from "../../../components/ui/UiFormGroup";
import UiSelectField from "../../../components/ui/UiSelectField";
import UiPhoneField from "../../../components/ui/UiPhoneField";
import UiBaseIcon from "../../../components/ui/UiBaseIcon";
import { IDENTITY_TYPE_OPTIONS } from "../constants";

const RequiredLabel = ({ children }) => (
  <Stack direction="row" alignItems="center" spacing={0.25}>
    <Typography>{children}</Typography>
    <Typography color="error">*</Typography>
  </Stack>
);

const TicketBuyerForm = ({ value, onChange }) => {
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
          <UserRound />
        </UiBaseIcon>
        <Typography sx={{ fontWeight: 600 }}>Data Pemesan</Typography>
      </Box>

      <UiFormGroup
        id="buyer-name"
        placeholder="Masukkan nama lengkap Anda"
        value={value.name}
        onChange={handleField("name")}
      >
        <RequiredLabel>Nama Lengkap</RequiredLabel>
      </UiFormGroup>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
        }}
      >
        <UiSelectField
          id="buyer-identity-type"
          placeholder="Pilih tipe identitas Anda"
          options={IDENTITY_TYPE_OPTIONS}
          value={value.identityType}
          onChange={(e) =>
            onChange?.({ ...value, identityType: e.target.value })
          }
        >
          <RequiredLabel>Tipe Identitas</RequiredLabel>
        </UiSelectField>

        <UiFormGroup
          id="buyer-identity-number"
          placeholder="Masukkan nomor identitas Anda"
          value={value.identityNumber}
          onChange={handleField("identityNumber")}
        >
          <RequiredLabel>Nomor Identitas</RequiredLabel>
        </UiFormGroup>
      </Box>

      <UiFormGroup
        id="buyer-email"
        placeholder="Masukkan email Anda"
        type="email"
        value={value.email}
        onChange={handleField("email")}
      >
        <RequiredLabel>Email</RequiredLabel>
      </UiFormGroup>

      <UiPhoneField
        id="buyer-whatsapp"
        placeholder="8123456789"
        value={value.whatsapp}
        onChange={handleField("whatsapp")}
      >
        <RequiredLabel>No. WhatsApp</RequiredLabel>
      </UiPhoneField>
    </Box>
  );
};

export default TicketBuyerForm;