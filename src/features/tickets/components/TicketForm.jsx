import { useState, useImperativeHandle, forwardRef } from "react";
import { useSearchParams } from "react-router-dom";
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
  disease: "",
  emergencyContact: "",
  shirtSize: "",
  bibName:""
};

const TicketForm = forwardRef(({
  activeStep,
  items = [{ label: "CHILD - TICKETS ARTJOG", qty: 1 }],
  onStateChange,
}, ref) => {
  const [buyer, setBuyer] = useState(emptyBuyer);
  const [buyerErrors, setBuyerErrors] = useState({});
  const [ticketErrors, setTicketErrors] = useState([]);

  const ticketSlots = items.flatMap((item, itemIndex) =>
    Array.from({ length: item.qty }, (_, i) => ({
      key: `${itemIndex}-${i}`,
      label: item.label || item.name,
    })),
  );

  const [tickets, setTickets] = useState(() =>
    ticketSlots.map(() => ({ ...emptyTicket })),
  );

  const validateBuyer = () => {
    const errors = {};
    if (!buyer.name?.trim()) errors.name = "Nama lengkap wajib diisi";
    if (!buyer.identityType?.trim()) errors.identityType = "Tipe identitas wajib dipilih";
    if (!buyer.identityNumber?.trim()) errors.identityNumber = "Nomor identitas wajib diisi";
    if (!buyer.email?.trim()) errors.email = "Email wajib diisi";
    if (!buyer.whatsapp?.trim()) errors.whatsapp = "No. WhatsApp wajib diisi";
    
    setBuyerErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateTickets = () => {
    const errors = tickets.map((ticket) => {
      const ticketError = {};
      if (!ticket.gender?.trim()) ticketError.gender = "Jenis kelamin wajib dipilih";
      if (!ticket.age?.trim()) ticketError.age = "Usia wajib dipilih";
      if (!ticket.address?.trim()) ticketError.address = "Alamat wajib diisi";
      if (!ticket.city?.trim()) ticketError.city = "Kota wajib diisi";
      if (!ticket.province?.trim()) ticketError.province = "Provinsi wajib diisi";
      if (!ticket.disease?.trim()) ticketError.disease = "Penyakit bawaan wajib diisi";
      if (!ticket.emergencyContact?.trim()) ticketError.emergencyContact = "Kontak darurat wajib diisi";
      if (!ticket.shirtSize?.trim()) ticketError.shirtSize = "Ukuran baju wajib diisi";
      if (!ticket.bibName?.trim()) ticketError.bibName = "Nama BIB wajib diisi";

      return ticketError;
    });
    
    setTicketErrors(errors);
    return errors.every(err => Object.keys(err).length === 0);
  };

  const validateCurrentStep = () => {
    if (activeStep === 0) {
      return validateBuyer();
    } else if (activeStep === 1) {
      return validateTickets();
    }
    return true;
  };

  useImperativeHandle(ref, () => ({
    validateCurrentStep,
  }));

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
      {activeStep === 0 && (
        <TicketBuyerForm 
          value={buyer} 
          onChange={updateBuyer}
          errors={buyerErrors}
        />
      )}

      {activeStep === 1 && (
        <>
          {ticketSlots.map((slot, i) => (
            <TicketDetailSection
              key={slot.key}
              index={i + 1} 
              categoryLabel={slot.label}
              value={tickets[i]}
              onChange={(next) => updateTicket(i, next)}
              buyerData={buyer}
              errors={ticketErrors[i] || {}}
            />
          ))}
        </>
      )}
    </Box>
  );
});

TicketForm.displayName = "TicketForm";

export default TicketForm;
