const mongodb = require("mongodb");
const getDb = require("../util/database");

const objectId = mongodb.ObjectId;

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    db.collection("user").insertOne(this);
  }

  static findById(userId) {
    const db = getDb();
    return db.collection("user").findOne({ _id: new objectId(userId) }).then((user => {
      console.log(user);
    })).catch((err) => {
      console.log(err);
    });
  }
}

module.exports = User;
