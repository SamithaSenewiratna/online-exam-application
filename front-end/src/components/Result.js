import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CancelIcon from "@mui/icons-material/Cancel";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 };

  const percentage = ((score / total) * 100).toFixed(2);
  const passed = percentage >= 35;

  const handleRetake = () => {
    navigate("/quiz");
  };

  return (
    <Box
      sx={{
        minHeight: "95vh",
        width: "100%",
        backgroundImage:
          'url("https://img.freepik.com/free-vector/colorful-blocks-blank-white-background-vector_53876-66997.jpg?t=st=1746383444~exp=1746387044~hmac=5d5e3c9555618538d5f1874d24fa86539ec80b08c48ab9f80f4c71f3c6172e9d&w=826")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            boxShadow: 10,
            borderRadius: 4,
            width: "100%",
            bgcolor: "rgba(255, 255, 255, 0.9)", // semi-transparent for background visibility
            textAlign: "center",
            p: 3,
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", mb: 2, color: "#3f51b5" }}
            >
              Quiz Results
            </Typography>

            <Box sx={{ mb: 2 }}>
              {passed ? (
                <EmojiEventsIcon sx={{ fontSize: 60, color: "gold" }} />
              ) : (
                <CancelIcon sx={{ fontSize: 60, color: "red" }} />
              )}
            </Box>

            <Chip
              label={passed ? "PASS" : "FAIL"}
              color={passed ? "success" : "error"}
              sx={{ fontSize: "1rem", px: 3, py: 1, mb: 3 }}
            />

            <Divider sx={{ mb: 3 }} />

            <Stack spacing={1} alignItems="center">
              <Typography variant="h6">
                Total Questions: <strong>{total}</strong>
              </Typography>
              <Typography variant="h6">
                Attempted: <strong>{total}</strong>
              </Typography>
              <Typography variant="h6">
                Correct Answers: <strong>{score}</strong>
              </Typography>
              <Typography variant="h6">
                Wrong Answers: <strong>{total - score}</strong>
              </Typography>
              <Typography variant="h6">
                Percentage: <strong>{percentage}%</strong>
              </Typography>
            </Stack>

            <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              sx={{ mt: 4 }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleRetake}
                sx={{
                  textTransform: "capitalize",
                  borderRadius: "30px",
                  px: 4,
                }}
              >
                Retake Quiz
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/")}
                sx={{
                  textTransform: "capitalize",
                  borderRadius: "30px",
                  px: 4,
                }}
              >
                Go to Home
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
