import React, { useState } from "react";
import { Grid, Tab, Tabs, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

import AcceptIdea from "./AcceptIdea";
import PendingIdea from "./PendingIdea";

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
  tabLabel: {
    fontWeight: "normal",
  },
}));

const RefeereIdea = () => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

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
            <Tab label="AcceptIdea" classes={{ label: classes.tabLabel }} />
            <Tab label="PendingIdea" />
          </Tabs>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          {value === 0 && <AcceptIdea />}
          {value === 1 && <PendingIdea />}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RefeereIdea;
