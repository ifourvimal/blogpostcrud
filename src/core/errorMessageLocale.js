const Localize = require('localize');

class ErrorMessageLocale {
  static async setLocale(req, res, next) {
    try {
      const locale = req.headers['accept-language'];

      if (locale) {
        if (locale === 'en-US') {
          ErrorMessageLocale.appLocalize.setLocale(locale);
        }
      } else {
        ErrorMessageLocale.appLocalize.setLocale('en-US');
      }

      next();
    } catch (err) {
      res.send(500, err);
    }
  }
}

ErrorMessageLocale.appLocalize = new Localize({
  "Username or password is invalid.": {
    "en-US": "Username or password is invalid.",
  },

  "article wasn't found": {
    "en-US": "article wasn't found",
  },

  "comment wasn't found": {
    "en-US": "comment wasn't found",
  },
});

module.exports = ErrorMessageLocale;
