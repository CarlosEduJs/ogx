/**
 * Convert a local file to a base64 Data URI
 * Useful for images and fonts in Node/Bun environments
 * In browser environments, this will throw as Node FS is unavailable.
 */
export async function toDataUri(filePath: string): Promise<string> {
  // If filePath is already a data URI or URL, return it
  if (filePath.startsWith("data:") || filePath.startsWith("http")) {
    return filePath;
  }

  try {
    const { readFile } = await import("node:fs/promises");
    const { extname } = await import("node:path");

    const buffer = await readFile(filePath);
    const ext = extname(filePath).toLowerCase();

    let mimeType = "image/png";
    if (ext === ".svg") mimeType = "image/svg+xml";
    else if (ext === ".jpg" || ext === ".jpeg") mimeType = "image/jpeg";
    else if (ext === ".webp") mimeType = "image/webp";
    else if (ext === ".gif") mimeType = "image/gif";

    return `data:${mimeType};base64,${(buffer as any).toString("base64")}`;
  } catch (err) {
    console.error(
      "OGX: toDataUri is only supported in Node/Bun environments:",
      err,
    );
    throw new Error(
      "OGX: Local asset loading is not supported in the browser.",
    );
  }
}

/**
 * Alias for toDataUri, conceptually loading an asset
 */
export const loadAsset = toDataUri;
