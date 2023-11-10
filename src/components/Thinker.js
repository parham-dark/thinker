import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Container, TextField, Grid, Typography } from "@mui/material";
import axios from "axios";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },
  formControl: {
    width: "100%",
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  heading: {
    marginBottom: theme.spacing(4),
  },
}));

const Thinker = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const classes = useStyles();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:57679/Thinker/createIdeas",
        data
      );
      console.log("API response:", response.data);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <Grid container justifyContent="center" mt={30}>
      <Container className={classes.formContainer}>
        <Typography
          variant="h5"
          component="div"
          align="center"
          className={classes.heading}
        >
          ثبت ایده
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{
              required: "Name is required",
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Name must contain only letters and spaces",
              },
            }}
            render={({ field }) => (
              <TextField
                label="Name"
                variant="outlined"
                {...field}
                error={!!errors.name}
                helperText={errors.name && errors.name.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="personName"
            control={control}
            defaultValue=""
            rules={{
              required: "Person's Name is required",
            }}
            render={({ field }) => (
              <TextField
                label="Person's Name"
                variant="outlined"
                {...field}
                error={!!errors.personName}
                helperText={errors.personName && errors.personName.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{
              required: "Description is required",
            }}
            render={({ field }) => (
              <TextField
                label="Description"
                variant="outlined"
                {...field}
                error={!!errors.description}
                helperText={errors.description && errors.description.message}
                fullWidth
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submitButton}
          >
            Submit
          </Button>
        </form>
      </Container>
    </Grid>
  );
};

export default Thinker;
