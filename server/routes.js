import express from "express";
import Email from "./db/collections/email";
import Answer from "./db/collections/answer";
import Question from "./db/collections/question";
import { ObjectID } from "mongodb";
const router = express.Router();
router.get("cats", (req, res) => {
  res.send({
    cats: [{ name: "lilly" }, { name: "lucy" }],
  });
});
router.post("/check-email", function (req, res) {
  const { email } = req.body;
  Email.find({ email })
    .then((result) => {
      if (result.length > 0) {
        res
          .status(201)
          .send({
            ...result[0],
            success: true,
            exist: true,
            reason: "Email already exist",
          });
        return;
      }
      Email.creatAccount({ email }).then((r) => {
        const result = r.ops[0];
        res.status(200).send({ ...result, success: true, exist: false });
      });
    })
    .catch((e) => console.log("Error: check email error", e));
});
router.get("/get-all-questions", function (req, res) {
  Question.getAllQuestions()
    .then((result) => {
      res.send({
        questions: result.map((q) => {
          return { question: q.question, options: q.options };
        }),
      });
    })
    .catch((e) => console.log("Error: get questions error", e));
});
router.post("/create-table", function (req, res) {
    const {userid} =  req.body;
    Answer.createNew(userid)
      .then((result) => {
        res.send({
          success: true,
          result
        });
      })
      .catch((e) => console.log("Error: get questions error", e));
  });
  router.post("/score", function (req, res) {
    const { tableid} = req.body;

    Answer.find({_id:new ObjectID(tableid) }).then(data => {

        if(data.length > 0){
            const result = data[0].answers;
            let score = 0;
            for( let i = 0;  i < result.length; i ++){
                
                Object.entries(result[i]).forEach(([key, value]) => {
                    // do something with key and val
                    if(value){
                        score += 100;
                    }
                });
            }
            return res.send({
                success: true,
                score
              });
        }
    })
  });
  
router.post("/check-question", function (req, res) {
  const { tableid, email, question, answer } = req.body;
  console.log(req.body);
  Question.find({ question })
    .then((result) => {
      if (result.length > 0) {
        const rightAnswer = result[0].answer;
        if (rightAnswer.value === answer) {
          //todo: add score to the player
          Answer.updateQuestion(tableid, question,  true);
          return res.status(200).send({ success: true, correct: true });
        }
        Answer.updateQuestion(tableid, question,  false);
        return res.status(200).send({ success: true, correct: false });
      }

      return res
        .status(401)
        .send({ success: false, content: "Unable to find the question" });
    })
    .catch((e) => console.log("Error: get questions error", e));
});

module.exports = router;
