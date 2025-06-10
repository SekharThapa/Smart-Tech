import crypto from "crypto";

export const generateEsewaSignature = (fields, secretKey) => {
  const signedFields = Object.keys(fields).join(",");
  const concatenated = Object.entries(fields)
    .map(([key, val]) => `${key}=${val}`)
    .join(",");

  const hmac = crypto.createHmac("sha256", secretKey);
  hmac.update(concatenated);

  const signature = hmac.digest("base64");
  return { signature, signedFields };
};
