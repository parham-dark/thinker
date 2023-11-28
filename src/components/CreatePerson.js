import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
  Typography,
  Paper,
  Skeleton,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Footer from "./footer";
import { useDispatch } from "react-redux";
import { setPersonId } from "../redux/slices/authSlice";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: {
    width: "100%",
    maxWidth: 450,
    padding: theme.spacing(3),
  },
  formControl: {
    width: "100%",
    marginBottom: theme.spacing(2), // Maintain spacing
  },
  submitButton: {
    width: "100%",
    marginTop: theme.spacing(2), // Maintain spacing
  },
  heading: {
    marginBottom: theme.spacing(3), // Maintain spacing
    textAlign: "center",
  },
  formClass: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
  formClassFooter: {
    marginTop: "225px",
  },
}));

const CreatePerson = () => {
  const { control, handleSubmit, register } = useForm();
  const classes = useStyles();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [loading, setLoading] = useState(false); // Add loading state
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const selectedRole = data.access;
      const postData = {
        name: data.name,
        access: selectedRole,
      };

      const response = await axios.post(
        "http://172.21.27.245:57679/Thinker/Person/create",
        postData
      );

      // const personId = response.data.personId;
      dispatch(setPersonId(response.data.personId));

      if (response.status === 201) {
        setSnackbarMessage(
          "با موفقیت ثبت شد برای امور خود به پنل نقش خود مراجعه کنید"
        );
        setOpenSnackbar(true);
      } else {
      }
    } catch (error) {
      setSnackbarMessage("شما قبلا با این نام ثبت کردید");
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <>
      <Grid justifyContent="center" mt={38} ml={90}>
        <Paper elevation={5} className={classes.form}>
          <Typography
            mb={2}
            variant="h5"
            component="div"
            className={classes.heading}
          >
            Choose Character
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.formClass}>
            <TextField
              label="Name"
              {...register("name")}
              variant="outlined"
              className={classes.formControl}
            />
            <FormControl className={classes.formControl}>
              <InputLabel>Access</InputLabel>
              <Controller
                name="access"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value={0}>Thinker</MenuItem>
                    <MenuItem value={1}>Referee</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
            >
              Submit
            </Button>
            <Typography>
              با کلیک بر روی منوی بالا سمت چپ صفحه به امورات نقش خود بپردازید
            </Typography>
          </form>
        </Paper>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </Grid>
      <div className={classes.formClassFooter}>
        <Footer navigate={navigate} />
      </div>
    </>
  );
};

export default CreatePerson;
