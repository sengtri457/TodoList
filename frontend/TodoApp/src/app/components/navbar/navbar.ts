import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Apiservices } from "../../services/apiservices";

@Component({
  selector: "app-navbar",
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: "./navbar.html",
  styleUrl: "./navbar.css",
})
export class Navbar {
  isActive = true;
  isdark = true;
  isAc = "My Socail";
  clickNav() {
    this.isActive = !this.isActive;
    if (!this.isActive) {
      this.isAc = "Back";
    } else {
      this.isAc = "My Socail";
    }
  }
  isActives = false;

  toggleNav() {
    this.isActives = !this.isActives;
  }

  constructor(public api: Apiservices) {}
}
