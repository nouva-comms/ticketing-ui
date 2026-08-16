import UiStepper from "../../../components/ui/UiStepper";

const STEPS = [
  { label: "Data Pemesan" },
  { label: "Detail Ticket" },
  { label: "Pembayaran" },
  { label: "Selesai" },
];

const TicketStepper = ({ activeStep }) => {
  return <UiStepper steps={STEPS} activeStep={activeStep} />;
};

export default TicketStepper;