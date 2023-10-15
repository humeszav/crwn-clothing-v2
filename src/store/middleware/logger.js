
/**
 * more accurate than redux-logger
 * logs next state after action is dispatched
 */
export const loggerMiddleware = (store) => (next) => (action) => {
  
  if (!action.type) {
    console.error("action type is not defined in logger middleware", action);
    return next(action);
  }

  console.log('type', action.type);
  console.log('payload', action.payload);
  console.log('currentState', store.getState());

  next(action);

  console.log('nextState', store.getState());

};