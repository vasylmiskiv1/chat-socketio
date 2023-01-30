import { Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import StartPage from "./pages/StartPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </>
  );
}
