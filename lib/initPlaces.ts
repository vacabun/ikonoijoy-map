import db from "./db";

const seedPlaces = [
  {
    id: "yoyogi-animation",
    name: "代々木アニメーション学院",
    description:
      "1978年に創立された日本最大級のアニメ・声優・マンガの専門学校。アニメーター、声優、キャラクターデザイナーなど多彩なクリエイターを輩出してきた。",
    tags: ["アニメ", "専門学校", "声優"],
    lat: 35.6833,
    lng: 139.6953,
    google_maps_url: "https://maps.app.goo.gl/ihaPK7HUmBNuBeo59",
    scenes: [
      { title: "アニメーション科", description: "プロのアニメーターを目指すコース" },
      { title: "声優科", description: "演技・ボイスパフォーマンスを徹底指導" },
      { title: "マンガ・イラスト科", description: "キャラクター創造の技術を磨く" },
    ],
  },
];

export async function initPlaces() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS places (
      id               VARCHAR(64) PRIMARY KEY,
      name             VARCHAR(256) NOT NULL,
      description      TEXT,
      tags             JSONB NOT NULL DEFAULT '[]',
      lat              DOUBLE PRECISION,
      lng              DOUBLE PRECISION,
      scenes           JSONB NOT NULL DEFAULT '[]',
      google_maps_url  TEXT
    )
  `);
  // 兼容旧表：按需添加/重命名列
  await db.query(`
    ALTER TABLE places ADD COLUMN IF NOT EXISTS google_maps_url TEXT
  `);
  await db.query(`
    ALTER TABLE places ALTER COLUMN lat DROP NOT NULL
  `).catch(() => {});
  await db.query(`
    ALTER TABLE places ALTER COLUMN lng DROP NOT NULL
  `).catch(() => {});

  for (const place of seedPlaces) {
    const { rowCount } = await db.query(
      "SELECT 1 FROM places WHERE id = $1",
      [place.id]
    );
    if (rowCount === 0) {
      await db.query(
        `INSERT INTO places (id, name, description, tags, lat, lng, scenes, google_maps_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          place.id,
          place.name,
          place.description,
          JSON.stringify(place.tags),
          place.lat,
          place.lng,
          JSON.stringify(place.scenes),
          place.google_maps_url,
        ]
      );
      console.log(`[initPlaces] inserted: ${place.id}`);
    }
  }
}
