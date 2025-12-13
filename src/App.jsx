import { Suspense, lazy } from "react";
import "./i18n";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LottieLoading from "./common/dynamic-components/LottieLoading";
const NotFound = lazy(() => import("./pages/notFound/NotFound"));
const Faq = lazy(() => import("./pages/faq/Faq"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const RootLayout = lazy(() => import("./layouts/RootLayout"));
const Home = lazy(() => import("./pages/home/Home"));
const About = lazy(() => import("./pages/about/About"));
const Courses = lazy(() => import("./pages/courses/Courses"));
const CoursesDetails = lazy(() => import("./pages/courses/CoursesDetails"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Blogs = lazy(() => import("./pages/blogs/Blogs"));

const router = createBrowserRouter([

  {
    path: "/",
    element: (
      <Suspense fallback={<LottieLoading status="main" />}>
        <RootLayout />
      </Suspense>
    ),
    errorElement: <LottieLoading status="error" />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LottieLoading status="page" />}>
            <Home />
          </Suspense>
        ),
      },

      {
        path: "/about",
        element: (
          <Suspense fallback={<LottieLoading status="page" />}>
            <About />
          </Suspense>
        ),
      },

      {
        path: "/courses",
        element: (
          <Suspense fallback={<LottieLoading status="page" />}>
            <Courses />
          </Suspense>
        ),
      },

      {
        path: "/courses/:id",
        element: (
          <Suspense fallback={<LottieLoading status="page" />}>
            <CoursesDetails />
          </Suspense>
        ),
      },
      
      {
        path: "/signin",
        element: (
          <Suspense fallback={<LottieLoading status="page" />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<LottieLoading status="page" />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/faq",
        element: (
          <Suspense fallback={<LottieLoading status="page" />}>
            <Faq />
          </Suspense>
        ),
      },

      {
        path: "/blogs",
        element: (
          <Suspense fallback={<LottieLoading status="page" />}>
            <Blogs />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<LottieLoading status="page" />}>
            <Contact />
          </Suspense>
        ),
      },

      {
        path: "/404",
        element: (
          <Suspense fallback={<LottieLoading status="notFound" />}>
            <NotFound />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<LottieLoading status="notFound" />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },


]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
