import axios from "axios";
import history from "./history";
import get from "lodash/get";
import { toaster } from "evergreen-ui";
import { auth as useAuth } from "../hooks/auth";

export const api = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 20000
});

api.interceptors.request.use(
  function(config) {
    const { auth, cachedAuth } = useAuth(false);
    const isAuth =
      !!get(auth, "token", false) || !!get(cachedAuth, "token", false);
    if (
      config.url.includes("login") ||
      config.url.includes("register") ||
      config.url.includes("recover") ||
      config.url.includes("changePassword")
    ) {
      delete config.headers.Authorization;
    } else {
      if (isAuth) {
        const token =
          get(auth, "token", false) || get(cachedAuth, "token", false);
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        if (isAuth) {
          config.headers.Authorization = `Bearer ${get(auth, "token", false)}`;
        } else {
          if (
            !window.location.pathname.includes("login") &&
            !window.location.pathname.includes("register")
          ) {
            history.push("/entrar");
          }
        }
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function(response) {
    return response;
  },
  error => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        if (
          !window.location.pathname.includes("login") &&
          !window.location.pathname.includes("register")
        ) {
          toaster.danger("Session expired", { duration: 5 });
          localStorage.removeItem("project_auth");
          history.push("/entrar");
        }
      }
    } else {
      if (
        !window.location.pathname.includes("login") &&
        !window.location.pathname.includes("register")
      ) {
        localStorage.removeItem("project_auth");
        window.location.href = "/entrar";
      }
    }
    return Promise.reject(error);
  }
);

export const request = async req => {
  return api({
    url: `${process.env.REACT_APP_BASE_URL}/${req.baseUrl}/${req.route}`,
    data: req.payload || null,
    method: req.method
  });
};
