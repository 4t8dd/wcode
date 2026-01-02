// PRIVACY-HARDENED: Use bundled model definitions without OpenCode provider
// This file is loaded as a macro, so we return the static bundled data
export async function data() {
  // Check for custom models file (for testing/updates)
  const path = Bun.env.MODELS_DEV_API_JSON
  if (path) {
    const file = Bun.file(path)
    if (await file.exists()) {
      return await file.text()
    }
  }

  // REMOVED: External fetch from models.dev disabled for privacy
  // const json = await fetch("https://models.dev/api.json").then((x) => x.text())

  // Use bundled static model definitions (without opencode provider)
  const bundled = await import("./models-bundled.json")
  return JSON.stringify(bundled.default)
}
