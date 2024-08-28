import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthguardGuard } from "./services/authguard.guard";
import { UpgradeComponent } from './pages/upgrade/upgrade.component';
import { VerificationComponent } from './verification/verification.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'upgrade',
    pathMatch: 'full',
  },
  { path: 'upgrade', component: UpgradeComponent },
  { path: 'verification', component: VerificationComponent },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthguardGuard],
    children: [
        {
      path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule),
       
      
      }],
   
},
  {
    path: '**',
    redirectTo: 'upgrade'
  }
]
