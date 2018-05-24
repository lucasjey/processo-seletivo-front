//ANGULAR
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

// NGX
import { BsDropdownModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';

// ERROR HANDLER
import { HttpInterceptor } from './httpInterceptor';
import { CustomErrorHandler } from "./customErrorHandler"

// APP
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.router';


//SHARED
import { SharedModule } from "./shared/shared.module";

import { CommonModule } from '@angular/common';
import { SidebarComponent } from './_layout/sidebar/sidebar.component';
import { NavbarComponent } from './_layout/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      onActivateTick: true,
    }),
    ModalModule.forRoot(),
    SharedModule,
    HttpModule,
    RouterModule

  ],
  providers: [
    HttpInterceptor,
    [{
      provide: ErrorHandler,
      useClass: CustomErrorHandler
    }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
