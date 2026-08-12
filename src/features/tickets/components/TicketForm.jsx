import UiFormGroup from "../../../components/ui/UiFormGroup";
import {
  Box,
  Typography,
  Stack,
} from "@mui/material";
import { UserRound } from "lucide-react";
import UiBaseIcon from "../../../components/ui/UiBaseIcon";
import UiButtonIcon from "../../../components/ui/UiButtonIcon";

const TicketForm = () => {
  const Field = ({ label, placeholder, required = true }) => (
    <UiFormGroup placeholder={placeholder}>
      <Stack direction="row" alignItems="center">
        <Typography>{label}</Typography>
        {required && <Typography color="error">*</Typography>}
      </Stack>
    </UiFormGroup>
  );

  const Section = ({ number, title, fields = [] }) => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <UiButtonIcon bordered={true} size="small">
          {number}
        </UiButtonIcon>
        <Typography sx={{ fontWeight: 600 }}>{title}</Typography>
      </Box>
      {fields.map((f) => (
        <Field key={f.placeholder} {...f} />
      ))}
    </Box>
  );

  const sectionOneFields = [
    { label: "Nama Lengkap", placeholder: "Nama lengkap" },
    { label: "Nomor Identitas", placeholder: "Nomor Identitas" },
    { label: "Email", placeholder: "Email" },
    { label: "Nomor Telepon", placeholder: "Nomor Telepon" },
  ];

  const sectionTwoFields = [
    { label: "Usia", placeholder: "Usia" },
    { label: "Domisili Kota", placeholder: "Domisili Kota" },
    { label: "Gol. Darah", placeholder: "Golongan Darah" },
    { label: "Penyakit Bawaan", placeholder: "Penyakit Bawaan" },
    { label: "Nomor Darurat", placeholder: "Nomor Darurat" },
    { label: "Nama BIB", placeholder: "Nama BIB" },
    { label: "Alamat Lengkap", placeholder: "Alamat Lengkap" },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Section number={1} title="Data Pemesan" fields={sectionOneFields} />
      <Section number={2} title="Detail Tiket" fields={sectionTwoFields} />
    </Box>
  );
};

export default TicketForm;
