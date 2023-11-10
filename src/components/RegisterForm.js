import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setUserId } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

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

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Get the history object

  const onSubmit = async (data) => {
    try {
      const apiUrl = "http://localhost:57679/Thinker/Register";
      const response = await axios.post(apiUrl, data);
      response.status == 201 ? navigate("/login") : navigate("/login");
    } catch (error) {
      // Handle network or request errors
      setError("Registration failed due to a network error.");
      toast.error("Registration failed - Network error", {
        position: "top-right",
      });
    }
    // superadmin
    // 87654321aA
  };

  return (
    <div className={classes.pool}>
      <Grid mt={30} container justifyContent="center">
        <Grid item xs={6}>
          <Paper elevation={3} className={classes.paper}>
            <Typography mb={4} variant="h5" component="div" align="center">
              Register
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: "Username is required",
                  pattern: {
                    value: /^[A-Za-z0-9]+$/,
                    message: "Only letters and numbers are allowed",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Username"
                    variant="outlined"
                    fullWidth
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    type="email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />

              <Button
                onSubmit={handleSubmit(onSubmit)}
                type="submit"
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegisterForm;
