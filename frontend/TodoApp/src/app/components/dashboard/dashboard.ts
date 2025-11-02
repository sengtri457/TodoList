import { Component, OnInit } from "@angular/core";
import { Apiservices } from "../../services/apiservices";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ChartConfiguration } from "chart.js";
import { BaseChartDirective } from "ng2-charts"; // Add this
@Component({
  selector: "app-dashboard",
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: "./dashboard.html",
  styleUrl: "./dashboard.css",
})
export class Dashboard implements OnInit {
  categories: any[] = [];
  activities: any[] = [];
  // Chart data
  categoryLabels: string[] = [];
  avgRatings: number[] = [];
  durations: number[] = [];

  barChartOptions: ChartConfiguration<"bar">["options"] = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: "Average Rating by Category" },
    },
  };

  barChartData: ChartConfiguration<"bar">["data"] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: "Average Rating",
        backgroundColor: "#4CAF50",
      },
    ],
  };

  pieChartOptions: ChartConfiguration<"pie">["options"] = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Activity Duration Share (%)" },
    },
  };

  pieChartData: ChartConfiguration<"pie">["data"] = {
    labels: [
      { label: "Category 1" },
      { label: "Category 2" },
      { label: "Category 3" },
      { label: "Category 4" },
      { label: "Category 5" },
    ],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#4CAF50",
          "#2196F3",
          "#FF9800",
          "#9C27B0",
          "#F44336",
        ],
      },
    ],
  };
  constructor(private api: Apiservices) {}

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.api.getTodos("/activities").subscribe({
      next: (res: any) => {
        this.activities = res;
        this.checkAndPrepareCharts(); // Add this
      },
      error: (err: any) => {
        console.error("Error fetching activities:", err);
      },
    });
    this.api.getTodos("/categories").subscribe({
      next: (res: any) => {
        this.categories = res;
        this.checkAndPrepareCharts(); // Add this
      },
      error: (err: any) => {
        console.error("Error fetching categories:", err);
      },
    });
  }

  // Add this helper method
  checkAndPrepareCharts() {
    if (this.activities.length > 0 && this.categories.length > 0) {
      this.prepareCharts();
    }
  }
  prepareCharts() {
    const categoryMap: any = {};
    this.activities.forEach((item) => {
      const category = item.categoryId?.name || "Unknown";
      if (!categoryMap[category]) {
        categoryMap[category] = { totalRating: 0, count: 0, totalDuration: 0 };
      }
      categoryMap[category].totalRating += item.rating;
      categoryMap[category].count++;
      categoryMap[category].totalDuration += item.duration;
    });

    this.categoryLabels = Object.keys(categoryMap);
    this.avgRatings = this.categoryLabels.map(
      (cat) => categoryMap[cat].totalRating / categoryMap[cat].count,
    );
    this.durations = this.categoryLabels.map(
      (cat) => categoryMap[cat].totalDuration,
    );

    // Update bar chart with gradient colors
    this.barChartData = {
      labels: this.categoryLabels,
      datasets: [
        {
          data: this.avgRatings,
          label: "Average Rating",
          backgroundColor: [
            "rgba(102, 126, 234, 0.8)",
            "rgba(118, 75, 162, 0.8)",
            "rgba(237, 100, 166, 0.8)",
            "rgba(255, 154, 158, 0.8)",
            "rgba(250, 208, 196, 0.8)",
          ],
          borderColor: [
            "rgba(102, 126, 234, 1)",
            "rgba(118, 75, 162, 1)",
            "rgba(237, 100, 166, 1)",
            "rgba(255, 154, 158, 1)",
            "rgba(250, 208, 196, 1)",
          ],
          borderWidth: 2,
          borderRadius: 8,
          hoverBackgroundColor: [
            "rgba(102, 126, 234, 1)",
            "rgba(118, 75, 162, 1)",
            "rgba(237, 100, 166, 1)",
            "rgba(255, 154, 158, 1)",
            "rgba(250, 208, 196, 1)",
          ],
        },
      ],
    };

    // Update pie chart with vibrant colors
    this.pieChartData = {
      labels: this.categoryLabels,
      datasets: [
        {
          data: this.durations,
          label: "Total Duration",

          backgroundColor: [
            "rgba(102, 126, 234, 0.9)",
            "rgba(118, 75, 162, 0.9)",
            "rgba(237, 100, 166, 0.9)",
            "rgba(255, 154, 158, 0.9)",
            "rgba(250, 208, 196, 0.9)",
            "rgba(79, 172, 254, 0.9)",
            "rgba(0, 242, 254, 0.9)",
            "rgba(253, 203, 110, 0.9)",
          ],
          borderColor: "#ffffff",
          borderWidth: 3,
          hoverBorderColor: "#ffffff",
          hoverBorderWidth: 4,
          hoverOffset: 15,
        },
      ],
    };
  }
}
