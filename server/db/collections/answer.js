import { ObjectID } from "mongodb";
import { mongo } from "..";

const createNew = (userid) =>
  mongo.then((db) =>
    db.collection("answer").insertOne({ userid, answers: [] }).then(r => r.ops[0])
  );

const updateQuestion = (tableid, question, answer) =>
  mongo.then((db) =>
    db
      .collection("answer")
      .update({ _id:new ObjectID( tableid) }, { $push: { answers: { [question]: answer } } })
  );
const find = (...args) =>
  mongo.then((db) =>
    db
      .collection("answer")
      .find(...args)
      .toArray()
  );
export default {
  createNew,
  updateQuestion,
  find,
};
