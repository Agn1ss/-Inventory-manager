/**
 * Creates an object containing only those fields that satisfy this condition.
 * @param {Array} fields - array of arrays of the form [ key, value, condition ]
 * @returns {Object} object with filtered fields
 */

export default function filterKeysByCondition(fieldArray) {
  return fieldArray.reduce((acc, [key, value, condition]) => {
    if (typeof condition === "function" ? condition(value) : condition) {
      acc[key] = value;
    }
    return acc;
  }, {});
}
