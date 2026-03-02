import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const { rows } = await db.query(
    "SELECT id, name, description, tags, lat, lng, scenes, google_maps_url FROM places"
  );

  const places = rows.map(r => ({
    id: r.id,
    name: r.name,
    description: r.description,
    tags: r.tags,
    position: { lat: r.lat, lng: r.lng },
    scenes: r.scenes,
    mapsUrl: r.google_maps_url ?? null,
  }));

  return NextResponse.json(places);
}
