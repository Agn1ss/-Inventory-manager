import { useState } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import MainPage from "./pages/MainPage";
import ThemeProvider from "./components/ThemeProvider";

function App() {
  return (
    <>
      <ThemeProvider />
      <MainPage></MainPage>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
