import { thunk, action } from "easy-peasy";
import { get } from "lodash";

const home = {
  isLoading: false,
  error: "",
  setLoading: action((state, payload) => {
    const loading = get(payload, "loading", false);
    state.isLoading = loading;
  }),
  setError: action((state, payload) => {
    const message = get(payload, "message", false);
    state.error = message;
  })
};

export default home;
