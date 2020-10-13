const db = {};

class Repository {
  constructor(entity) {
    this.entity = entity;
    if (entity.name in db === false) {
      db[entity.name] = [];
    }
  }

  findOne(criteria) {
    const result = db[this.entity.name].find((item) => {
      return Object.entries(criteria)
        .map(([key, value]) => item[key] === value)
        .reduce((a, b) => a && b, true);
    });
    return Promise.resolve(result ? new this.entity(result) : null);
  }

  find(criteria) {
    return Promise.resolve(
      db[this.entity.name].filter((item) => {
        return Object.entries(criteria)
          .map(([key, value]) => item[key] === value)
          .reduce((a, b) => a && b, true);
      })
    ).map((item) => new this.entity(item));
  }

  save(newItem) {
    const idx = db[this.entity.name].findIndex(
      (item) => item[newItem.primaryKey] === newItem[newItem.primaryKey]
    );
    if (idx > -1) {
      db[this.entity.name][idx] = newItem.toJS();
    } else {
      db[this.entity.name].push(newItem.toJS());
    }
  }
}

class Database {
  getRepository(entity) {
    return new Repository(entity);
  }
}

module.exports = new Database();
