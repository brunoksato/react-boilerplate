import { useStore as store } from "easy-peasy";
import { initialState } from "../models/auth";

export const auth = (withHook = true) => {
  const authStorage = localStorage.getItem("project_auth");
  let auth;
  if (withHook) {
    auth = store(state => state.auth);
  }
  // @ts-ignore
  const cachedAuth = JSON.parse(authStorage) || {
    auth: initialState
  };
  return {
    auth,
    cachedAuth
  };
};
