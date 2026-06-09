import { Answer } from "./answer";
import { answerSet } from "./answerSet";
import getTodayDate from "./dateHelper";

export default function getAnswer(): Answer {
  const answerMap = getAnswerMap();
  const today = getTodayDate();
  const idx = answerMap.get(today);

  if (idx === undefined) {
    throw new Error(`No answer found for date ${today}`);
  }

  return answerSet[idx];
}

export function getAnswerMap(): Map<string, number> {
  const crypto = require("crypto");
  const encrypted = process.env.ENCRYPTED_ANSWER_MAP!;
  const key = process.env.ANSWER_MAP_KEY!;

  const [ivHex, encryptedData] = encrypted.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return new Map(Object.entries(JSON.parse(decrypted)));
}
