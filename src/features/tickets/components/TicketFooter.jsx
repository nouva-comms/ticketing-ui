import { Typography } from "@mui/material"
import UiButton from "../../../components/ui/UiButton"
import { Box } from "@mui/material"

const TicketFooter = () => {
    return (
        <Box
            sx={{
                mt: "auto",
                position: "sticky",
                bottom: 0,
                backgroundColor: "#fff",
                borderTop: "1px solid #e5e5e5",
                pt: 2,
                pb: 1.5,
                px: 2,
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                <Typography>Total Bayar</Typography>
                <Typography>Rp185.000</Typography>
            </Box>
            <UiButton fullWidth={true}>Lanjutkan</UiButton>
        </Box>
    )
}

export default TicketFooter
