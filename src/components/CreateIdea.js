import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Paper, Typography, TextField, Grid } from "@mui/material";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(to right, #c31432, #240b36)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
    background: "#fff",
    maxWidth: "600px", // Adjust the width as needed
    width: "100%",
  },
  heading: {
    marginBottom: theme.spacing(2),
    color: "#c31432",
  },
  submitButton: {
    marginTop: theme.spacing(3),
    background: "#c31432",
    color: "#fff",
    "&:hover": {
      background: "#240b36",
    },
  },
  formContainer: {
    marginTop: theme.spacing(4),
  },
  textField: {
    marginBottom: theme.spacing(2),
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#c31432", // Border color when not focused
      },
      "&:hover fieldset": {
        borderColor: "#240b36", // Border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "#c31432", // Border color when focused
      },
    },
  },
}));

const CreateIdea = ({ navigator }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const classes = useStyles();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:57679/Thinker/createIdeas",
        data
      );
      navigate("/home", { state: { access: 0 } });
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Typography
          variant="h5"
          component="div"
          align="center"
          className={classes.heading}
        >
          Register Idea
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classes.formContainer}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Za-z ]+/,
                    message: "Name must contain only letters and spaces",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    className={`${classes.textField}`}
                    label="Name"
                    variant="outlined"
                    {...field}
                    error={!!errors.name}
                    helperText={errors.name && errors.name.message}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="personName"
                control={control}
                defaultValue=""
                rules={{
                  required: "Person's Name is required",
                }}
                render={({ field }) => (
                  <TextField
                    className={`${classes.textField}`}
                    label="Person's Name"
                    variant="outlined"
                    {...field}
                    error={!!errors.personName}
                    helperText={errors.personName && errors.personName.message}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                rules={{
                  required: "Description is required",
                }}
                render={({ field }) => (
                  <TextField
                    className={`${classes.textField}`}
                    label="Description"
                    variant="outlined"
                    {...field}
                    error={!!errors.description}
                    helperText={
                      errors.description && errors.description.message
                    }
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
          <Grid mt={4}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submitButton}
            >
              Submit
            </Button>
          </Grid>
        </form>
        <Footer navigate={navigate} />
      </Paper>
    </div>
  );
};

export default CreateIdea;
