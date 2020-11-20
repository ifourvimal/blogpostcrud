const Locale = require('./../core/errorMessageLocale');

class ErrorBuilder {
  constructor() {
    this.code = '';
    this.message = '';
    this.params = null;
    return this;
  }

  setCode(code) {
    this.code = code;
    return this;
  }

  setMessage(message) {
    this.message = Locale.appLocalize.translate(message);
    return this;
  }

  setParams(params) {
    this.params = params;
    return this;
  }

  build() {
    const error = {};
    error.code = this.code;
    error.message = this.message;
    if (this.params !== null) {
      error.params = this.params;
    }
    return error;
  }
}

module.exports = ErrorBuilder;
