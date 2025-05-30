import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Error } from "./components/Error/error.jsx";
import Home from "./pages/home.jsx";
import Administrator from "./pages/administrator/administrator.jsx";
import Dashboard from "./pages/administrator/dashboard.jsx";
import Unsubscribe from "./pages/unSubscribe.jsx";
import Privacy from "./pages/privacy.jsx";
import { HelmetProvider } from "react-helmet-async";
import Jobs from "./pages/Job/job.jsx";
import JobDescription from "./pages/Job/JobDescription.jsx";
import Scholarship from "./pages/Scholarship/scholarship.jsx";
import ScholarshipDescription from "./pages/Scholarship/scholarshipDescription.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/administrator",
    element: <Administrator />,
    errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <Error />,
  },
  {
    path: "/job",
    element: <Jobs />,
    errorElement: <Error />,
  },
  {
    path: "/job/:id",
    element: <JobDescription />,
    errorElement: <Error />,
  },
  {
    path: "/scholarship",
    element: <Scholarship />,
    errorElement: <Error />,
  },
  {
    path: "/scholarship/:id",
    element: <ScholarshipDescription />,
    errorElement: <Error />,
  },
  {
    path: "/unsubscribe",
    element: <Unsubscribe />,
    errorElement: <Error />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
