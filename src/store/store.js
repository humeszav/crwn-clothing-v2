
// TODO: check how to use configureStore from redux-toolkit
import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

// root reducer
import { rootReducer } from "./root-reducer";

const middleWares = [logger];

const composedEnahncer = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnahncer);


