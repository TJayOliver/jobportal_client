import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Error } from "./components/Error/error.jsx";
import Home from "./pages/home.jsx";
import Article from "./pages/Article/article.jsx";
import Administrator from "./pages/administrator/administrator.jsx";
import Dashboard from "./pages/administrator/dashboard.jsx";
import ArticleDescription from "./pages/Article/articleDescription.jsx";
import JobDescription from "./pages/Job/JobDescription.jsx";
import Jobs from "./pages/Job/Jobs.jsx";
import Scholarship from "./pages/Scholarship/scholarship.jsx";
import ScholarshipDescription from "./pages/Scholarship/scholarshipDescription.jsx";
import ScholarshipCategory from "./pages/Scholarship/scholarshipCategory.jsx";
import Unsubscribe from "./pages/unSubscribe.jsx";

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
    path: "/article",
    element: <Article />,
    errorElement: <Error />,
  },
  {
    path: "/article/:id",
    element: <ArticleDescription />,
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
    path: "/scholarship/category/:category",
    element: <ScholarshipCategory />,
    errorElement: <Error />,
  },
  {
    path: "/unsubscribe",
    element: <Unsubscribe />,
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
