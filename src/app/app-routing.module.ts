import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { UserComponent } from './users/user/user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard.service';

//Configuring routes for application
const applicationRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [{ path: ':userId/:userName', component: UserComponent }],
  },
  {
    path: 'servers',
    component: ServersComponent,
    canActivate: [AuthGuard],
    children: [
      { path: ':serverId', component: ServerComponent },
      { path: ':id/edit', component: EditServerComponent },
    ],
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(applicationRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
