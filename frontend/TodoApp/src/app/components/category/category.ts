import { Component, OnInit } from "@angular/core";
import { Apiservices } from "../../services/apiservices";
import { CategoryId } from "../../models/typeModels";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import Swal from "sweetalert2";
@Component({
  selector: "app-category",
  imports: [FormsModule, CommonModule],
  templateUrl: "./category.html",
  styleUrl: "./category.css",
})
export class Category implements OnInit {
  categoryList: CategoryId[] = [];
  newCategory: CategoryId = {
    _id: "",
    name: "",
    description: "",
    color: "",
    createdAt: "2022-09-09",
  };
  constructor(private api: Apiservices) {}
  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList() {
    this.api.getTodos("/categories").subscribe({
      next: (res: any) => {
        this.categoryList = res;
        console.log("Data received:", res);
      },
      error: (err: any) => {
        console.error("Error fetching categories:", err);
      },
    });
  }

  addCategory() {
    if (!this.newCategory) {
      return;
    }

    if (this.newCategory._id) {
      this.api
        .updateUser("/categories/" + this.newCategory._id, this.newCategory)
        .subscribe({
          next: (res) => {
            this.getCategoryList();
            Swal.fire("Update Category Successfully");

            this.resetCategory();
          },
          error: (err) => {
            console.error("Error updating category:", err);
          },
        });
    } else {
      this.api.createTodo("/categories", this.newCategory).subscribe({
        next: (res) => {
          Swal.fire("Create Category Successfully");

          this.getCategoryList();
        },
        error: (err) => {
          console.error("Error creating category:", err);
        },
      });
    }
  }

  deleteCategory(id: string) {
    this.api.deleteTodos("/categories/" + id).subscribe({
      next: (res: any) => {
        this.getCategoryList();
      },
      error: (err: any) => {
        console.error("Error deleting category:", err);
      },
    });
  }

  editeCategory(data: any) {
    this.newCategory = data;
  }
  resetCategory() {
    this.newCategory = {
      _id: "",
      name: "",
      description: "",
      color: "",
      createdAt: "2022-09-09",
    };
  }
}
