import { Route, Routes, Navigate } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import StartPage from "./pages/StartPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<StartPage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
      </Routes>
    </>
  );
}
