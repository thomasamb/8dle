import connectionPool from "@/app/lib/connectionPool";
import { getEasternDateKey } from "@/app/lib/easternDateKey";

const ROUND_CLUE_COLUMN: Record<number, { column: string; name?: string }> = {
  1: { column: "map_image_id" },
  2: { column: "console_image_id", name: "console_name" },
  3: { column: "cup_image_id", name: "cup_name" },
  4: { column: "song_id" },
  5: { column: "screenshot_image_id" },
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ round: string }> },
) {
  const { round: roundParam } = await params;
  const round = Number(roundParam);

  if (!Number.isInteger(round) || round < 1 || round > 5) {
    return new Response("Invalid round", { status: 400 });
  }

  const config = ROUND_CLUE_COLUMN[round];
  const todayKey = getEasternDateKey(new Date());

  const result = await connectionPool.query(
    `
    SELECT
      t.map_image_id,
      t.screenshot_image_id,
      t.song_id,
      c.image_id AS cup_image_id,
      c.name AS cup_name,
      co.image_id AS console_image_id,
      co.name AS console_name
    FROM answers a
    JOIN tracks t ON t.id = a.track_id
    JOIN cups c ON c.id = t.cup_id
    JOIN consoles co ON co.id = t.console_id
    WHERE a.date = $1
    `,
    [todayKey],
  );

  if (result.rows.length === 0) {
    return new Response("No track scheduled for today", { status: 404 });
  }

  const row = result.rows[0];

  return Response.json({
    round,
    clueType: config.column,
    value: row[config.column],
    name: config.name ? row[config.name] : null,
  });
}
