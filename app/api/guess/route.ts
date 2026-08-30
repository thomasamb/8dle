import connectionPool from "@/app/lib/connectionPool";
import { getEasternDateKey } from "@/app/lib/easternDateKey";

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export async function POST(request: Request) {
  const { guess } = await request.json();
  const todayKey = getEasternDateKey(new Date());

  const result = await connectionPool.query(
    `
    SELECT t.name AS track_name
    FROM answers a
    JOIN tracks t ON t.id = a.track_id
    WHERE a.date = $1
    `,
    [todayKey],
  );

  if (result.rows.length === 0) {
    return new Response("No track scheduled for today", { status: 404 });
  }

  const actualName = result.rows[0].track_name;
  const correct = normalize(guess) === normalize(actualName);

  return Response.json({ correct });
}
