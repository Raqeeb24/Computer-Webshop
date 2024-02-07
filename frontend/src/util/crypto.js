import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.REACT_APP_CRYPTO;

export const encryptCookie = (value) => {
  return CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
};

export const decryptCookie = (encryptedValue) => {
  const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
