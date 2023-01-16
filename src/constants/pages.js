import SignInPage from "../pages/SignInPage";
import ProfilePage from "../pages/ProfilePage";
import ExercisesPage from "../pages/ExercisesPage";
import * as React from "react";
import WorkoutsPage from "../pages/WorkoutsPage";

export const pages = [
  {
    path: "/login",
    component: <SignInPage />,
    isLoginReq: false,
  },
  {
    path: "/profile",
    component: <ProfilePage />,
    isLoginReq: true,
  },
  {
    path: "/exercises",
    component: <ExercisesPage />,
    isLoginReq: true,
  },
  {
    path: "/workouts",
    component: <WorkoutsPage />,
    isLoginReq: true,
  },
];
