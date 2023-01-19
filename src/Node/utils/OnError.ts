export default function onError(response: Response, message: string) {
  if (!response.ok) {
    throw new Error(message);
  }
}