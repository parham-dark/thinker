import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Paper,
  Button,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import ThumbUpIcon from "@mui/icons-material/ThumbUp"; // Import the thumb up icon
import ThumbDownIcon from "@mui/icons-material/ThumbDown"; // Import the thumb down icon
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./footer";
import { useSelector } from "react-redux"; // Add this line

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    padding: theme.spacing(4),
    backgroundColor: "#f0f0f0",
  },
  paper: {
    backgroundColor: "#FFFFFF",
    color: "#333",
    padding: theme.spacing(4),
    marginBottom: theme.spacing(2),
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  accordion: {
    marginBottom: theme.spacing(2),
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  summary: {
    background: "linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)",
    color: "#FFFFFF",
  },
  details: {
    background: "#F4F4F4",
    padding: theme.spacing(2),
  },
  likeButton: {
    marginLeft: theme.spacing(2),
    cursor: "pointer",
    fontSize: "24px",
  },
  liked: {
    color: "blue",
  },
  disliked: {
    color: "black",
  },
}));

const AcceptIdea = () => {
  const classes = useStyles();
  const [ideas, setIdeas] = useState([]);
  const location = useLocation();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const personId = useSelector((state) => state.auth.personId);

  const navigate = useNavigate();

  console.log(personId, "personId");

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleLikeClick = (ideaId) => {
    const likeData = {
      ideaId: ideaId,
      personId: personId,
    };

    axios
      .post("http://localhost:57679/Thinker/LikeIdea", likeData)
      .then((response) => {
        const updatedIdeas = ideas.map((idea) =>
          idea.id === ideaId ? { ...idea, liked: true, disliked: false } : idea
        );
        setIdeas(updatedIdeas);
        handleSnackbarOpen("You liked the idea!");
        console.log("API response:", response.data);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  };

  const handleDislikeClick = (ideaId) => {
    const dislikeData = {
      ideaId: ideaId,
      personId: personId,
    };

    axios
      .post("http://localhost:57679/Thinker/DislikeIdea", dislikeData)
      .then((response) => {
        const updatedIdeas = ideas.map((idea) =>
          idea.id === ideaId ? { ...idea, liked: false, disliked: true } : idea
        );
        setIdeas(updatedIdeas);
        handleSnackbarOpen("You disliked the idea!");
        console.log("API response:", response.data);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  };

  useEffect(() => {
    const apiUrl = "http://localhost:57679/api/Thinker/GetAllAcceptIdeas";

    axios
      .get(apiUrl)
      .then((response) => {
        const initialIdeas = response.data.map((idea) => ({
          ...idea,
          liked: false,
          disliked: false,
        }));
        setIdeas(initialIdeas);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Paper elevation={5} className={classes.paper}>
        {/* <Button
          onClick={() => (access === 0 ? navigate("/home") : "nothing")}
          variant="outlined"
          color="primary"
          style={{ marginBottom: 16 }}
        >
          Back to Home
        </Button> */}

        <Typography variant="h4" className={classes.title}>
          Accepted Ideas
        </Typography>
        {ideas.map((idea) => (
          <Accordion key={idea.id} className={classes.accordion}>
            <AccordionSummary className={classes.summary}>
              <Typography variant="h6">{idea.name}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <Typography>ID: {idea.id}</Typography>
              <Typography>Created At: {idea.createdAt}</Typography>
              <Typography>Description: {idea.description}</Typography>
              {idea.liked ? (
                <ThumbUpIcon
                  onClick={() => handleDislikeClick(idea.id)}
                  className={`${classes.likeButton} ${classes.liked}`}
                />
              ) : (
                <ThumbDownIcon
                  onClick={() => handleLikeClick(idea.id)}
                  className={`${classes.likeButton} ${
                    idea.disliked ? classes.disliked : ""
                  }`}
                />
              )}
            </AccordionDetails>
          </Accordion>
        ))}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </Paper>

      <Footer navigate={navigate} />
    </div>
  );
};

export default AcceptIdea;
