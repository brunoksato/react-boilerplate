import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, createTypedHooks } from "easy-peasy";
import model from "./models";
import productService from './services/home'

const { useStoreActions, useStoreState, useStoreDispatch } = createTypedHooks();

export {
  useStoreActions as useActions,
  useStoreDispatch as useDispatch,
  useStoreState as useStore
};

const store = createStore(model, {
  compose: composeWithDevTools({ realtime: true, trace: true }),
  injections: {
    productService,
  }
});

export default store;
