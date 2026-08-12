import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AppLayout = ({ title, children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F7F8FA" }}>
      <Sidebar />
      <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <Topbar title={title} />
        <Box sx={{ flex: 1, p: { xs: 2, md: 4 } }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
