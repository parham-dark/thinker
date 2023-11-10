import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
// import Thinker from "./components/Thinker";
import Referee from "./components/Referee";
import NotFound from "./components/NotFound";
import CreatePerson from "./components/CreatePerson";
import CreateIdea from "./components/CreateIdea";
import AcceptIdea from "./components/AcceptIdea";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/createPerson" element={<CreatePerson />} />
            <Route path="/home" element={<Home />} />
            <Route path="/CreateIdea" element={<CreateIdea />} />
            <Route path="/acceptIdea" element={<AcceptIdea />} />

            {/* <Route path="/thinker" element={<Thinker />} /> */}
            {/* <Route path="/referee" element={<Referee />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
