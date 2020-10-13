const db = {};

class Repository {
  constructor(entity) {
    this.entity = entity;
    if (entity.name in db === false) {
      db[entity.name] = [];
    }
  }

  findOne(criteria) {
    const result = db[name].find((item) => {
      return Object.entries(criteria)
        .map(([key, value]) => item[key] === value)
        .reduce((a, b) => a && b, true);
    });
    return Promise.resolve(result ? new this.entity(result) : null);
  }

  find(criteria) {
    return Promise.resolve(
      db[name].filter((item) => {
        return Object.entries(criteria)
          .map(([key, value]) => item[key] === value)
          .reduce((a, b) => a && b, true);
      })
    ).map((item) => new this.entity(item));
  }

  save(entity) {
    const idx = db.findIndex(
      (item) => item[entity.primaryKey] === entity[entity.primaryKey]
    );
    if (idx > -1) {
      db[entity.constructor.name][idx] = entity.toJS();
    } else {
      db[entity.constructor.name].push(entity.toJS());
    }
  }
}

class Database {
  getRepository(entity) {
    return Promise.resolve(new Repository(entity));
  }
}

module.exports = new Database();
