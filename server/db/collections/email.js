import { ObjectID } from "mongodb";
import { mongo } from "..";

const creatAccount = ({ email }) =>
  mongo.then((db) => db.collection("users").insertOne({ email }));

const find = (...args) =>
  mongo.then((db) =>
    db
      .collection("users")
      .find(...args)
      .toArray()
  );

const updateUser = (doc, addition) =>
  mongo.then((db) =>
    db
      .collection("users")
      .updateOne(doc, {$set: addition})
      .catch((e) => console.log(e))
  );
export default {
  creatAccount,
  find,
  updateUser,
};
