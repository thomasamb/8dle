import connectionPool from "@/app/lib/connectionPool";
import { getEasternDateKey } from "@/app/lib/easternDateKey";

export async function GET() {
  const todayKey = getEasternDateKey(new Date());

  const result = await connectionPool.query(
    `
    SELECT t.name AS track_name, t.main_image_id
    FROM answers a
    JOIN tracks t ON t.id = a.track_id
    WHERE a.date = $1
    `,
    [todayKey],
  );

  if (result.rows.length === 0) {
    return new Response("No track scheduled for today", { status: 404 });
  }

  const row = result.rows[0];

  return Response.json({
    trackName: row.track_name,
    mainImageId: row.main_image_id,
  });
}
