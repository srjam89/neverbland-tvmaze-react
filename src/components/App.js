import React from "react";
import Schedule from "./schedule";
import ShowItem from "./showItem";
import Navigation from "./navigation";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Schedule />} />
          <Route path="/showitem/:id" element={<ShowItem />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
