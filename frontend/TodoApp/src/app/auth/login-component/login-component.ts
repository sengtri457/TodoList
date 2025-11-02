import { Component } from "@angular/core";
import { Apiservices } from "../../services/apiservices";
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-login-component",
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./login-component.html",
  styleUrl: "./login-component.css",
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  message: string = "";
  constructor(
    private api: Apiservices,
    private router: Router,
  ) {}

  login() {
    if (!this.email) {
      this.message = "Please enter your email";
      return;
    }
    this.api.logUser({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.message = res.message;
        localStorage.setItem("token", res.token);
        alert("Login Successful");
        console.log("Token:", res.token);
        this.router.navigateByUrl("/dashboard");
      },
      error: (err) => {
        this.message = err.error.message;
      },
      complete: () => {
        console.log("completed");
      },
    });
  }
}
