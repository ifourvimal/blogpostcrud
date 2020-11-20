class BaseModel {
  static fromEntries(list, ...params) {
    return Promise.all(
      (list || []).map(i => this.fromEntry(i, ...params)),
    );
  }
}

module.exports = BaseModel;
