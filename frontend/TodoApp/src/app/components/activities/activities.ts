import { Component, OnInit } from "@angular/core";
import { Apiservices } from "../../services/apiservices";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import Swal from "sweetalert2";
import { ActivityList } from "../activity-list/activity-list";
import { Navbar } from "../navbar/navbar";
import { Router } from "@angular/router";
@Component({
  selector: "app-activities",
  imports: [CommonModule, FormsModule, ActivityList, Navbar],
  templateUrl: "./activities.html",
  styleUrl: "./activities.css",
})
export class Activities implements OnInit {
  step = 1;
  users: any[] = [];
  categories: any[] = [];

  selectedUser: any;
  selectedCategory: any;
  activitesData: any[] = [];
  createdDailyLog: any;
  createdActivity: any;

  // form data for Daily Log
  dailyLogForm = {
    mood: "",
    topWins: "",
    notes: "",
    totalScore: 0,
  };

  // form data for Activity
  activityForm = {
    title: "",
    startTime: "",
    endTime: "",
    duration: 0,
    energy: "",
    rating: 0,
    note: "",
  };

  constructor(
    private api: Apiservices,
    private router: Router,
  ) {}
  isLoading = true;

  ngOnInit() {
    this.loadUsers();
    // Simulate loading data for 1 second
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  loadUsers() {
    this.api.getTodos("/users").subscribe((res) => (this.users = res));
  }

  nextStep() {
    // Step 1: Choose User → Categories
    if (this.step === 1 && this.selectedUser) {
      this.api.getTodos("/categories").subscribe((res) => {
        this.categories = res;
        this.step++;
      });
    } else if (this.step === 1 && !this.selectedUser) {
      Swal.fire("Please select a user");
      return;
    }

    // Step 2: Choose Category → Daily Log Form
    else if (this.step === 2 && this.selectedCategory) {
      this.step++;
    } else if (this.step === 2 && !this.selectedCategory) {
      Swal.fire("Please select a category");
      return;
    }

    // Step 3: Create Daily Log
    else if (this.step === 3) {
      if (
        !this.dailyLogForm.mood ||
        this.dailyLogForm.totalScore < 0 ||
        this.dailyLogForm.totalScore > 10
      ) {
        Swal.fire("Please fill valid daily log information");
        return;
      }
      const payload = {
        userId: this.selectedUser._id,
        date: new Date(),
        mood: this.dailyLogForm.mood,
        topWins: this.dailyLogForm.topWins.split(",").map((i) => i.trim()),
        notes: this.dailyLogForm.notes,
        totalScore: this.dailyLogForm.totalScore,
      };

      this.api.createTodo("/logs", payload).subscribe({
        next: (res) => {
          this.createdDailyLog = res.dailyLog || res;
          console.log("Created DailyLog:", this.createdDailyLog);
          this.step++;
        },
        error: (err) => {
          console.error("Error creating DailyLog:", err);
          Swal.fire("fail to create daily log");
        },
      });
    }

    // Step 4: Create Activity
    else if (this.step === 4) {
      if (
        !this.activityForm.title ||
        !this.activityForm.duration ||
        this.activityForm.duration <= 0 ||
        !this.activityForm.rating ||
        this.activityForm.rating < 1 ||
        this.activityForm.rating > 10 ||
        this.activityTimeInvalid
      ) {
        Swal.fire("Please fill valid information");

        return;
      }
      const payload = {
        dailyLogId: this.createdDailyLog._id,
        categoryId: this.selectedCategory._id,
        title: this.activityForm.title,
        startTime: this.activityForm.startTime,
        endTime: this.activityForm.endTime,
        duration: this.activityForm.duration,
        energy: this.activityForm.energy,
        rating: this.activityForm.rating,
        note: this.activityForm.note,
      };

      this.api.createTodo("/activities", payload).subscribe({
        next: (res) => {
          console.log("Created Activity:", this.createdActivity);
          this.alertOrder();
          setTimeout(() => {
            this.createdActivity = res.activity || res;
            this.router.navigateByUrl("/activityList");
          }, 2000);
          this.step++;
          setTimeout(() => {
            this.resetProcess();
          }, 3000);
        },
        error: (err) => {
          console.error("Error creating Activity:", err);
          alert("Failed to create activity.");
        },
      });
    }
  }

  prevStep() {
    if (this.step > 1) this.step--;
  }

  resetProcess() {
    this.step = 1;
    this.selectedUser = null;
    this.selectedCategory = null;
    this.createdDailyLog = null;
    this.createdActivity = null;
    this.dailyLogForm = {
      mood: "",
      topWins: "",
      notes: "",
      totalScore: 0,
    };
    this.activityForm = {
      title: "",
      startTime: "",
      endTime: "",
      duration: 0,
      energy: "",
      rating: 0,
      note: "",
    };
    // this.activityForm = {};
  }
  alertOrder() {
    let timerInterval: any;

    Swal.fire({
      title: "Activites Created!",
      html: "please Wait in <b></b> milliseconds.",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timerEl = Swal.getPopup()?.querySelector("b");
        timerInterval = setInterval(() => {
          if (timerEl) {
            timerEl.textContent = `${Swal.getTimerLeft()}`;
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("✅ Closed by the timer");
      }
    });
  }
  steps = [
    { id: 1, label: "User", icon: "bi bi-person" },
    { id: 2, label: "Category", icon: "bi bi-tags" },
    { id: 3, label: "Daily Log", icon: "bi bi-journal-text" },
    { id: 4, label: "Activity", icon: "bi bi-lightning-charge" },
    { id: 5, label: "Result", icon: "bi bi-check-circle" },
  ];
  get activityTimeInvalid(): boolean {
    if (!this.activityForm.startTime || !this.activityForm.endTime)
      return false;
    return this.activityForm.endTime <= this.activityForm.startTime;
  }
}
