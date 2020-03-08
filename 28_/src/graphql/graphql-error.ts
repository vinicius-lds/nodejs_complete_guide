export default class GraphQLError extends Error {
  errors: string[] = [];
  errorMessage: string = '';
  errorCode: Number = 500;
  constructor(opts: any) {
    super();
    this.errorCode = opts.errorCode;
    this.errorMessage = opts.errorMessage;
    this.errors = opts.errors;
  }
}
