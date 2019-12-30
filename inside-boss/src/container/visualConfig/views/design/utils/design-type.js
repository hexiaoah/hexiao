import isString from 'lodash/isString';

export function isExpectedDesginType(component, expected) {
  const { type } = component;
  if( typeof type === 'string'){
    return expected === type
  }
}

export function serializeDesignType(designType) {
  if (typeof designType === 'string') {
    return designType;
  }
  // if (isArray(designType)) {
  //   return designType.join(' | ');
  // }

  throw new TypeError('designType should be a string or an array of strings');
}

