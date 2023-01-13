import ErrorWithStatusCode from "./ErrorWithStatusCode";

export default function onError(response: Response, message: string, code: number) {
  if (!response.ok) {
    throw new ErrorWithStatusCode(message, code);
  }
}