import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Snackbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../redux/slices/authSlice";
import api from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  pool: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
}));

const LoginForm = () => {
  const { control, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:57679/Thinker/login",
        data
      );

      if (response.status === 200) {
        handleSnackbarOpen("با موفقیت لاگین شد");
        navigate("/CreatePerson");
      } else {
        handleSnackbarOpen("Login failed. Check your credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. An error occurred.");
      handleSnackbarOpen("Login failed. An error occurred");
    }
  };

  return (
    <div className={classes.pool}>
      <Grid mt={30} container justifyContent="center">
        <Grid item xs={6}>
          <Paper elevation={3} className={classes.paper}>
            <Typography mb={4} variant="h5" component="div" align="center">
              Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Username"
                    variant="outlined"
                    fullWidth
                    className={classes.input}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    className={classes.input}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
              >
                Login
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};

export default LoginForm;
