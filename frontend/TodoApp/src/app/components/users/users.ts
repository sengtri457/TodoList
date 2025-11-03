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
  usersList: UserModels[] = [];
  newUser: UserModels = {
    _id: "",
    username: "",
    email: "",
    password: "",
  };

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
  addUser() {
    if (!this.newUser) {
      return;
    }
    if (this.newUser._id) {
      this.api
        .updateUser(`/users/${this.newUser._id}`, this.newUser)
        .subscribe({
          next: (res) => {
            this.usersList = this.usersList.map((user) => {
              if (user._id === this.newUser._id) {
                return res;
              }
              return user;
            });
            this.newUser = {
              _id: "",
              username: "",
              email: "",
              password: "",
            };
          },
          error: (err) => {
            console.log("Error updating user: " + err);
          },
        });
    } else {
      this.api.createTodo("/users", this.newUser).subscribe({
        next: (res) => {
          this.usersList.push(res);
          this.newUser = {
            _id: "",
            username: "",
            email: "",
            password: "",
          };
        },
        error: (err) => {
          console.log("Error adding user: " + err);
        },
      });
    }
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
    this.newUser = order;
  }
}
