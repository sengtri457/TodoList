import { Component, OnInit } from '@angular/core';
import { Apiservices } from '../../services/apiservices';
import { CategoryId } from '../../models/typeModels';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Navbar } from '../navbar/navbar';
@Component({
  selector: 'app-category',
  imports: [FormsModule, CommonModule, Navbar],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit {
  categoryList: any[] = [];
  formCategory: any = null;
  categoryall: any[] = [];
  searchTerm: string = '';
  sortOrder: string = 'asc'; // ✅ Default sorting A–Z
  // newCategory: CategoryId = {
  //   _id: "",
  //   name: "",
  //   description: "",
  //   color: "",
  //   createdAt: "2022-09-09",
  // };
  constructor(private api: Apiservices) {}
  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList() {
    this.api.getTodos('/categories').subscribe({
      next: (res: any) => {
        this.categoryList = res;
        console.log('Data received:', res);
      },
      error: (err: any) => {
        console.error('Error fetching categories:', err);
      },
    });
  }
  openForm() {
    this.formCategory = {
      name: '',
      description: '',
      color: '',
    };
  }
  cancelForm() {
    this.formCategory = null;
  }
  editeCategory(DataCategory: any) {
    this.formCategory = { ...DataCategory };
  }

  addCategory(event: any) {
    event.preventDefault();

    if (this.formCategory._id) {
      this.api
        .updateUser(`/categories/${this.formCategory._id}`, this.formCategory)
        .subscribe({
          next: (res: any) => {
            this.getCategoryList();
            this.formCategory = null;
          },
          error: (error: any) => {
            console.error('Error updating category:', error);
          },
          complete: () => {
            console.log('Category updated successfully');
          },
        });
    } else {
      this.api.createTodo('/categories', this.formCategory).subscribe({
        next: (res: any) => {
          this.getCategoryList();
          this.formCategory = null;
        },
        error: (error: any) => {
          console.error('Error creating category:', error);
        },
        complete: () => {
          console.log('Category created successfully');
        },
      });
    }
  }
  deletedCategory(id: string) {
    this.api.deleteTodos(`/categories/${id}`).subscribe({
      next: (res: any) => {
        this.getCategoryList();
        alert('Category deleted successfully');
      },
      error: (error: any) => {
        console.error('Error deleting category:', error);
      },
      complete: () => {
        console.log('Category deleted successfully');
      },
    });
  }
  onSearchChange() {
    if (this.searchTerm === '') {
      this.getCategoryList();
    } else {
      this.api.searchcategory(this.searchTerm).subscribe({
        next: (res: any) => {
          this.categoryList = res;
          console.log(this.categoryList);
        },
        error: (error: any) => {
          console.error('Error searching category:', error);
        },
        complete: () => {
          console.log('Category searched successfully');
        },
      });
    }
  }
  onSortChange() {
    this.sortCategory();
  }
  sortCategory() {
    if (this.sortOrder == 'asc') {
      this.categoryList.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.categoryList.sort((a, b) => b.name.localeCompare(a.name));
    }
  }
}
