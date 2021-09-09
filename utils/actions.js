const actionSeparator = '::';
export const createAction = (name, param) => `${name}${actionSeparator}${param}`;
export const getActionName = action => action.split(actionSeparator)[0];
export const getActionParam = action => action.split(actionSeparator)[1];
export const isAction = name => new RegExp(`^${name}${actionSeparator}`);
