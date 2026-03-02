"use client";

// =LOVE · ≠ME · ≒JOY brand colors
const PINK   = "#FF4081"; // =LOVE
const GREEN  = "#00C853"; // ≠ME
const YELLOW = "#FFD600"; // ≒JOY

export default function LeftSidebar({ places, selectedPlace, onSelectPlace }: any) {
  return (
    <div
      style={{
        width: 260,
        flexShrink: 0,
        height: "100vh",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter','PingFang SC','Microsoft YaHei',sans-serif",
        borderRight: "1px solid #f0f0f0",
      }}
    >
      {/* 品牌区 */}
      <div style={{ flexShrink: 0 }}>
        {/* 三色条 */}
        <div style={{ display: "flex", height: 4 }}>
          <div style={{ flex: 1, background: PINK }} />
          <div style={{ flex: 1, background: GREEN }} />
          <div style={{ flex: 1, background: YELLOW }} />
        </div>

        <div style={{ padding: "20px 20px 16px" }}>
          {/* 三グループ名 */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: PINK, letterSpacing: "-0.01em" }}>=LOVE</span>
            <span style={{ fontSize: 11, color: "#ccc" }}>·</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: GREEN, letterSpacing: "-0.01em" }}>≠ME</span>
            <span style={{ fontSize: 11, color: "#ccc" }}>·</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: YELLOW, letterSpacing: "-0.01em" }}>≒JOY</span>
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#1a1a2e", letterSpacing: "0.04em" }}>
            IKONOIJOY<span style={{ color: PINK }}>.</span>MAP
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: "#aaa", lineHeight: 1.6 }}>
            イコノイジョイの聖地巡礼マップ
          </div>
        </div>
        <div style={{ height: 1, background: "#f5f5f5" }} />
      </div>

      {/* 地点目录 */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 12px" }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "#bbb",
            textTransform: "uppercase",
            padding: "0 8px",
            marginBottom: 8,
          }}
        >
          聖地一覧
        </div>

        {places.length === 0 && (
          <div style={{ fontSize: 13, color: "#ccc", padding: "8px" }}>読み込み中...</div>
        )}

        {places.map((place: any) => {
          const isActive = selectedPlace?.id === place.id;
          return (
            <button
              key={place.id}
              onClick={() => onSelectPlace(place)}
              style={{
                width: "100%",
                textAlign: "left",
                background: isActive ? "#fff0f4" : "transparent",
                border: "none",
                borderRadius: 8,
                padding: "10px 12px",
                cursor: "pointer",
                marginBottom: 2,
                borderLeft: `3px solid ${isActive ? PINK : "transparent"}`,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: isActive ? "#1a1a2e" : "#666",
                  marginBottom: 4,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {place.name ?? place.id}
              </div>
              {place.tags && (
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {place.tags.slice(0, 3).map((tag: string, i: number) => (
                    <span
                      key={i}
                      style={{
                        fontSize: 10,
                        color: isActive ? PINK : "#bbb",
                        background: isActive ? "#ffe0e9" : "#f5f5f5",
                        borderRadius: 3,
                        padding: "1px 6px",
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* 底部 */}
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid #f5f5f5",
          fontSize: 11,
          color: "#ccc",
          flexShrink: 0,
        }}
      >
        © 2025 IKONOIJOY
      </div>
    </div>
  );
}
