import React from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import "./App.css";
import AppComponent from "./components/App";

const styles = {
  app: {
    maxWidth: "100%",
    maxHeight: `100vh`,
    overflowX: "hidden",
    overflowY: "scroll",
  },
};

function App() {
  return (
    <div className="App" style={styles.app}>
      <ProSidebarProvider>
        <AppComponent />
      </ProSidebarProvider>
    </div>
  );
}

export default App;
