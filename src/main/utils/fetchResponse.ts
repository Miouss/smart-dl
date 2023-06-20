import fetch from "cross-fetch";

export async function fetchResponse(
  type: "json" | "text",
  url: RequestInfo,
  options?: RequestInit,
  errMsg = "fetch failed"
) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(errMsg);

  if (type === "json") return await response.json();
  if (type === "text") return await response.text();
}
