"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = void 0;
const validateParams = (targetObject, validatorObject) => {
    if (typeof targetObject !== typeof validatorObject)
        return false;
    if (typeof targetObject === 'object') {
        let validObject = true;
        if (Array.isArray(targetObject)) {
            for (let subObject of targetObject) {
                validObject = validObject && (0, exports.validateParams)(subObject, validatorObject[0]);
            }
        }
        else {
            for (let key of Object.keys(validatorObject)) {
                if (typeof targetObject[key] === 'object')
                    validObject = validObject && (0, exports.validateParams)(targetObject[key], validatorObject[key]);
                if (typeof targetObject[key] !== typeof validatorObject[key])
                    validObject = false;
            }
        }
        return validObject;
    }
    return true;
};
exports.validateParams = validateParams;
