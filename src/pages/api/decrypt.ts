import { HttpStatusCode } from "axios";
import CryptoJS from "crypto-js";
import type { NextApiRequest, NextApiResponse } from "next";

const secretKey = process.env.CRYPTO_JS_SECRET_KEY!;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(HttpStatusCode.MethodNotAllowed).json({ message: "Method not allowed" });
  }

  const { cipherText } = req.body;

  if (!cipherText || typeof cipherText !== "string") {
    return res.status(HttpStatusCode.BadRequest).json({ message: "Missing cipherText" });
  }

  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    let parsed;
    try {
      parsed = JSON.parse(decrypted);
    } catch {
      parsed = decrypted;
    }

    return res.status(HttpStatusCode.Ok).json({ decrypted: parsed });
  } catch (err) {
    console.error("Failed to decrypt:", err);
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Failed to decrypt" });
  }
}
