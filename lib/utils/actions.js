const actionSeparator = '::';
export const createAction = (name, param) => {
  return `${name}${actionSeparator}${Array.isArray(param) ? param.join(actionSeparator) : param}`;
};
export const getActionName = action => action.split(actionSeparator)[0];
export const getActionParams = action => {
  return action.split(actionSeparator).slice(1);
};
export const isAction = (name, action) => {
  const reg = new RegExp(`^${name}${actionSeparator}`);
  return reg.test(action);
};