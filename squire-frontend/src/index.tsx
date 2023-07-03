import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/misc/LandingPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LogsListPage from "./pages/logging/LogsListPage";
import BuildPage from "./pages/builder/BuildPage";
import BuildProcessPage from "./pages/builder/BuildProcessPage";
import DisplayLogPage from "./pages/logging/DisplayLogPage";
import NavFrame from "./components/nav/NavFrame";
import ErrorPage from "./pages/misc/ErrorPage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavFrame />,
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      // { path: "/logs", element: <LogsListPage /> },
      // { path: "/log/:runid", element: <DisplayLogPage /> },
      { path: "/projects/:projectId", element: <>List Projects</> },
      { path: "/projects/:projectId/builds/:buildId", element: <BuildPage /> },
      {
        path: "/projects/:projectId/builds/:buildId/log",
        element: <>List Logs</>,
      },
      // { path: "/build/:engineid/:runid", element: <BuildProcessPage /> },
    ],
  },
  {
    path: "/about",
    element: <LandingPage />,
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <SignUpPage /> },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
