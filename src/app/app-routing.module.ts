import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AddUserComponent } from './add-user/add-user.component';

import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

import { DemandeComponent } from './demande/demande.component';
import { EchangeComponent } from './echange/echange.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ProfiledonsComponent } from './profiledons/profiledons.component';
import { DonsComponent } from './dons/dons.component';
import { DetailleComponent } from './detaille/detaille.component';
import { AuthGuard } from './app.guard';

const routes: Routes = [ 
  { path: 'login', component: LoginComponent },
  { path: 'Dons', component: DonsComponent

   },

  { path: 'Detaille', component: DetailleComponent ,  canActivate: [AuthGuard],
},
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'Profiledons', component: ProfiledonsComponent,  canActivate: [AuthGuard],
},
  { path: 'echange', component: EchangeComponent ,  canActivate: [AuthGuard],
},
  { path: 'home', component: HomeComponent,
  canActivate: [AuthGuard],

   }, // Correction de la route pour échange
  { path: 'profile', component: ProfileComponent ,  canActivate: [AuthGuard],
}, // Correction de la route pour profil
  { path: 'register', component: RegisterComponent },
  { path: 'demande', component: DemandeComponent ,  canActivate: [AuthGuard],
}, // Correction de la route pour demande
  { path: 'users', component: UsersComponent,  canActivate: [AuthGuard],
},
  { path: '', component: MenuComponent ,
},
  { path: 'adduser', component: AddUserComponent ,  canActivate: [AuthGuard],
},
  { path: 'confirmation-dialog', component: ConfirmationDialogComponent,  canActivate: [AuthGuard],
},
// Correction de la route pour table-products-demo
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
