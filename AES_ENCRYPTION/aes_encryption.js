import crypto from "crypto"

const key = Buffer.from('xNRxA48aNYd33PXaODSutRNFyCu4cAe/InKT/Rx+bw0=', 'hex');
const iv = Buffer.from('81dFxOpX7BPG1UpZQPcS6w==', 'hex');

export function encrypt_token(data) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  const encryptedData = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
  return encryptedData;
}

export function decrypt_token(data) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  const decripted = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
  return decripted;
}