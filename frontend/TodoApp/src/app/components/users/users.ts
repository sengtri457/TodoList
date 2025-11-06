import { Component, OnInit } from "@angular/core";
import { Apiservices } from "../../services/apiservices";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UserModels } from "../../models/typeModels";

@Component({
  selector: "app-users",
  imports: [CommonModule, FormsModule],
  templateUrl: "./users.html",
  styleUrl: "./users.css",
})
export class Users implements OnInit {
  usersList: any[] = [];
  newUser: UserModels = {
    username: "",
    email: "",
    password: "",
  };
  form: any = null;

  constructor(private api: Apiservices) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.api.getTodos("/users").subscribe({
      next: (res) => {
        this.usersList = res;
      },
      error: (err) => {
        console.log("Error fetching users: " + err);
      },
    });
  }
  openNew() {
    this.form = {
      username: "",
      email: "",
      password: "",
    };
  }
  addUser(event: any) {
    event.preventDefault();
    if (!this.newUser) {
      return;
    }
    if (this.form._id) {
      this.api.updateUser(`/users/${this.form._id}`, this.form).subscribe({
        next: (res) => {
          this.getUser();
          this.form = null;
        },
        error: (err) => {
          console.log("Error updating user: " + err);
        },
      });
    }
    this.api.createTodo("/users", this.form).subscribe({
      next: (res) => {
        this.form = null;
        this.getUser();
      },
      error: (err) => {
        console.log("Error adding user: " + err);
      },
    });
  }
  deleteUser(id: string) {
    this.api.deleteTodos(`/users/${id}`).subscribe({
      next: (res: any) => {
        this.usersList = this.usersList.filter((user: any) => user._id !== id);
      },
      error: (err) => {
        console.log("Error deleting user: " + err);
      },
    });
  }
  editUser(order: any) {
    this.form = { ...order };
  }
  cancel() {
    this.form = null;
  }
}
