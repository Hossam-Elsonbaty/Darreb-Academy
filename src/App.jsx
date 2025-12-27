import { Suspense, lazy } from "react";
import "./i18n";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LottieLoading from "./common/dynamic-components/LottieLoading";
const Enroll = lazy(() => import("./pages/enroll/Enroll"));
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
const Cart = lazy(() => import("./pages/cart/cart"));
const WishlistPage = lazy(() => import("./pages/wishlist/wishlist"));
import AccountLayout from "./layouts/AccountLayout";
import Profile from "./pages/user-dash/Profile/Profile";
import Photo from "./pages/user-dash/Photo/Photo";
import Security from "./pages/user-dash/Security/Security";
import DeleteAccount from "./pages/user-dash/delete/DeleteAccount";
import PurchasedCourses from "./pages/user-dash/Purchased courses/PurchasedCourses";
import SuccessPayment from "./pages/success/success";
import CourseWatch from "./pages/watchCourse/CourseWatch";
// import Courses from "./pages/courses/Courses";
// import CoursesDetails from "./pages/courses/CoursesDetails";



const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <RootLayout />
      // <Suspense fallback={<LottieLoading status="main" />}>
      // </Suspense>
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
            <Courses />
          // <Suspense fallback={<LottieLoading status="page" />}>
          // </Suspense>
        ),
      },

      {
        path: "/courses/:id",
        element: (
            <CoursesDetails />
          // <Suspense fallback={<LottieLoading status="page" />}>
          // </Suspense>
        ),
      },

      {
        path: "/enroll",
        element: (
          <Suspense fallback={<LottieLoading status="page" />}>
            <Enroll />
          </Suspense>
        ),
      },
      {
        path: "/watch-course/:id",
        element: (
          <Suspense fallback={<LottieLoading status="page" />}>
            <CourseWatch />
          </Suspense>
        ),
      },

      {
        path: "/cart",
        element: (
           <Cart />
          // <Suspense fallback={<LottieLoading status="page" />}>
          // </Suspense>
        ),
      },
      {
        path: "/wishlist",
        element: (
           <WishlistPage />
          // <Suspense fallback={<LottieLoading status="page" />}>
          // </Suspense>
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
        path: "/success",
        element: (
          <Suspense fallback={<LottieLoading status="page" />}>
            <SuccessPayment />
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
  {
  path: "/user-dashboard",
  element: <AccountLayout />,
  children: [
    {
      index: true,
      element: <Profile />,
    },
    {
      path: "profile",
      element: <Profile />,
    },
    {
      path: "photo",
      element: <Photo />,
    },
    {
      path: "security",
      element: <Security />,
    },
    {
      path: "DeleteAccount",
      element: <DeleteAccount />,
    },
    {
      path: "PurchasedCourses",
      element: <PurchasedCourses />,
    },
  ],
},



]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
