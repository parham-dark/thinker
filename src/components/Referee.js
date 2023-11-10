import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Container, TextField, Grid } from "@mui/material";
import axios from "axios";

const Referee = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      NOTHING
    </Grid>
  );
};

export default Referee;
