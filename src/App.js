import React from "react";
import AuthProvider from "./provider/authProvider";
import Routes from "./routes";
import LogoutTimer from "./user/LogoutTimer.js";

function App() {
  return (
      <AuthProvider>
            <LogoutTimer />
              <Routes />
      </AuthProvider>
  );
}

export default App;
