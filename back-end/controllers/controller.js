import QuestionModel from "../model/questionSchama.js";


// get all questions
export async function getQuestions(req,res) {
  try {
     const q = await QuestionModel.find();
     res.json(q)
  } catch (error) {
    res.json({error})
  }
}

// insert all  questions 
export async function insertQuestions(req,res) {
    try {
        const questionsData = req.body.questions; // expects an array of question objects in the request body
    
        const insertedQuestions = await QuestionModel.insertMany(
          questionsData.map(q => ({
            question: q.question,
            options: q.options,
            correct: q.correct,
          }))
        );
    
        res.json(insertedQuestions);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

// Delete All questions 
export async function deleteQuestions(req,res) {
    try {
        await QuestionModel.deleteMany({});
        res.json({ message: "All questions deleted successfully." });
      } catch (error) {
        res.status(500).json({ error: error.message });
      } 
}