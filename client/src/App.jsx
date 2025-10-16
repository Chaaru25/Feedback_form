import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeedbackForm from "./components/FeedbackForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import AdminFeedback from "./components/AdminFeedback";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<FeedbackForm />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminFeedback />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
