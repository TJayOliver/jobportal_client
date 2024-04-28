import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home.jsx";
import Jobs from "./pages/Job/Jobs.jsx";
import Scholarship from "./pages/Scholarship/Scholarship.jsx";

import Article from "./pages/Article/article.jsx";
import Administrator from "./pages/administrator/administrator.jsx";

import ArticleDescription from "./pages/Article/articleDescription.jsx";
import JobDescription from "./pages/Job/JobDescription.jsx";
import ScholarshipDescription from "./pages/Scholarship/scholarshipDescription.jsx";
import ScholarshipCategory from "./pages/Scholarship/scholarshipCategory.jsx";

import SubscribersList from "./components/Dashboard/subscriberList/subscribersList.jsx";
import Dashboard from "./pages/administrator/dashboard.jsx";
import Unsubscribe from "./pages/unSubscribe.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />

      <Route path="/*" element={<Home />} />

      <Route path="/article">
        <Route path="/article" element={<Article />} />
        <Route path="/article/:id" element={<ArticleDescription />} />
      </Route>

      <Route path="/administrator" element={<Administrator />} />

      <Route path="/job">
        <Route path="/job" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDescription />} />
        <Route path="/job/:categoriesname" element={<JobDescription />} />
      </Route>

      <Route path="/scholarship">
        <Route path="/scholarship" element={<Scholarship />} />
        <Route
          path="/scholarship/category/:category"
          element={<ScholarshipCategory />}
        />
        <Route path="/scholarship/:id" element={<ScholarshipDescription />} />
      </Route>

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/subscribers" element={<SubscribersList />} />
      <Route path="/unsubscribe/:id" element={<Unsubscribe />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
