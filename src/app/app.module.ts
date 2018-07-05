import { ClienteService } from './services/cliente.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { routes } from './app.routes';
import { DashboardService } from './services/dashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { CicloPagamentoComponent } from './components/ciclo-pagamento/ciclo-pagamento.component';
import { FormsModule } from '@angular/forms';
import { CicloPagamentoService } from './services/ciclo-pagamento.service';
import { CicloPagamentoListaComponent } from './components/ciclo-pagamento-lista/ciclo-pagamento-lista.component';
import { ClienteComponent } from './components/cliente/cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    DashboardComponent,
    CicloPagamentoComponent,
    CicloPagamentoListaComponent,
    ClienteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes
  ],
  providers: [DashboardService,CicloPagamentoService,ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
