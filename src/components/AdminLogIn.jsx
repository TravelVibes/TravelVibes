import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../components/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { saveAdminLogInInfo } from "../store/auth";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { CONST } from "../constaints";

const AdminLogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const response = await axios.post(`${CONST.API_URL}/api/admin/login`, {
        email,
        password,
      });

      const { token } = response.data;
      dispatch(saveAdminLogInInfo(token));
      localStorage.setItem("adminToken", token);

      window.location = "/admin";
    } catch (e) {
      toast.error("Your email or password is incorrect.");
    }
  };

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-1/5 mx-auto flex flex-col space-y-5"
      >
        <FormInput
          name="Email"
          type="text"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <FormInput
          name="Password"
          type="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <Button>Sign In</Button>
      </form>
    </main>
  );
};

export default AdminLogIn;
