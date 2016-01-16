'use strict';

const Muckraker = require('../');
const Database = require('../lib/database');
const Mock = require('./mock');
const Path = require('path');

const lab = exports.lab = require('lab').script();
const expect = require('code').expect;
const it = lab.test;
const describe = lab.experiment;

const internals = {
  connection: {
    host: 'localhost'
  }
};

describe('constructor', () => {

  it('can create an instance of Muckraker', (done) => {

    const mr = new Muckraker({
      connection: internals.connection
    });

    expect(mr).to.exist();
    expect(mr).to.be.an.instanceof(Muckraker);
    done();
  });

  it('can create an instance of Muckraker while specifying a different scriptDir', (done) => {

    const mr = new Muckraker({
      connection: internals.connection,
      scriptDir: Path.join(__dirname, 'db')
    });

    expect(mr).to.exist();
    expect(mr).to.be.an.instanceof(Muckraker);
    done();
  });
});

describe('connect', () => {

  it('can connect and return an instance of Database', (done) => {

    const mr = new Muckraker({
      connection: internals.connection,
      scriptDir: Path.join(__dirname, 'db')
    });

    mr.db = new Mock();
    mr.connect().then((db) => {

      expect(db).to.exist();
      expect(db).to.be.an.instanceof(Database);
      done();
    }).catch(done);
  });
});

describe('query', () => {

  it('can send a raw query', (done) => {

    const mr = new Muckraker({
      connection: internals.connection
    });

    mr.db = new Mock();
    mr.connect().then((db) => {

      expect(db).to.exist();
      expect(db).to.be.an.instanceof(Database);
      return db;
    }).then((db) => {

      return db.query('select * from "users"');
    }).then((users) => {

      expect(users).to.be.an.array();
      expect(users.length).to.equal(1);
      done();
    }).catch(done);
  });
});

describe('find', () => {

  it('can find rows in a table', (done) => {

    const mr = new Muckraker({
      connection: internals.connection
    });

    mr.db = new Mock();
    mr.connect().then((db) => {

      expect(db).to.exist();
      expect(db).to.be.an.instanceof(Database);
      return db;
    }).then((db) => {

      return db.users.find();
    }).then((users) => {

      expect(users).to.be.an.array();
      expect(users.length).to.equal(1);
      done();
    }).catch(done);
  });

  it('can find rows in a table with a condition', (done) => {

    const mr = new Muckraker({
      connection: internals.connection
    });

    mr.db = new Mock();
    mr.connect().then((db) => {

      expect(db).to.exist();
      expect(db).to.be.an.instanceof(Database);
      return db;
    }).then((db) => {

      return db.users.find({ id: 0 });
    }).then((users) => {

      expect(users).to.be.an.array();
      expect(users.length).to.equal(1);
      done();
    }).catch(done);
  });
});

describe('findOne', () => {

  it('can find a single row', (done) => {

    const mr = new Muckraker({
      connection: internals.connection
    });

    mr.db = new Mock();
    mr.connect().then((db) => {

      expect(db).to.exist();
      expect(db).to.be.an.instanceof(Database);
      return db;
    }).then((db) => {

      return db.users.findOne();
    }).then((user) => {

      expect(user).to.be.an.object();
      expect(user).to.contain(['id', 'user_name']);
      done();
    }).catch(done);
  });

  it('can find a single row with a condition', (done) => {

    const mr = new Muckraker({
      connection: internals.connection
    });

    mr.db = new Mock();
    mr.connect().then((db) => {

      expect(db).to.exist();
      expect(db).to.be.an.instanceof(Database);
      return db;
    }).then((db) => {

      return db.users.findOne({ id: 0 });
    }).then((user) => {

      expect(user).to.be.an.object();
      expect(user).to.contain(['id', 'user_name']);
      done();
    }).catch(done);
  });
});

