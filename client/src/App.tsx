import { Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import StartPage from "./pages/StartPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
}
