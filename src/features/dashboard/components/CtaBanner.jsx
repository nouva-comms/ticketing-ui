import { Box, Typography, Button } from "@mui/material";
import PageContainer from "../../../components/layout/PageContainer";

const CtaBanner = () => {
  return (
    <Box id="penyelenggara" sx={{ py: { xs: 6, md: 8 } }}>
      <PageContainer>
        <Box
          sx={{
            bgcolor: "primary.main",
            borderRadius: 4,
            p: { xs: 4, md: 6 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4,
            flexWrap: "wrap",
          }}
        >
          <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: 24, md: 32 }, maxWidth: 460, lineHeight: 1.2 }}>
            Menyelenggarakan event lari? Pasang di Nouva Running dan jangkau ribuan pelari.
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#fff",
              color: "primary.main",
              borderRadius: 100,
              textTransform: "none",
              px: 3.5,
              py: 1.4,
              boxShadow: "none",
              "&:hover": { bgcolor: "#F5F5F4", boxShadow: "none" },
            }}
          >
            Daftarkan Event Kamu
          </Button>
        </Box>
      </PageContainer>
    </Box>
  );
};

export default CtaBanner;