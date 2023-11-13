import { Route, Routes } from "react-router-dom";
import { RegisterAccount } from "../components/RegisterAccount";
import { Authorized } from "../components/Authorized";
import Home from "../components/Home";
import { Login } from "../components/Login";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterAccount />} />
      <Route element={<Authorized />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
};
