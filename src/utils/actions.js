const actionSeparator = '::';
export const createAction = (name: string, param: string | Array<string>) => {
    return `${name}${actionSeparator}${Array.isArray(param) ? param.join(actionSeparator) : param}`;
}
export const getActionName = action => action.split(actionSeparator)[0];
export const getActionParams = action => {
    return action.split(actionSeparator).slice(1).map(param => {
        if (param === 'true') return true;
        if (param === 'false') return false;
        if (param === 'undefined') return undefined;
        if (param === 'null') return null;
        return param;
    });
}
export const isAction = (name, action) => {
    const reg = new RegExp(`^${name}${actionSeparator}`);
    return reg.test(action);
}
