import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { provideCharts } from "ng2-charts";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  protected title = "TodoApp";
}
