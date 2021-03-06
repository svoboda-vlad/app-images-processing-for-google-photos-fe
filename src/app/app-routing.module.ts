import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/auth.guard';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'google-login',
    loadChildren: () => import('./google-login/google-login.module').then(m => m.GoogleLoginModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    data: {
      role: environment.ADMIN_USERNAME
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'parameters',
    loadChildren: () => import('./parameters/parameters.module').then(m => m.ParametersModule)
  },
  {
    path: 'images-processing',
    loadChildren: () => import('./images-processing/images-processing.module').then(m => m.ImagesProcessingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
