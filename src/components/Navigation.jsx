import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { appRoutes, authRoutes } from "../enum/routes";
import HomePage from "../pages/Home";
import NotFoundPage from "../pages/NotFound";
import AttractionsPage from "../pages/Attractions";
import AttractionPage from "../pages/Attraction";
import NewPostPage from "../pages/NewPost";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";
import { useDispatch } from "react-redux";
import { saveAdminLogInInfo, saveLogInInfo } from "../store/auth";
import PostPage from "../pages/Post";
import ProfilePage from "../pages/Profile";
import UserReviewsPage from "../pages/UserReviews";
import UserEventsPage from "../pages/UserEvents";
import NewEventPage from "../pages/NewEvent";
import EventPage from "../pages/Event";
import EditEventPage from "../pages/EditEvent";
import NotificationPage from "../pages/Notification";
import AdminPage from "../pages/Admin";

const routes = createBrowserRouter([
  {
    path: appRoutes.HOME,
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: appRoutes.NEW_POST,
    element: <NewPostPage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: appRoutes.NEW_POST_FIND_ATTRACTIONS,
        element: <AttractionsPage />,
      },
      {
        path: appRoutes.NEW_POST_VIEW_ATTRACTION,
        element: <AttractionPage />,
      },
    ],
  },
  {
    path: appRoutes.POST,
    element: <PostPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: appRoutes.PROFILE,
    element: <ProfilePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: appRoutes.USER_REVIEWS,
        element: <UserReviewsPage />,
      },
      {
        path: appRoutes.USER_EVENTS,
        element: <UserEventsPage />,
      },
    ],
  },
  {
    path: appRoutes.NEW_EVENT,
    element: <NewEventPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: appRoutes.EVENT,
    element: <EventPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: appRoutes.EDIT_EVENT,
    element: <EditEventPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: appRoutes.NOTIFICATION,
    element: <NotificationPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: appRoutes.ADMIN,
    element: <AdminPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: authRoutes.SIGN_IN,
    element: <SignInPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: authRoutes.SIGN_UP,
    element: <SignUpPage />,
    errorElement: <NotFoundPage />,
  },
]);

const Navigation = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");

  if (token) {
    dispatch(saveLogInInfo(token));
  }

  if (adminToken) {
    dispatch(saveAdminLogInInfo(adminToken));
  }

  return <RouterProvider router={routes} />;
};

export default Navigation;
