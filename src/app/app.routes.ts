import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ModuleWithProviders } from "@angular/compiler/src/core";
import { CicloPagamentoComponent } from "./components/ciclo-pagamento/ciclo-pagamento.component";

export const ROUTES: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'ciclo-pagamento', component: CicloPagamentoComponent}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);