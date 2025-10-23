import crypto from 'crypto';

export function cryptoRandomBits(bits) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  const max = Math.pow(2, bits);
  return array[0] % max;
}

export function cryptoRandomDigits(digits) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return min + (array[0] % (max - min + 1));
}