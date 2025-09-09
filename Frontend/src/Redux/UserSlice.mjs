import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("p_token") || "",
  isLoggedin: localStorage.getItem("p_token") ? true : false,
  role: localStorage.getItem("p_role") || "none"
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.isLoggedin = true;
      state.token = action.payload.Token;
      state.role = action.payload.Role;
      localStorage.setItem("p_token",state.token);
      localStorage.setItem("p_role",state.role)
    },
    removeUser: (state, action) => {
      state.token = "";
      state.isLoggedin = false;
      localStorage.removeItem("p_token");
      localStorage.removeItem("p_role")
      state.role = "none"
    },
    resetUser: () => initialState,
  },
});

export const { addUser, removeUser, resetUser } = user.actions;
export default user.reducer;
