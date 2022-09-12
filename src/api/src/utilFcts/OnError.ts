export default function onError(response:Response, message:string) {
  if (!response.ok) {
    console.log(Error(message));
    throw new Error(message);
  }
}
