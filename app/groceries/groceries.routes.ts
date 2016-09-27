import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GroceriesComponent } from './groceries.component';

export const GROCERIES_ROUTES = [
    {
        path: 'groceries', component: GroceriesComponent
    }
]

export const GroceriesRoutes: ModuleWithProviders = RouterModule.forChild(GROCERIES_ROUTES)