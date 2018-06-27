import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ModuleWithProviders } from "@angular/compiler/src/core";
import { CicloPagamentoComponent } from "./components/ciclo-pagamento/ciclo-pagamento.component";
import { CicloPagamentoListaComponent } from "./components/ciclo-pagamento-lista/ciclo-pagamento-lista.component";

export const ROUTES: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'ciclo-pagamento', component: CicloPagamentoComponent},
  {path: 'ciclo-pagamento/:id', component: CicloPagamentoComponent},
  {path: 'ciclo-pagamento-lista', component: CicloPagamentoListaComponent}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);