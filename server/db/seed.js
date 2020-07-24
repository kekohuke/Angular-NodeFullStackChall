/* eslint-disable no-console */
/* eslint-disable no-multi-str */
import { ObjectID } from "mongodb";
import { mongo, close } from "./mongo";
import assert from "assert";
const questionIds = [
  new ObjectID(),
  new ObjectID(),
  new ObjectID(),
  new ObjectID(),
  new ObjectID(),
];
const questions = [
  {
    _id: questionIds[0],
    question: "Which one is not belong to Chinese food?",
    options: [
      { value: "Hotpot" },
      { value: "Sichuan Pork" },
      { value: "Burrito" },
      { value: "Shrimp with Vermicelli and Garlic" },
    ],
    answer:{value: "Burrito"}
  },
  {
    _id: questionIds[1],
    question: "Which one is not belong to Italian food?",
    options: [
      { value: "Ginestrata" },
      { value: "Stracciatella" },
      { value: "Agliata" },
      { value: "Chow Mein" },
    ],
    answer:{value: "Chow Mein"}
  },
  {
    _id: questionIds[2],
    question: "Which one is belong to Japanese food?",
    options: [
        { value: "Mapo tofu" },
        { value: "Yakitori" },
        { value: "Kung Pao Chicken" },
        { value: "Panino" },
      ],
      answer:{value: "Yakitori"}
  },
  {
    _id: questionIds[3],
    question: "Which one is belong to British food?",
    options: [
        { value: "Steak and Kidney Pie" },
        { value: "Maccu" },
        { value: "Sweet and Sour Pork" },
        { value: "Tempura" },
      ],
      answer:{value: "Steak and Kidney Pie"}
  },
  {
    _id: questionIds[4],
    question: "Which one is belong to American food?",
    options: [
        { value: "Spring Roll" },
        { value: "Ramen" },
        { value: "Pesto" },
        { value: "San Francisco sourdough bread" },
      ],
      answer:{value: "San Francisco sourdough bread"}
  },
];
function seedQuestions() {
  return mongo.then((db) =>
    db.collection("questions").insertMany(questions, (err, r) => {
      assert.equal(null, err);
      assert.equal(1, r.insertedCount);
      close();
    })
  );
}
Promise.all([seedQuestions()]).then(() => {
  console.log("finished seeding, closing...");
});
