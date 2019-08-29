import { thunk, action, selector } from "easy-peasy";
import { get } from "lodash";

const dataModel = (endpoint) = ({
  results: [],
  loading: false,
  error: '',
  ids: selector(
    [state => state.data],
    (resolvedState) => {
      const [data] = resolvedState;
      return Object.keys(data)
    }
  ),
  fetched: action((state, items) => {
    if (Array.isArray(items)) {
      state.results = get(items, "results", []);
    } else {
      state.result = items
    }
  }),
  setLoading: action((state, payload) => {
    const loading = get(payload, "loading", false);
    state.loading = loading;
  }),
  setError: action((state, payload) => {
    const message = get(payload, "message", '');
    state.error = message;
  }),
  fetch: thunk(async (actions, payload) => {
    try {
      const data = await endpoint();
      actions.fetched(data);
    } catch (error) {
      action.setError({ message: "Erro ao carregar resultados." });
    }
  })
})

export default dataModel