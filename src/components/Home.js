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
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import MenuIcon from "@mui/icons-material/Menu";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@mui/styles";
import Footer from "./footer";
import { ThemeProvider } from "@mui/styles";
import RefeereIdea from "./RefeereIdea";
import CreatePerson from "./CreatePerson";

const theme = {
  spacing: (factor) => `${0.25 * factor}rem`,
};

const useStyles = makeStyles((theme) => ({
  root: {
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
  // Add your additional styles here
  appBar: {
    // Your styles for the app bar
  },
  toolbar: {
    // Your styles for the toolbar
  },
  drawer: {
    // Your styles for the drawer
  },
  listItem: {
    // Your styles for list items
  },
}));

const Home = (props) => {
  // const location = useLocation();
  // const navigate = useNavigate();
  // const access = location.state?.access;
  // const personId = location.state?.personId;
  // const { control, handleSubmit } = useForm();
  // const [ideas, setIdeas] = useState([]);
  // const [ideasRefeer, setIdeasRefeer] = useState([]);
  // const [isMenuOpen, setIsMenuOpen] = useState(false); // New state for menu status

  const location = useLocation();
  const navigate = useNavigate();
  const access = location.state?.access;
  const personId = location.state?.personId;
  const { control, handleSubmit } = useForm();
  const [ideas, setIdeas] = useState([]);
  const [ideasRefeer, setIdeasRefeer] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const apiUrl = "http://172.21.27.245:57679/api/Thinker/GetAllAcceptIdeas";
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
    const apiUrlRefress = "http://172.21.27.245:57679/Thinker/getAllIdeas";
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
      const apiUrl = `http://172.21.27.245:57679/Thinker/ApproveIdeaByReferee`;
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

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleNavigate = (route) => {
    let targetComponent;

    if (route === "thinker") {
      targetComponent = "thinker";
    } else if (route === "refeere") {
      targetComponent = "refeere";
    }

    navigate(`/${targetComponent}`);
    setIsDrawerOpen(false); // Close the drawer after navigating
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Button color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </Button>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={handleDrawerToggle}
          className={classes.drawer}
        >
          <List>
            <ListItem
              button
              onClick={() => handleNavigate("thinker")}
              className={classes.listItem}
            >
              <ListItemText primary="Thinker" />
            </ListItem>
            <ListItem
              button
              onClick={() => handleNavigate("refeere")}
              className={classes.listItem}
            >
              <ListItemText primary="Referee" />
            </ListItem>
          </List>
        </Drawer>
        <CreatePerson />
      </ThemeProvider>
    </>
  );
};

export default Home;
