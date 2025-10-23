import { v4 as uuidv4 } from "uuid";
import { cryptoRandomBits, cryptoRandomDigits } from "../utils/cryptoRandom.js";

export const RANDOM_TYPES = {
  "BIT_20": () => cryptoRandomBits(20),
  "BIT_32": () => cryptoRandomBits(32),
  "DIGITS_6": () => cryptoRandomDigits(6),
  "DIGITS_9": () => cryptoRandomDigits(9),
  "GUID": () => uuidv4(),
};

export const DATE_FORMAT_TYPES = {
  "YYYY": date => date.format("YYYY"),
  "YYYYMMDD": date => date.format("YYYYMMDD"),
  "YYYYMMDDHHmmss": date => date.format("YYYYMMDDHHmmss"),
  "YYYY_MM_DD": date => date.format("YYYY_MM_DD"),
  "DDMMYYYY": date => date.format("DDMMYYYY")
}