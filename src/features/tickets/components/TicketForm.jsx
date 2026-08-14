import { useState } from "react";
import { Box } from "@mui/material";
import TicketBuyerForm from "./TicketBuyerForm";
import TicketDetailSection from "./TicketDetailSection";

const emptyBuyer = {
  name: "",
  identityType: "",
  identityNumber: "",
  email: "",
  whatsapp: "",
};

const emptyTicket = {
  synced: false,
  name: "",
  identityType: "",
  identityNumber: "",
  email: "",
  gender: "",
  whatsapp: "",
  age: "",
  address: "",
  city: "",
  province: "",
};

const TicketForm = ({ items = [{ label: "CHILD - TICKETS ARTJOG", qty: 1 }], onStateChange }) => {
  const [buyer, setBuyer] = useState(emptyBuyer);

  const ticketSlots = items.flatMap((item, itemIndex) =>
    Array.from({ length: item.qty }, (_, i) => ({
      key: `${itemIndex}-${i}`,
      label: item.label || item.name,
    }))
  );

  const [tickets, setTickets] = useState(() =>
    ticketSlots.map(() => ({ ...emptyTicket }))
  );

  const updateBuyer = (next) => {
    setBuyer(next);
    onStateChange?.({ buyer: next, tickets });
  };

  const updateTicket = (i, next) => {
    const updated = tickets.map((t, idx) => (idx === i ? next : t));
    setTickets(updated);
    onStateChange?.({ buyer, tickets: updated });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TicketBuyerForm value={buyer} onChange={updateBuyer} />

      {ticketSlots.map((slot, i) => (
        <TicketDetailSection
          key={slot.key}
          index={i + 1}
          categoryLabel={slot.label}
          value={tickets[i]}
          onChange={(next) => updateTicket(i, next)}
          buyerData={buyer}
        />
      ))}
    </Box>
  );
};

export default TicketForm;