import { NgModule } from '@angular/core';
import { NativeScriptModule } from "nativescript-angular/platform";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { LoginComponent }   from './login.component';
import { LoginRoutes } from './login.routes';

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        LoginRoutes
    ],
    exports: [],
    declarations: [LoginComponent],
    providers: [],
})
export class LoginModule { }
