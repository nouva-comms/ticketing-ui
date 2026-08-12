import logo from "./logo.svg";
import "./App.css";
import { Routes } from "react-router-dom";
import { useState } from "react";
import TicketCreatePage from "./features/tickets/pages/TicketCreatePage";
// import TicketDetailPage from "./features/tickets/pages/TicketDetailPage";

function App() {
  const [test, setTest] = useState();

  return (
    <>
      <TicketCreatePage />
      {/* <TicketDetailPage/> */}
    </>
  );
}

export default App;
