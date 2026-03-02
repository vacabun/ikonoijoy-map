"use client";

const PINK   = "#FF4081"; // =LOVE
const GREEN  = "#00C853"; // ≠ME
const YELLOW = "#FFD600"; // ≒JOY

function googleMapsUrl(place: any): string {
  if (place.mapsUrl) return place.mapsUrl;
  if (place.googlePlaceId) {
    return `https://www.google.com/maps/place/?q=place_id:${place.googlePlaceId}`;
  }
  if (place.name) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${place.position?.lat},${place.position?.lng}`;
}

export default function Sidebar({ place, onClose }: any) {
  if (!place) return null;

  return (
    <div
      style={{
        width: "380px",
        flexShrink: 0,
        height: "100vh",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter','PingFang SC','Microsoft YaHei',sans-serif",
        borderLeft: "1px solid #f0f0f0",
      }}
    >
      {/* 三色条 */}
      <div style={{ display: "flex", height: 4, flexShrink: 0 }}>
        <div style={{ flex: 1, background: PINK }} />
        <div style={{ flex: 1, background: GREEN }} />
        <div style={{ flex: 1, background: YELLOW }} />
      </div>

      {/* 头部 */}
      <div
        style={{
          background: PINK,
          padding: "24px 24px 20px",
          color: "#fff",
          position: "relative",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: "rgba(255,255,255,0.2)",
            border: "none",
            borderRadius: 6,
            width: 28,
            height: 28,
            cursor: "pointer",
            color: "#fff",
            fontSize: 13,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </button>

        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.7)",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          {place.position?.lat?.toFixed(4)}&nbsp;·&nbsp;{place.position?.lng?.toFixed(4)}
        </div>

        <h2 style={{ margin: "0 0 12px", fontSize: 21, fontWeight: 800, lineHeight: 1.3 }}>
          {place.name ?? place.id}
        </h2>

        {place.tags && (
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {place.tags.map((tag: string, i: number) => (
              <span
                key={i}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  color: "#fff",
                  borderRadius: 4,
                  padding: "2px 8px",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 操作按钮 */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "12px 24px",
          borderBottom: "1px solid #f0f0f0",
          flexShrink: 0,
        }}
      >
        <ActionButton
          onClick={() => window.open(googleMapsUrl(place), "_blank")}
          icon="🗺"
        >
          Google Maps
        </ActionButton>
        <ActionButton
          onClick={() => {
            const url = googleMapsUrl(place);
            if (navigator.share) {
              navigator.share({ title: place.name ?? place.id, url });
            } else {
              navigator.clipboard.writeText(url);
            }
          }}
          icon="↗"
        >
          分享
        </ActionButton>
      </div>

      {/* 内容 */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
        {place.description && (
          <div style={{ marginBottom: 28 }}>
            <SectionTitle color={GREEN}>概要</SectionTitle>
            <p style={{ margin: 0, color: "#555", fontSize: 14, lineHeight: 1.8 }}>
              {place.description}
            </p>
          </div>
        )}

        {(place.scenes ?? []).length > 0 && (
          <div>
            <SectionTitle color={YELLOW}>シーン</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {(place.scenes ?? []).map((s: any, i: number) => (
                <div
                  key={i}
                  style={{
                    padding: "13px 16px",
                    borderRadius: 8,
                    background: "#fafafa",
                    borderLeft: `3px solid ${[PINK, GREEN, YELLOW][i % 3]}`,
                    marginBottom: 2,
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e", marginBottom: 3 }}>
                    {s.title}
                  </div>
                  {s.description && (
                    <div style={{ fontSize: 13, color: "#888" }}>{s.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ActionButton({ children, onClick, icon }: { children: React.ReactNode; onClick: () => void; icon: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        padding: "8px 0",
        background: "#f7f7f7",
        border: "1px solid #eee",
        borderRadius: 8,
        cursor: "pointer",
        fontSize: 12,
        fontWeight: 600,
        color: "#444",
      }}
    >
      <span>{icon}</span>
      {children}
    </button>
  );
}

function SectionTitle({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div
      style={{
        fontSize: 10,
        fontWeight: 700,
        color,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        marginBottom: 12,
        borderLeft: `3px solid ${color}`,
        paddingLeft: 8,
      }}
    >
      {children}
    </div>
  );
}
