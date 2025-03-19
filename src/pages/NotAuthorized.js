import React from "react";
import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Access Denied</h1>
      <p style={styles.message}>
        You do not have permission to view this page. <br />
        Please contact the Admin for access.
      </p>
      <button style={styles.button} onClick={() => navigate(-1)}>
        Back to Home
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f8d7da",
    color: "#721c24",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  message: {
    fontSize: "1.2rem",
    margin: "10px 0",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default NotAuthorized;
