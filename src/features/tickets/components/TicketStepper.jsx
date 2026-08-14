import UiStepper from "../../../components/ui/UiStepper";

const STEPS = [
  { label: "Data Pemesan" },
  { label: "Detail Ticket" },
  { label: "Metode Pembayaran" },
  { label: "Pembayaran" },
];

const TicketStepper = ({ activeStep = 1 }) => {
  return <UiStepper steps={STEPS} activeStep={activeStep} />;
};

export default TicketStepper;