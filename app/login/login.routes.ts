import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";

const LOGIN_ROUTES: Routes = [
    { path: "login", component: LoginComponent },
];
export const LoginRoutes: ModuleWithProviders = RouterModule.forChild(LOGIN_ROUTES)