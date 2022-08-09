import React from "react";
import {
  InnerWrapper,
  MessageWrapper,
  UnauthorizedWrapper,
} from "../styles/UnauthorizedWrapper";
import LockIcon from "@mui/icons-material/Lock";
import KeyIcon from "@mui/icons-material/Key";
import { Link } from "react-router-dom";

const Unauthorized: React.FC = () => {
  return (
    <UnauthorizedWrapper>
      <InnerWrapper>
        <LockIcon
          color="primary"
          sx={{
            position: "absolute",
            left: "50%",
            fontSize: "13rem",
            transform: "translateX(-50%)",
          }}
        />
        <KeyIcon
          color="error"
          sx={{
            position: "absolute",
            left: "0%",
            top: "27%",
            fontSize: "10rem",
          }}
        />
      </InnerWrapper>
      <MessageWrapper>
        <h2 style={{ color: "#d32f2f" }}>403 FORBIDDEN</h2>
        <Link
          to="/"
          style={{
            color: "#1565c0",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          Go Back
        </Link>
      </MessageWrapper>
    </UnauthorizedWrapper>
  );
};

export default Unauthorized;
