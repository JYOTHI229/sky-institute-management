import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <span className="ticket-meta">SKY // GATE CLOSED</span>
      <h1>404</h1>
      <h2>This page took off without you.</h2>
      <p>The page you're looking for doesn't exist or may have moved.</p>
      <Link to="/" className="btn-solid">Back to Home</Link>
    </div>
  );
}

export default NotFound;
