import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [{
  path:'',
  children: [
    { path: 'main'    , component: MainComponent      },
    { path: 'login'   , component: LoginComponent     },
    { path: 'register', component: RegisterComponent  },
    { path: '**'      , redirectTo: 'main'            }
  ]}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
