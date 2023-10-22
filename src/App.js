import EmailView from "./components/EmailView";
import NavBar from "./features/Navbar";
import "./styles.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<EmailView />} />
      </Routes>
    </div>
  );
}
