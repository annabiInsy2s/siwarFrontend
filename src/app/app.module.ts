import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';




import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { DataViewModule } from 'primeng/dataview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { GalleriaModule } from 'primeng/galleria';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

import { DemandeComponent } from './demande/demande.component';
import { EchangeComponent } from './echange/echange.component';
import { MenuComponent } from './menu/menu.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { ProductService } from './product.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PhotoService } from './photo.service';
import { ArticleService } from './article.service';
import { DonsComponent } from './dons/dons.component';
import { ProfiledonsComponent } from './profiledons/profiledons.component';
import { DetailleComponent } from './detaille/detaille.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ProfileComponenetComponent } from './profile-componenet/profile-componenet.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
  
    RegisterComponent,
    LoginComponent,
    UsersComponent,
    ResetpasswordComponent,
    AddUserComponent,
    ConfirmationDialogComponent,

    DemandeComponent,
    EchangeComponent,
    MenuComponent,
    ProfileComponent,
    HomeComponent,
    DonsComponent,
    ProfiledonsComponent,
    DetailleComponent,
    ProfileComponenetComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    TableModule,
    ToastModule,
    TagModule,
    RatingModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule,
    ToolbarModule,
    FileUploadModule,
    GalleriaModule,
    MultiSelectModule,
    DataViewModule,
    ScrollTopModule,
    ImageModule,
    ButtonModule,
    InputTextModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'), // Function to retrieve the JWT token from local storage
      },
    }),
  ],
  providers: [
    ProductService,
    MessageService,
    ConfirmationService,
    PhotoService,
    ArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
