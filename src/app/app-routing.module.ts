import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { PreInscriptionComponent } from './components/pre-inscription/pre-inscription.component';
import { DashbooardAdminComponent } from './components/dashbooard-admin/dashbooard-admin.component';
import { VoucherComponent } from './components/voucher/voucher.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: "register",
        component: RegisterComponent
      },
      {
        path: "pre-inscription",
        component: PreInscriptionComponent
      },
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "inscription",
        component: InscriptionComponent
      }
      ,
      {
        path: "voucher/:cedula",
        component: VoucherComponent
      }
    ]
  },
  {
    path: "dashboard-admin",
    component: DashbooardAdminComponent,
    children: [
      {
        path: "",
        redirectTo: "pre-inscription",
        pathMatch: "full"
      },
      {
        path: "pre-inscription",
        component: PreInscriptionComponent,
        pathMatch: "full"
      },
      {
        path: "inscription",
        component: InscriptionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
