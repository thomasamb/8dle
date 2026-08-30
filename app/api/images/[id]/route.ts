import connectionPool from "@/app/lib/connectionPool";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const result = await connectionPool.query(
      `SELECT data FROM images WHERE id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(result.rows[0].data, {
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
