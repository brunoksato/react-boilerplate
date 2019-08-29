import { thunk, action } from "easy-peasy";
import { login, signup, change, forgot } from "../services/auth";
import history from "../utils/history";
import { get } from "lodash";
import { toaster } from "evergreen-ui";
import { format } from "date-fns";
import { checkLocalStorage, setInLocalStorage } from "../utils/localstorage";
import { GetMe } from "../services/user";

// rehydrate the auth state from localStorage if it exist
export const initialState = checkLocalStorage("project_auth", {
  token: null,
  isAuthenticated: false
});

const auth = {
  ...initialState,
  isAuthLoading: false,
  authError: "",
  isValidate: false,
  authenticateUser: thunk(async (action, payload) => {
    action.updateIsAuthLoading({ loading: true });
    try {
      const response = await login(payload);
      action.updateAuth(response.data);
      action.updateIsAuthLoading({ loading: false });
      history.push("/");
    } catch (error) {
      if (error.response) {
        action.updateIsAuthLoading({ loading: false });
        if (error.response.data.message) {
          action.updateAuthError({
            message: error.response.data.message
          });
        } else {
          action.updateAuthError({
            message: error.response.data.status
          });
        }
      } else {
        // generic error
        action.updateIsAuthLoading({ loading: false });
        action.updateAuthError({
          message: "Username or password incorrect."
        });
      }
    }
  }),
  createUser: thunk(async (action, payload) => {
    action.updateIsAuthLoading({ loading: true });
    try {
      await signup(payload);
      const authResponse = await login({
        email: payload.email,
        password: payload.password
      });
      action.updateAuth(authResponse.data);
      action.updateIsAuthLoading({ loading: false });
      history.push("/");
      window.scrollTo(0, 0);
    } catch (error) {
      if (error.response) {
        if (error.response.data.message.includes("idx_users_email")) {
          action.updateAuthError({
            message: "Este email ja esta cadastrado."
          });
        }
      } else {
        action.updateAuthError({
          message: "An error has occurred, please try again."
        });
      }
      action.updateIsAuthLoading({ loading: false });
      window.scrollTo(0, 0);
    }
  }),
  getMe: thunk(async (action, payload) => {
    const response = await GetMe();
    if (response.status > 399) {
      toaster.danger("Something wrong with your user, please do login again.", {
        duration: 5,
        id: "error-me"
      });
      localStorage.removeItem("project_auth");
      window.location.href = "/entrar";
    } else {
      action.updateSession(response.data.results);
    }
  }),
  forgotPassword: thunk(async (action, payload) => {
    action.updateIsAuthLoading({ loading: true });
    try {
      await forgot(payload);
      console.log("oi");
      action.updateIsAuthLoading({ loading: false });
      action.setMsgForgot(
        "Nós enviamos o email com o link para redefinir a senha"
      );
    } catch (error) {
      action.updateIsAuthLoading({ loading: false });
      action.updateAuthError({
        message: "Email não encontrado."
      });
    }
  }),
  changePassword: thunk(async (action, payload) => {
    action.updateIsAuthLoading({ loading: true });
    try {
      await change(payload);
      action.updateIsAuthLoading({ loading: false });
      toaster.success("Atualizado com sucesso.", {
        duration: 3,
        id: "change-password-user"
      });
    } catch (error) {
      action.updateIsAuthLoading({ loading: false });
      action.updateAuthError({
        message: "Token inválido."
      });
    }
  }),
  updateSession: action((state, payload) => {
    const auth = JSON.parse(localStorage.getItem("project_auth"));
    setInLocalStorage("project_auth", {
      isAuthenticated: auth.isAuthenticated,
      token: auth.token,
      user: payload
    });

    state.user = payload;
  }),
  updateAuth: action((state, payload) => {
    const token = get(payload, "token", "");
    const user = get(payload, "results", "");
    const isAuthenticated = true;

    // store the auth state offline
    setInLocalStorage("project_auth", {
      isAuthenticated,
      token,
      user
    });

    state.isAuthenticated = isAuthenticated;
    state.token = token;
    state.user = user;
  }),
  updateIsAuthLoading: action((state, payload) => {
    const loading = get(payload, "loading", false);
    state.isAuthLoading = loading;
  }),
  updateAuthError: action((state, payload) => {
    const errorMessage = get(payload, "message", "");
    state.authError = errorMessage;
  }),
  setMsgForgot: action((state, payload) => {
    state.msgForgot = payload;
  }),
  clearAuth: action(state => {
    localStorage.removeItem("project_auth");
    state.token = initialState.token;
    state.isAuthenticated = initialState.isAuthenticated;
    window.location.href = "/entrar";
  })
};

export default auth;
