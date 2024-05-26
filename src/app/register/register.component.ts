import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Role } from '../role';
import { User } from '../userRegister';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  roles: Role[] = [];
  rolesSelected: Role[] = [];

  selectedRole: Role = new Role();
  user: User = new User();

  myForm!: FormGroup;
  errorMessage: string | undefined;

  constructor(private fb: FormBuilder, private router: Router, private authservice: AuthService) { }

  ngOnInit(): void {
    this.getRoles();
    this.myForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      // Add other form controls as needed
    });
  }

  getRoles() {
    this.authservice.getRoles().subscribe(
      (response) => {
        this.roles = response;
        console.log(this.roles);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onRoleChange(event: Event): void {
    this.rolesSelected=[]

    const selectElement = event.target as HTMLSelectElement;
    const selectedRoleId = Number(selectElement.value);
    const filteredRole = this.roles.find(role => role.id === selectedRoleId);
    if (filteredRole) {
      this.rolesSelected.push(filteredRole);
      console.log('Filtered role:', this.rolesSelected);
    }
  }

  saveUser() {
  this.user.email=this.myForm.get('email')?.value
  this.user.firstname=this.myForm.get('firstname')?.value
  this.user.lastname=this.myForm.get('lastname')?.value
  this.user.email=this.myForm.get('email')?.value
  this.user.username=this.myForm.get('email')?.value
  this.user.password=this.myForm.get('password')?.value
  this.user.roles=this.rolesSelected

    console.log("user", this.user);

    this.authservice.signup(this.user).then(
      () => {

        this.router.navigate(['/']);
        Swal.fire({
          text: 'Registration successful!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      (error: string) => {
        this.errorMessage = error;
        alert("Invalid connection");
      }
    );
    this.rolesSelected=[]
  }
}
