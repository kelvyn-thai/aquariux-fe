import { HttpStatusCode } from "axios";
import CryptoJS from "crypto-js";
import type { NextApiRequest, NextApiResponse } from "next";

const secretKey = process.env.CRYPTO_JS_SECRET_KEY!;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(HttpStatusCode.MethodNotAllowed).json({ message: "Method not allowed" });
  }

  const { value } = req.body;

  if (!value || typeof value !== "string") {
    return res.status(HttpStatusCode.BadRequest).json({ message: "Invalid payload" });
  }

  const encrypted = CryptoJS.AES.encrypt(value, secretKey).toString();

  return res.status(HttpStatusCode.Ok).json({ encrypted });
}
