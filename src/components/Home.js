import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  AppBar,
  Toolbar,
  Paper,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@mui/styles";
import Footer from "./footer";
import { ThemeProvider } from "@mui/styles";

const theme = {
  spacing: (factor) => `${0.25 * factor}rem`,
};

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroun  d: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4),
  },
  container: {
    background: "white",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
    width: "100%",
    maxWidth: 800,
  },
  button: {
    margin: theme.spacing(1),
  },
  accordion: {
    marginBottom: theme.spacing(2),
    backgroundColor: "rgba(255, 105, 135, 0.2)",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  accordionSummary: {
    background: "linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)",
    color: "white",
  },
  accordionSummaryItem: {
    background: "linear-gradient(45deg, #1976D2 30%, #2196F3 90%)",
  },
  form: {
    marginTop: theme.spacing(2),
  },
  rootContainer: {
    maxHeight: "70vh",
    overflowY: "auto",
  },
  buttonClass: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonClass2: {
    paddingLeft: "22px",
  },
  containerAll: {
    minHeight: "50vh!important",
  },
  title: {
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    background: "rgba(0, 128, 0, 0.2)",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

const Home = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const access = location.state?.access;
  const personId = location.state?.personId;
  const { control, handleSubmit } = useForm();
  const [ideas, setIdeas] = useState([]);
  const [ideasRefeer, setIdeasRefeer] = useState([]);

  useEffect(() => {
    const apiUrl = "http://localhost:57679/api/Thinker/GetAllAcceptIdeas";
    axios
      .get(apiUrl)
      .then((response) => {
        const modifiedIdeas = response.data.map((idea) => ({
          ...idea,
          id: idea.id.slice(-2),
        }));
        setIdeas(modifiedIdeas);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  }, []);

  useEffect(() => {
    const apiUrlRefress = "http://localhost:57679/Thinker/getAllIdeas";
    axios
      .get(apiUrlRefress)
      .then((response) => {
        setIdeasRefeer(response.data);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  }, []);

  const acceptIdea = async (data) => {
    try {
      const apiUrl = `http://localhost:57679/Thinker/ApproveIdeaByReferee`;
      const response = await axios.post(apiUrl, data);

      response.data
        ? toast.success("ایده شما با موفقیت ثبت شد")
        : toast.error("ایده شما با موفقیت ثبت نشد");
    } catch (error) {
      console.error("API error:", error);
      toast.error("An error occurred while accepting the idea");
    }
  };

  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Thinker</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.containerAll}>
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <Container className={classes.container}>
              {access === 0 ? (
                <div className={classes.buttonClass}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      navigate("/acceptIdea", { state: { personId, access } })
                    }
                    className={classes.button}
                  >
                    Accept Ideas
                  </Button>
                  <div className={classes.buttonClass2}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => navigate("/CreateIdea")}
                      className={classes.button}
                    >
                      Create Idea
                    </Button>
                  </div>
                </div>
              ) : access === 1 ? (
                <Grid item xs={12} className={classes.rootContainer}>
                  <Typography
                    className={classes.title}
                    variant="h4"
                    component="div"
                    gutterBottom
                  >
                    Accepted Ideas
                  </Typography>
                  {ideas.map((idea) => (
                    <Paper className={classes.paper}>
                      <Grid
                        item
                        xs={12}
                        key={idea.id}
                        className={classes.accordion}
                      >
                        <Accordion>
                          <AccordionSummary
                            className={`${classes.accordionSummary} ${classes.accordionSummaryItem}`}
                          >
                            <Typography variant="h6">{idea.name}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>ID: {idea.id}</Typography>
                            <Typography>
                              Created At: {idea.createdAt}
                            </Typography>
                            <Typography>
                              Description: {idea.description}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                    </Paper>
                  ))}
                  <Typography
                    className={classes.title}
                    variant="h4"
                    component="div"
                    gutterBottom
                  >
                    Pending Ideas
                  </Typography>
                  {ideasRefeer.map((idea) => (
                    <Grid item xs={12} className={classes.accordion}>
                      <Accordion>
                        <AccordionSummary
                          className={`${classes.accordionSummary} ${classes.accordionSummaryItem}`}
                        >
                          <Typography variant="h6">{idea.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>ID: {idea.id}</Typography>
                          <Typography>Created At: {idea.createdAt}</Typography>
                          <Typography>
                            Description: {idea.description}
                          </Typography>
                          <form
                            onSubmit={handleSubmit(acceptIdea)}
                            className={classes.form}
                          >
                            <ToastContainer />
                            <Controller
                              name="ideaId"
                              control={control}
                              defaultValue={idea.id}
                              render={({ field }) => (
                                <input type="hidden" {...field} />
                              )}
                            />
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                            >
                              Accept
                            </Button>
                          </form>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  ))}
                </Grid>
              ) : null}
            </Container>
          </div>
        </ThemeProvider>
        <Footer navigate={navigate} />
      </div>
    </>
  );
};

export default Home;
