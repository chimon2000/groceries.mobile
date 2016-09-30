import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { AppComponent } from "./app.component";
import { AppRoutes } from './app.routes';
import { GroceriesModule } from './groceries';
import { LoginModule } from './login';
import { StateAndDispatcher } from './app.state'   

@NgModule({
  imports: [
    CommonModule,
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(AppRoutes),
    GroceriesModule,
    LoginModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    StateAndDispatcher
  ]
})
export class AppModule { }
