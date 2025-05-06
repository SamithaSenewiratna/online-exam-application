import{Router} from "express";
const router = Router();

// import controllers

import * as controller from '../controllers/controller.js';

//question routes API
router.get('/questions', controller.getQuestions)
router.post('/questions',controller.insertQuestions)
router.delete('questions',controller.deleteQuestions)


export default router;
