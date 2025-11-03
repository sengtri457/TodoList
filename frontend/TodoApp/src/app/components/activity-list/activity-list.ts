import { Component, OnInit } from "@angular/core";
import { Apiservices } from "../../services/apiservices";
import { Root } from "../../models/typeModels";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-activity-list",
  imports: [FormsModule, CommonModule],
  templateUrl: "./activity-list.html",
  styleUrl: "./activity-list.css",
})
export class ActivityList implements OnInit {
  activitiesList: Root[] = [];
  constructor(private api: Apiservices) {}

  ngOnInit(): void {
    this.getActivities();
  }

  getActivities() {
    this.api.getTodos("/activities").subscribe({
      next: (res: any) => {
        this.activitiesList = res;
        console.log("Data ", this.activitiesList);
      },
      error: (err) => {
        console.log("Error ", err);
      },
    });
  }
}
