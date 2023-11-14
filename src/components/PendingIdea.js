import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@mui/styles";
import Footer from "./footer";

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    maxHeight: "70vh",
    overflowY: "auto",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
    color: "#2196f3", // Add your desired color
  },
  accordion: {
    marginBottom: theme.spacing(2),
    backgroundColor: "rgba(255, 105, 135, 0.2)",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  accordionSummary: {
    background: "linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)",
    color: "white",
  },
  accordionSummaryItem: {
    background: "linear-gradient(45deg, #1976D2 30%, #2196F3 90%)",
  },
  form: {
    marginTop: theme.spacing(2),
  },
}));

const PendingIdea = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();
  const [ideasRefeer, setIdeasRefeer] = useState([]);
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const apiUrlRefress = "http://localhost:57679/Thinker/getAllIdeas";
    axios
      .get(apiUrlRefress)
      .then((response) => {
        setIdeasRefeer(response.data);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  }, []);

  const acceptIdea = async (data) => {
    try {
      const apiUrl = `http://localhost:57679/Thinker/ApproveIdeaByReferee`;
      const response = await axios.post(apiUrl, data);

      if (response.status === 201) {
        // Show Snackbar on success
        setSnackbarMessage("ایده شما با موفقیت ثبت شد");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage("مشکلی پیش آمده");
      setOpenSnackbar(true);
    }
  };

  return (
    <Grid item xs={12} className={classes.rootContainer}>
      <Typography
        className={classes.title}
        variant="h4"
        component="div"
        gutterBottom
      >
        Pending Ideas
      </Typography>
      {ideasRefeer.map((idea) => (
        <Grid item xs={12} key={idea.id} className={classes.accordion}>
          <Accordion>
            <AccordionSummary
              className={`${classes.accordionSummary} ${classes.accordionSummaryItem}`}
            >
              <Typography variant="h6">{idea.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>ID: {idea.id}</Typography>
              <Typography>Created At: {idea.createdAt}</Typography>
              <Typography>Description: {idea.description}</Typography>
              <form
                onSubmit={handleSubmit(acceptIdea)}
                className={classes.form}
              >
                <ToastContainer />
                <Controller
                  name="ideaId"
                  control={control}
                  defaultValue={idea.id}
                  render={({ field }) => <input type="hidden" {...field} />}
                />
                <Button variant="contained" color="primary" type="submit">
                  Accept
                </Button>
              </form>
            </AccordionDetails>
          </Accordion>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            message={snackbarMessage}
            className={classes.snackbar}
          />
        </Grid>
      ))}
      <Footer navigate={navigate} />
    </Grid>
  );
};

export default PendingIdea;
