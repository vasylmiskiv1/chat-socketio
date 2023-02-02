import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import StartPage from "./pages/StartPage";

export default function App() {
  const { userData } = useSelector<any, any>((state) => state.chat);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("isLoadedSocketId", "");
  }, []);

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
