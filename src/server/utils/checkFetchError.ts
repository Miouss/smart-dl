export default function checkFetchError(responseStatus: boolean, errorMessage: string) {
  if (!responseStatus) throw new Error(errorMessage);
}