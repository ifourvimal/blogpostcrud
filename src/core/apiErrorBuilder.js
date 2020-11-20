const ErrorBuilder = require('./errorBuilder');

class APIErrorBuilder extends ErrorBuilder {
  constructor(httpStatusCode) {
    super();
    this.httpStatusCode = httpStatusCode;
    return this;
  }

  static errorResponseHandler(error, res) {
    const httpCode = error && error.httpStatusCode ? error.httpStatusCode : 500;
    const msg = error && error.message ? error.message : 'INTERNAL_SERVER_ERROR';
    const type = error && error.code ? error.code : 500;
    res.status(httpCode).send({
      errors: [
        {
          msg,
          type,
          param: 'GLOBAL_ERROR',
        }],
    });
  }

  static articleNotFound() {
    return new APIErrorBuilder(404)
      .setCode('E_NOT_FOUND')
      .setMessage('article wasn\'t found');
  }

  static commentNotFound() {
    return new APIErrorBuilder(404)
      .setCode('E_NOT_FOUND')
      .setMessage('comment wasn\'t found');
  }

  static invalidCredencial() {
    return new APIErrorBuilder(401)
      .setCode('E_NOT_VALID')
      .setMessage('Username or password is invalid.');
  }

  static emailSendingFail() {
    return new APIErrorBuilder(401)
      .setCode('E_NOT_VALID')
      .setMessage('Failed to send email.');
  }
}

module.exports = APIErrorBuilder;