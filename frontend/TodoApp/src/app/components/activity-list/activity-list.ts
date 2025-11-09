import { Component, OnInit } from "@angular/core";
import { Apiservices } from "../../services/apiservices";
import { Root } from "../../models/typeModels";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Chart, ChartConfiguration, registerables } from "chart.js";
import { Navbar } from "../navbar/navbar";
@Component({
  selector: "app-activity-list",
  imports: [FormsModule, CommonModule, Navbar],
  templateUrl: "./activity-list.html",
  styleUrl: "./activity-list.css",
})
export class ActivityList implements OnInit {
  activitiesList: Root[] = [];
  totalActivities = 0;
  totalDuration = 0;
  averageRating = 0;
  highEnergyCount = 0;
  searchTerm = "";
  constructor(private api: Apiservices) {}
  opened: boolean[] = [];

  toggle(index: number) {
    this.opened[index] = !this.opened[index];
  }

  ngOnInit(): void {
    this.getActivities();
  }

  onSearchChange() {
    if (this.searchTerm === "") {
      this.getActivities();
    }
    this.api.serachActivitiesByTitle(this.searchTerm).subscribe({
      next: (res: any) => {
        this.activitiesList = res;
        this.calculateStats();
        this.initializeCharts();
      },
      error: (err) => {
        console.log("Error ", err);
      },
      complete: () => {
        console.log("Completed");
      },
    });
  }

  getActivities() {
    this.api.getTodos("/activities").subscribe({
      next: (res: any) => {
        this.activitiesList = res;
        console.log("Data ", this.activitiesList);
        this.calculateStats();
        this.initializeCharts();
      },
      error: (err) => {
        console.log("Error ", err);
      },
    });
  }
  calculateStats() {
    this.totalActivities = this.activitiesList.length;
    this.totalDuration = Math.round(
      this.activitiesList.reduce((sum, act) => sum + act.duration, 0) / 60,
    );
    this.averageRating = parseFloat(
      (
        this.activitiesList.reduce((sum, act) => sum + act.rating, 0) /
        this.activitiesList.length
      ).toFixed(1),
    );
    this.highEnergyCount = this.activitiesList.filter(
      (act) => act.energy.toLowerCase() === "high",
    ).length;
  }

  initializeCharts() {
    setTimeout(() => {
      this.createDurationChart();
      this.createEnergyChart();
      this.createRatingChart();
      this.createMoodScoreChart();
    }, 100);
  }

  createDurationChart() {
    const ctx = document.getElementById("durationChart") as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: this.activitiesList.map((a) => a.title),
        datasets: [
          {
            label: "Duration (minutes)",
            data: this.activitiesList.map((a) => a.duration),
            backgroundColor: "rgba(74, 95, 217, 0.7)",
            borderColor: "rgba(74, 95, 217, 1)",
            borderWidth: 2,
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "#a8aab7" },
            grid: { color: "#2a2f4a" },
          },
          x: {
            ticks: { color: "#a8aab7" },
            grid: { display: false },
          },
        },
      },
    });
  }

  createEnergyChart() {
    const ctx = document.getElementById("energyChart") as HTMLCanvasElement;
    if (!ctx) return;

    const energyCounts = this.activitiesList.reduce(
      (acc, act) => {
        acc[act.energy] = (acc[act.energy] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: Object.keys(energyCounts),
        datasets: [
          {
            data: Object.values(energyCounts),
            backgroundColor: [
              "rgba(16, 185, 129, 0.8)",
              "rgba(245, 158, 11, 0.8)",
              "rgba(239, 68, 68, 0.8)",
            ],
            borderColor: "#1a1f3a",
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: { color: "#a8aab7", padding: 15 },
          },
        },
      },
    });
  }

  createRatingChart() {
    const ctx = document.getElementById("ratingChart") as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: "line",
      data: {
        labels: this.activitiesList.map((_, i) => `Activity ${i + 1}`),
        datasets: [
          {
            label: "Rating",
            data: this.activitiesList.map((a) => a.rating),
            borderColor: "rgba(251, 191, 36, 1)",
            backgroundColor: "rgba(251, 191, 36, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "rgba(251, 191, 36, 1)",
            pointBorderColor: "#1a1f3a",
            pointBorderWidth: 2,
            pointRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 10,
            ticks: { color: "#a8aab7" },
            grid: { color: "#2a2f4a" },
          },
          x: {
            ticks: { color: "#a8aab7" },
            grid: { display: false },
          },
        },
      },
    });
  }

  createMoodScoreChart() {
    const ctx = document.getElementById("moodScoreChart") as HTMLCanvasElement;
    if (!ctx) return;

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: this.activitiesList.map((a) => a.dailyLogId.mood),
        datasets: [
          {
            label: "Total Score",
            data: this.activitiesList.map((a) => a.dailyLogId.totalScore),
            backgroundColor: "rgba(14, 165, 233, 0.7)",
            borderColor: "rgba(14, 165, 233, 1)",
            borderWidth: 2,
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "#a8aab7" },
            grid: { color: "#2a2f4a" },
          },
          x: {
            ticks: { color: "#a8aab7" },
            grid: { display: false },
          },
        },
      },
    });
  }

  getEnergyClass(energy: string): string {
    const energyLower = energy.toLowerCase();
    if (energyLower === "high") return "energy-high";
    if (energyLower === "medium") return "energy-medium";
    return "energy-low";
  }
}
