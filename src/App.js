import React, { Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactQueryDevtools } from "react-query/devtools";
import { Routes, Route } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import Home from "./Home/index";
import Products from "./Products/index";
import Dashboard from "./Dashboard";
import About from "./Aboutus";
import Header from "./Components/Header/index";
import Footer from "./Components/Footer/index";
import "./App.css";

const queryClient = new QueryClient();
const history = createHistory();
const theme = createTheme();

function App() {
  const [currentRoute, setCurrentRoute] = React.useState(
    window.location.pathname.split("/")[1] || "/"
  );

  const pathNeededPermisions = ["dashboard"];

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : false
  );

  console.log("app log", isLoggedIn);

  useEffect(() => {
    history.listen((location) => {
      const newRoute =
        location.pathname && location.pathname.split("/")[1].trim().length > 0
          ? location.pathname.split("/")[1]
          : "/";
      setCurrentRoute(newRoute);
      setIsLoggedIn(
        localStorage.getItem("userInfo")
          ? JSON.parse(localStorage.getItem("userInfo")).isLoggedIn
          : false
      );
    });
    if (
      !isLoggedIn &&
      pathNeededPermisions.includes(window.location.pathname.split("/")[1])
    ) {
      window.location.href = "/";
    }
  }, [isLoggedIn]);

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback="loading">
        <ThemeProvider theme={theme}>
          <Header currentRoute={currentRoute} isLoggedIn={isLoggedIn} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="about-us" element={<About />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </Suspense>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
