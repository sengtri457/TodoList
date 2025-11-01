import { Routes } from "@angular/router";
import { Categories } from "./components/categories/categories";
import { LoginComponent } from "./auth/login-component/login-component";
import { Register } from "./auth/register/register";

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "category",
    component: Categories,
  },
  {
    path: "register",
    component: Register,
  },
];
