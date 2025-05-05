import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  LinearProgress,
  Stack,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const sampleQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Rome", "Berlin", "Madrid"],
    correct: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: "Mars",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    correct: "Pacific",
  },
];

export default function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);

  const navigate = useNavigate();

  const currentQuestion = sampleQuestions[currentIndex];

  const handleOptionChange = (value) => {
    setSelectedOptions({ ...selectedOptions, [currentIndex]: value });
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < sampleQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleFinish = () => {
    let calculatedScore = 0;
    sampleQuestions.forEach((q, index) => {
      if (selectedOptions[index] === q.correct) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    // Navigate to result page, pass score & total as state
    navigate("/result", { state: { score: calculatedScore, total: sampleQuestions.length } });
  };

  const progress = ((currentIndex + 1) / sampleQuestions.length) * 100;

  return (
    <Container maxWidth="md" sx={{ mt: 4, display: "flex", justifyContent: "center",backgroundImage: 'url("https://img.freepik.com/free-vector/question-marks-background_78370-2896.jpg?t=st=1746382743~exp=1746386343~hmac=d60634c25043f5f925b6ee3182b43d39c95d5bab5f5a2216ecc4f14eb4c344c4&w=1380")', alignItems: "center", minHeight: "90vh" }}>
      <Card sx={{ boxShadow: 10, borderRadius: 3, width: "100%", p: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ color: "#3f51b5" }}>
            Question {currentIndex + 1} of {sampleQuestions.length}
          </Typography>

          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              mb: 2,
              height: 10,
              borderRadius: 5,
              bgcolor: "#c5cae9",
              "& .MuiLinearProgress-bar": {
                bgcolor: "#3f51b5",
              },
            }}
          />

          <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
            {currentQuestion.question}
          </Typography>

          <RadioGroup
            value={selectedOptions[currentIndex] || ""}
            onChange={(e) => handleOptionChange(e.target.value)}
          >
            {currentQuestion.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio color="primary" />}
                label={option}
                sx={{
                  mb: 1,
                  bgcolor:
                    selectedOptions[currentIndex] === option
                      ? "#e3f2fd"
                      : "transparent",
                  borderRadius: 1,
                  px: 1,
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#e8f5e9",
                  },
                }}
              />
            ))}
          </RadioGroup>

          <Box sx={{ my: 3 }}>
            <Divider sx={{ mb: 2 }} />
            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "space-between" }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                sx={{
                  textTransform: "capitalize",
                  borderRadius: "20px",
                  "&:hover": {
                    bgcolor: "#f1f1f1",
                  },
                }}
              >
                Previous
              </Button>

              {currentIndex < sampleQuestions.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={!selectedOptions[currentIndex]}
                  sx={{
                    textTransform: "capitalize",
                    borderRadius: "20px",
                    "&:hover": {
                      bgcolor: "#303f9f",
                    },
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleFinish}
                  disabled={!selectedOptions[currentIndex]}
                  sx={{
                    textTransform: "capitalize",
                    borderRadius: "20px",
                    "&:hover": {
                      bgcolor: "#388e3c",
                    },
                  }}
                >
                  Finish
                </Button>
              )}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}