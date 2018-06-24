import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ModuleWithProviders } from "@angular/compiler/src/core";

export const ROUTES: Routes = [
  {path: '', component: DashboardComponent}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);