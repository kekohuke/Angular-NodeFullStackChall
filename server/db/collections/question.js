import { ObjectID } from "mongodb";
import { mongo } from "..";

const getAllQuestions = () =>
  mongo.then((db) => db.collection("questions").find().toArray());

const find = (...args) => 
    mongo.then(db =>db.collection('questions').find(...args).toArray());
export default {
    getAllQuestions,
    find
}