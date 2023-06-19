export function createOptions(method: string, header: HeadersInit, body: any) {
  return {
    method,
    headers: header,
    body: JSON.stringify(body),
  };
}
