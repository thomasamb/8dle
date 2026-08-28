import connectionPool from "@/app/lib/connectionPool";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;

  try {
    const result = await connectionPool.query(
      `SELECT img FROM "ConsoleOrigins" WHERE imgname = $1`,
      [name],
    );
    console.log(result);

    if (result.rows.length === 0) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(result.rows[0].img, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
