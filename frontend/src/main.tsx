import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

// Global CSS
import "./main.css";
import { Login } from "./components/pages/Login";
import { Error } from "./components/pages/Error.tsx";
import { Contact } from "./components/pages/Contact.tsx";
import { theme } from "./theme/index.ts";

// ルーターの作成
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home</div>,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/Contact",
    element: <Contact />,
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
