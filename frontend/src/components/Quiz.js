import React, { useState, useEffect } from "react";
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

export default function Quiz() {
  const [sampleQuestions, setSampleQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/questions");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSampleQuestions(data);
      } catch (err) {
        console.error("Failed to fetch questions:", err);
        setError("Failed to load questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

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
    navigate("/result", {
      state: { score: calculatedScore, total: sampleQuestions.length },
    });
  };

  const progress = sampleQuestions.length
    ? ((currentIndex + 1) / sampleQuestions.length) * 100
    : 0;

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h6">Loading questions...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!sampleQuestions.length) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h6">No questions available.</Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        display: "flex",
        justifyContent: "center",
        backgroundImage:
          'url("https://img.freepik.com/free-vector/question-marks-background_78370-2896.jpg")',
        alignItems: "center",
        minHeight: "90vh",
      }}
    >
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
