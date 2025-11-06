import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { provideCharts } from "ng2-charts";
import { Apiservices } from "./services/apiservices";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  protected title = "TodoApp";
  constructor(public api: Apiservices) {}
}
