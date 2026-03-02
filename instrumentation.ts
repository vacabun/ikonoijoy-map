export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { initPlaces } = await import("./lib/initPlaces");
    await initPlaces();
  }
}
