import { Routes } from "@angular/router";
import { Categories } from "./components/categories/categories";
import { LoginComponent } from "./auth/login-component/login-component";
import { Register } from "./auth/register/register";
import { Dashboard } from "./components/dashboard/dashboard";
import { Navbar } from "./components/navbar/navbar";
import { Activities } from "./components/activities/activities";
import { ActivityList } from "./components/activity-list/activity-list";
import { Users } from "./components/users/users";
import { Category } from "./components/category/category";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/activity",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "dashboard",
    component: Dashboard,
  },
  {
    path: "category",
    component: Categories,
  },
  {
    path: "register",
    component: Register,
  },
  {
    path: "navbar",
    component: Navbar,
  },
  {
    path: "activity",
    component: Activities,
  },
  {
    path: "activityList",
    component: ActivityList,
  },
  {
    path: "users",
    component: Users,
  },
  {
    path: "categories",
    component: Category,
  },
];
