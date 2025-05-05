import React, { useState } from "react";
import { Box, Typography, Container, Button, List, ListItem, ListItemText, TextField } from "@mui/material";
import { Link } from "react-router-dom";

export default function Main() {
  const [name, setName] = useState("");

  const rules = [
    "You will have 10 minutes to complete the quiz.",
    "Each correct answer gives you 1 point.",
    "There’s no negative marking for wrong answers.",
    "You cannot go back to previous questions.",
    "Make sure you submit before time runs out!"
  ];

  return (
    <Container
      maxWidth="2xl"
      sx={{
        backgroundImage:
        'url("https://img.freepik.com/free-vector/online-certification-illustration-concept_23-2148573388.jpg?t=st=1746383517~exp=1746387117~hmac=455c3f6619beff49688c2e3fd7a4c054792eca29d08923f079fde8efa2b8f0a8&w=1380")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "98vh",
        display: "flex",
        borderRadius:2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          width: "100%",
          bgcolor: "#ffffff",
          borderRadius: 4,
          boxShadow: 6,
          p: 6,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
          Quiz Application
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Test your knowledge and challenge yourself!
        </Typography>

        <TextField
          label="Enter your name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mt: 3, mb: 4 }}
        />

        <Typography variant="h5" sx={{ mb: 2, fontWeight: "medium" }}>
          Quiz Rules
        </Typography>

        <List dense>
          {rules.map((rule, index) => (
            <ListItem key={index} sx={{ justifyContent: "flex-start" }}>
              <ListItemText primary={`${index + 1}. ${rule}`} />
            </ListItem>
          ))}
        </List>

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/quiz"
          disabled={!name.trim()}
          sx={{
            mt: 4,
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            textTransform: "none",
            borderRadius: 3,
          }}
        >
          Start Quiz
        </Button>
      </Box>
    </Container>
  );
}