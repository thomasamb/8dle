import connectionPool from "@/app/lib/connectionPool";
import { getEasternDateKey } from "@/app/lib/easternDateKey";

export async function GET() {
  const todayKey = getEasternDateKey(new Date());

  const result = await connectionPool.query(
    `SELECT 1 FROM answers WHERE date = $1`,
    [todayKey],
  );

  if (result.rows.length === 0) {
    return new Response("No track scheduled for today", { status: 404 });
  }

  return Response.json({ ready: true });
}
