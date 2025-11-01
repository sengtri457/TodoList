import { Component } from "@angular/core";
import { Apiservices } from "../../services/apiservices";
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-register",
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./register.html",
  styleUrl: "./register.css",
})
export class Register {
  email: string = "";
  password: string = "";
  message: string = "";
  username: string = "";
  constructor(
    private api: Apiservices,
    private router: Router,
  ) {}

  register() {
    this.api
      .registerUser({
        email: this.email,
        password: this.password,
        username: this.username,
      })
      .subscribe({
        next: (response: any) => {
          this.message = response.message;
          this.router.navigate(["/"]);
        },
        error: (error: any) => {
          this.message = error.error.message;
        },
        complete: () => {
          console.log("Registration completed");
        },
      });
  }
}
