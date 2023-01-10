export default class ErrorWithStatusCode extends Error {
  constructor(message: string, public code: number) {
    super(message);
  }
}
