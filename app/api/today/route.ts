import { getAnswerMap } from "../../lib/getAnswer";
import { answerSet } from "../../lib/answerSet";
import getTodayDate from "../../lib/dateHelper";

export async function GET() {
  const map = getAnswerMap();
  const today = getTodayDate();
  const index = map.get(today);
  if (index === undefined) {
    return Response.json({ error: "No answer for today" }, { status: 404 });
  }
  return Response.json({ answer: answerSet[index] });
}
