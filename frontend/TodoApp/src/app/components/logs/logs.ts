import { Component, OnInit } from '@angular/core';
import { Apiservices } from '../../services/apiservices';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { log } from 'node:console';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-logs',
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './logs.html',
  styleUrl: './logs.css',
})
export class Logs implements OnInit {
  constructor(private api: Apiservices) {}

  logs: any[] = [];
  form: any = null;
  userall: any[] = [];
  searchTerm: string = '';
  sortOrder: string = 'all'; // ✅ Default sorting A–Z

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs() {
    this.api.getTodos('/logs').subscribe({
      next: (res: any) => {
        this.logs = res;
        this.calculateTotalscore();
      },
      error: (err: any) => {
        Swal.fire('Error loading logs');
      },
    });
  }

  open() {
    this.form = {
      mood: '',
      topWins: '',
      notes: '',
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
          Swal.fire('Logs updated successfully');
          this.loadLogs();
        },
        error: (err: any) => {
          Swal.fire('Error updating log');
        },
        complete: () => {
          Swal.fire('Log updated successfully');
        },
      });
    } else {
      this.api.createTodo('/logs', this.form).subscribe({
        next: (res: any) => {
          Swal.fire('Log added successfully');
          this.loadLogs();
        },
        error: (err: any) => {
          Swal.fire('Error adding log');
        },
        complete: () => {
          Swal.fire('Log added successfully');
        },
      });
    }
  }

  deletedLogs(id: any) {
    this.api.deleteTodos(`/logs/${id}`).subscribe({
      next: (res: any) => {
        Swal.fire('Log deleted successfully');
        this.loadLogs();
      },
      error: (err: any) => {
        Swal.fire('Error deleting log');
      },
      complete: () => {
        Swal.fire('Log deleted successfully');
      },
    });
  }

  onSearchChange() {
    if (this.searchTerm.length < 10) {
      if (this.searchTerm === '') {
        this.loadLogs();
      } else {
        this.api.searchDailyLogs(this.searchTerm).subscribe({
          next: (res: any) => {
            this.logs = res;
            console.log(this.logs);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    } else {
      Swal.fire('too much Search');
      this.searchTerm = '';
      this.loadLogs();
    }
  }
  onSortScore() {
    this.sortTotalscore();
  }
  sortTotalscore() {
    this.api.getTodos(`/logs/sort?totalScore=${this.sortOrder}`).subscribe({
      next: (res: any) => {
        this.logs = res;
        console.log(this.logs);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  pricelist: Array<{ totalScore: number }> = this.logs;
  calculateTotalscore() {
    if (!this.logs || this.logs.length === 0) {
      return 0;
    }

    const total = this.logs.reduce((sum, item) => {
      return sum + (item.totalScore || 0);
    }, 0);

    console.log('Total Score:', total);
    return total;
  }
}
