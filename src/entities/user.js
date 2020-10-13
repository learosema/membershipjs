class User {
  constructor({ name, email, passwordHash, role = 'user' }) {
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;
  }

  get primaryKey() {
    return 'name';
  }

  toJS() {
    const { name, email, passwordHash, role } = this;
    return { name, email, passwordHash, role };
  }
}

module.exports = { User };
