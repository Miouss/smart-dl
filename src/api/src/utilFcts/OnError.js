export default function onError(response, message) {
  if (!response.ok) {
    throw new Error(message);
  }
}
