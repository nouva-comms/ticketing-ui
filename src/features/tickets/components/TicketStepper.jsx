import UiStepper from "../../../components/ui/UiStepper";

const STEPS = [
  { label: "Data Pemesan" },
  { label: "Detail Ticket" },
  { label: "Metode Pembayaran" },
  { label: "Pembayaran" },
];

const TicketStepper = ({ activeStep }) => {
  return <UiStepper steps={STEPS} activeStep={activeStep} />;
};

export default TicketStepper;