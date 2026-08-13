import { useState } from "react";
import { Box, Typography, TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import BurstIcon from "../../../components/layout/BurstIcon";

const ADMIN_USERNAME = "Admin";
const ADMIN_PASSWORD = "123456";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setError("");
      navigate("/admin");
    } else {
      setError("Username atau password salah.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#000",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          right: "-15%",
          width: 480,
          height: 480,
          opacity: 0.35,
          pointerEvents: "none",
        }}
      >
        <BurstIcon fill="#0B1F8A" size="100%" />
      </Box>

      <Box
        component={RouterLink}
        to="/"
        sx={{
          position: "absolute",
          top: 28,
          left: { xs: 20, md: 40 },
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "rgba(255,255,255,.6)",
          fontSize: 14,
          textDecoration: "none",
          "&:hover": { color: "#fff" },
        }}
      >
        <ArrowLeft size={16} /> Kembali ke beranda
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 400,
          bgcolor: "rgba(255,255,255,.04)",
          border: "1px solid rgba(255,255,255,.12)",
          borderRadius: 4,
          p: { xs: 3.5, md: 5 },
          backdropFilter: "blur(6px)",
        }}
      >
        <Box
          component="img"
          src="/images/logoWhite.png"
          alt="Nouva Running"
          sx={{ height: 34, width: "auto", display: "block", mb: 4 }}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "primary.main" }} />
          <Typography sx={{ color: "rgba(255,255,255,.6)", fontSize: 12, letterSpacing: "0.14em", fontWeight: 600 }}>
            MASUK PENYELENGGARA
          </Typography>
        </Box>

        <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: 28, lineHeight: 1.15, mb: 1 }}>
          Selamat datang kembali.
        </Typography>
        <Typography sx={{ color: "rgba(255,255,255,.5)", fontSize: 14, lineHeight: 1.6, mb: 4 }}>
          Masuk untuk mengelola event lari kamu di Nouva Running.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <Box>
            <Typography sx={{ color: "rgba(255,255,255,.7)", fontSize: 13, fontWeight: 600, mb: 1 }}>
              Username
            </Typography>
            <TextField
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255,255,255,.06)",
                  borderRadius: 2.5,
                  color: "#fff",
                  "& fieldset": { borderColor: "rgba(255,255,255,.16)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,.3)" },
                  "&.Mui-focused fieldset": { borderColor: "primary.main" },
                },
                "& input::placeholder": { color: "rgba(255,255,255,.35)", opacity: 1 },
              }}
            />
          </Box>

          <Box>
            <Typography sx={{ color: "rgba(255,255,255,.7)", fontSize: 13, fontWeight: 600, mb: 1 }}>
              Password
            </Typography>
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((v) => !v)} edge="end" sx={{ color: "rgba(255,255,255,.5)" }}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255,255,255,.06)",
                  borderRadius: 2.5,
                  color: "#fff",
                  "& fieldset": { borderColor: "rgba(255,255,255,.16)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,.3)" },
                  "&.Mui-focused fieldset": { borderColor: "primary.main" },
                },
                "& input::placeholder": { color: "rgba(255,255,255,.35)", opacity: 1 },
              }}
            />
          </Box>

          {error && (
            <Typography sx={{ color: "#F44336", fontSize: 13, mt: -1 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 1,
              py: 1.3,
              borderRadius: 100,
              textTransform: "none",
              fontWeight: 700,
              bgcolor: "primary.main",
              boxShadow: "none",
              "&:hover": { bgcolor: "#021F8F", boxShadow: "none" },
            }}
          >
            Masuk
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;