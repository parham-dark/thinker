import React from "react";
import { makeStyles } from "@mui/styles";
import { Paper, Typography, Link } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    textAlign: "center",
    color: "#fff",
    borderTop: `1px solid ${theme.palette.primary.light}`,
  },
  footerText: {
    marginTop: theme.spacing(2),
    fontSize: "1rem",
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: "none",
    fontSize: "1.1rem", // Custom font size for links
    "&:hover": {
      color: theme.palette.secondary.dark,
      textDecoration: "underline",
    },
  },
  linkSeparator: {
    margin: `0 ${theme.spacing(1)}px`,
  },
}));

const Footer = ({ navigate }) => {
  const classes = useStyles();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/");
  };

  const hanldeCreatePerson = () => {
    navigate("/CreatePerson");
  };

  const hanldeCreatePersonBack = () => {
    navigate("/home");
  };
  return (
    <Paper elevation={3} className={classes.footer}>
      <Typography variant="body1">&copy; Thinker Site</Typography>
      <Typography variant="body2" className={classes.footerText}>
        با این سایت میتوانید ایده های خود را ثبت نمایید و با ما به اشتراک
        بگذارید و آنها را لایک کنید و از آنها لذت ببرید. همچنین با انتخاب نقش
        داور میتوانید با قضاوت کردن ایده های ثبت شده در به اشتراک گذاشتن ایده
        های مفید به ما یاری برسانید.
      </Typography>
      <Typography variant="body2">
        <Link className={classes.link} onClick={handleLogin}>
          ورود
        </Link>
        <span className={classes.linkSeparator}>|</span>
        <Link className={classes.link} onClick={handleRegister}>
          ثبت نام
        </Link>
        <span className={classes.linkSeparator}>|</span>
        <Link className={classes.link} onClick={hanldeCreatePerson}>
          انتخاب نقش
        </Link>
        <span className={classes.linkSeparator}>|</span>
        <Link className={classes.link} onClick={hanldeCreatePersonBack}>
          home
        </Link>
      </Typography>
    </Paper>
  );
};

export default Footer;
