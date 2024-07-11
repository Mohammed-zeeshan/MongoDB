const mongodb = require("mongodb");
const getDb = require("../util/database");

const objectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    db.collection("user").insertOne(this);
  }

  addToCart(product) {
    // const cartProducts = this.cart.items.findIndex((cp) => {
    //   return cp._id === product._id;
    // });
    const updatedCart = { items: [{ ...product, quantity: 1 }] };
    const db = getDb;
    db.collection("user").updateOne(
      { _id: new objectId(this._id) },
      { $set: { cart: updatedCart } }
    );
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("user")
      .findOne({ _id: new objectId(userId) })
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
