
// TODO: check how to use configureStore from redux-toolkit
import { compose, createStore, applyMiddleware } from "redux";
//import logger from "redux-logger";

// root reducer
import { rootReducer } from "./root-reducer";


const loggerMiddleware = (store) => (next) => (action) => {
  
  if (!action.type) {
    console.error("action type is not defined in logger middleware");
    return next(action);
  }
  next(action);

};

const middleWares = [loggerMiddleware];
//const middleWares = [logger];

const composedEnahncer = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnahncer);


