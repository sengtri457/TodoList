import { Component, OnInit } from "@angular/core";
import { Apiservices } from "../../services/apiservices";
import Swal from "sweetalert2";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-logs",
  imports: [CommonModule, FormsModule],
  templateUrl: "./logs.html",
  styleUrl: "./logs.css",
})
export class Logs implements OnInit {
  constructor(private api: Apiservices) {}

  logs: any[] = [];
  form: any = null;

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs() {
    this.api.getTodos("/logs").subscribe({
      next: (res: any) => {
        this.logs = res;
      },
      error: (err: any) => {
        Swal.fire("Error loading logs");
      },
    });
  }

  open() {
    this.form = {
      mood: "",
      topWins: "",
      notes: "",
      totalScore: 0,
    };
  }
  cancel() {
    this.form = null;
  }

  edit(data: any) {
    this.form = { ...data };
  }
  addLogs(event: any) {
    event.preventDefault();
    if (this.form._id) {
      this.api.updateUser(`/logs/${this.form._id}`, this.form).subscribe({
        next: (res: any) => {
          Swal.fire("Logs updated successfully");
          this.loadLogs();
        },
        error: (err: any) => {
          Swal.fire("Error updating log");
        },
        complete: () => {
          Swal.fire("Log updated successfully");
        },
      });
    } else {
      this.api.createTodo("/logs", this.form).subscribe({
        next: (res: any) => {
          Swal.fire("Log added successfully");
          this.loadLogs();
        },
        error: (err: any) => {
          Swal.fire("Error adding log");
        },
        complete: () => {
          Swal.fire("Log added successfully");
        },
      });
    }
  }

  deletedLogs(id: any) {
    this.api.deleteTodos(`/logs/${id}`).subscribe({
      next: (res: any) => {
        Swal.fire("Log deleted successfully");
        this.loadLogs();
      },
      error: (err: any) => {
        Swal.fire("Error deleting log");
      },
      complete: () => {
        Swal.fire("Log deleted successfully");
      },
    });
  }
}
