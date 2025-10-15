import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeedbackForm from "./components/FeedbackForm";
import AdminFeedback from "./components/AdminFeedback";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<FeedbackForm />} />
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