describe('insert', () => {

  it('can insert a row', (done) => {

    const mr = new Muckraker({
      connection: internals.connection
    });

    mr.db = new Mock();
    mr.connect().then((db) => {

      expect(db).to.exist();
      expect(db).to.be.an.instanceof(Database);
      return db;
    }).then((db) => {

      return db.users.insert({ id: 0, user_name: 'test' });
    }).then((user) => {

      expect(user).to.be.an.object();
      expect(user).to.contain(['id', 'user_name']);
      done();
    }).catch(done);
  });
});

describe('destroy', () => {

  it('can delete a row', (done) => {

    const mr = new Muckraker({
      connection: internals.connection
    });

    mr.db = new Mock();
    mr.connect().then((db) => {

      expect(db).to.exist();
      expect(db).to.be.an.instanceof(Database);
      return db;
    }).then((db) => {

      return db.users.destroy();
    }).then(() => {

      done();
    }).catch(done);
  });

  it('can delete a row with a condition', (done) => {

    const mr = new Muckraker({
      connection: internals.connection
    });

    mr.db = new Mock();
    mr.connect().then((db) => {

      expect(db).to.exist();
      expect(db).to.be.an.instanceof(Database);
      return db;
    }).then((db) => {

      return db.users.destroy({ id: 0 });
    }).then(() => {

      done();
    }).catch(done);
  });
});

describe('update', () => {

  it('can update a row', (done) => {

    const mr = new Muckraker({
      connection: internals.connection
    });

    mr.db = new Mock();
    mr.connect().then((db) => {

      expect(db).to.exist();
      expect(db).to.be.an.instanceof(Database);
      return db;
    }).then((db) => {

      return db.users.update({ id: 0 }, { user_name: 'test_user' });
    }).then((users) => {

      expect(users).to.be.an.array();
      expect(users.length).to.equal(1);
      done();
    }).catch(done);
  });
});

describe('updateOne', () => {

  it('can update a row', (done) => {

    const mr = new Muckraker({
      connection: internals.connection
    });

    mr.db = new Mock();
    mr.connect().then((db) => {

      expect(db).to.exist();
      expect(db).to.be.an.instanceof(Database);
      return db;
    }).then((db) => {

      return db.users.updateOne({ id: 0 }, { user_name: 'test_user' });
    }).then((user) => {

      expect(user).to.be.an.object();
      expect(user).to.contain(['id', 'user_name']);
      done();
    }).catch(done);
  });
});

describe('scripts', () => {

  it('can run a script', (done) => {

    const mr = new Muckraker({
      connection: internals.connection,
      scriptDir: Path.join(__dirname, 'db')
    });

    mr.db = new Mock();
    mr.connect().then((db) => {

      expect(db).to.exist();
      expect(db).to.be.an.instanceof(Database);
      return db;
    }).then((db) => {

      return db.another_thing();
    }).then((users) => {

      expect(users).to.be.an.array();
      expect(users.length).to.equal(1);
      done();
    }).catch(done);
  });

  it('can run a namespaced script', (done) => {

    const mr = new Muckraker({
      connection: internals.connection,
      scriptDir: Path.join(__dirname, 'db')
    });

    mr.db = new Mock();
    mr.connect().then((db) => {

      expect(db).to.exist();
      expect(db).to.be.an.instanceof(Database);
      return db;
    }).then((db) => {

      return db.users.random();
    }).then((users) => {

      expect(users).to.be.an.array();
      expect(users.length).to.equal(1);
      done();
    }).catch(done);
  });
});

describe('routines', () => {

  it('can run a routine', (done) => {

    const mr = new Muckraker({
      connection: internals.connection,
      scriptDir: Path.join(__dirname, 'db')
    });

    mr.db = new Mock();
    mr.connect().then((db) => {

      expect(db).to.exist();
      expect(db).to.be.an.instanceof(Database);
      return db;
    }).then((db) => {

      return db.users.self();
    }).then((users) => {

      expect(users).to.be.an.array();
      expect(users.length).to.equal(1);
      done();
    }).catch(done);
  });
});