import React from "react";
import { Grid, Tab, Tabs, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AcceptIdea from "./AcceptIdea";
import CreateIdea from "./CreateIdea";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  tabs: {
    marginBottom: theme.spacing(2),
  },
}));

const ThinkerIdea = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.tabs}>
        <Paper square>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Create Idea" />
            <Tab label="Accept Idea" />
          </Tabs>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          {value === 0 && <CreateIdea />}
          {value === 1 && <AcceptIdea />}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ThinkerIdea;
