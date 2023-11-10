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
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Footer from "./footer";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: {
    width: "100%",
    maxWidth: 400,
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

  const onSubmit = async (data) => {
    try {
      const selectedRole = data.access;
      const postData = {
        name: data.name,
        access: selectedRole,
      };

      const response = await axios.post(
        "http://localhost:57679/Thinker/Person/create",
        postData
      );
      // console.log("API response:", response.data);
      const personId = response.data.personId;

      // console.log(personId, "personId");

      navigate("/home", {
        state: {
          access: selectedRole,
          name: postData.name,
          personId: personId,
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6">Thinker</Typography>
        </Toolbar>
      </AppBar>
      <Grid justifyContent="center" mt={38} ml={90}>
        <Paper elevation={3} className={classes.form}>
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
          </form>
        </Paper>
      </Grid>
      <div className={classes.formClassFooter}>
        <Footer navigate={navigate} />
      </div>
    </>
  );
};

export default CreatePerson;
