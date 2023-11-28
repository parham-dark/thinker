import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Snackbar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../redux/slices/authSlice";
import api from "../services/api";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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
  passwordInput: {
    passwordInput: {
      width: "calc(100% - 32px)",
    },
    showPasswordIcon: {
      color: theme.palette.primary.main,
    },
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
  const [showPassword, setShowPassword] = useState(false);

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (openSnackbar) {
      // Auto-close Snackbar after 4 seconds
      const timerId = setTimeout(() => {
        setOpenSnackbar(false);
      }, 4000);

      return () => clearTimeout(timerId);
    }
  }, [openSnackbar]);

  const onRegisterClick = () => {
    navigate("/Register");
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://172.21.27.245:57679/Thinker/login",
        data
      );

      if (response.status === 200) {
        handleSnackbarOpen("با موفقیت لاگین شد");

        // Use setTimeout to delay the navigation slightly
        setTimeout(() => {
          navigate("/home");
        }, 1000); // Adjust the delay time as needed
      } else {
        handleSnackbarOpen("Login failed. Check your credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. An error occurred.");
      handleSnackbarOpen(
        "شناسه یا پسوورد شما اشتباه است اگر ثبت نام نکردید ثبت نام کنید"
      );
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
            <Typography variant="subtitle1" align="center" gutterBottom>
              آیا شما حساب کاربری ساخته اید؟ اگر نکردید لطفا ثبت نام کنید
              <span
                style={{
                  color: "blue",
                  cursor: "pointer",
                  margin: "2px",
                  padding: "2px",
                }}
                onClick={onRegisterClick}
              >
                ثبت نام
              </span>
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
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    className={showPassword ? classes.showPasswordIcon : ""}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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
