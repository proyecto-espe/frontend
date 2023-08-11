import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ReactiveFormsModule } from '@angular/forms';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { PreInscriptionComponent } from './components/pre-inscription/pre-inscription.component';
import { DashbooardAdminComponent } from './components/dashbooard-admin/dashbooard-admin.component';
import { VoucherComponent } from './components/voucher/voucher.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    DashboardComponent,
    InscriptionComponent,
    PreInscriptionComponent,
    DashbooardAdminComponent,
    VoucherComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxCaptchaModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
