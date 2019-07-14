import { isUndefined } from 'util';

export function isVarUndefined(inputVar) {
    if (inputVar === '' || inputVar === undefined || isUndefined(inputVar)===1 || inputVar === null ) {
        return (true);
    } else {
        return (false);
    }
}

export default isVarUndefined;