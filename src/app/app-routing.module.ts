import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './pages/guard.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule )
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule ),
    canLoad     : [ GuardGuard ],
    canActivate : [ GuardGuard ]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module')  .then( m => m.UserModule  )
  },
  {
    path: '**',
    redirectTo: 'home'  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
