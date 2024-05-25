

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  errorMessage1: string = '';
  errorMessage: string = '';
  addUserForm!: FormGroup;

  Cin!: string
  Firstname!: string
  Lastname!: string
  Phone!: string

  userList: AngularFireList<any>
  constructor(private userService: UserService, public router: Router,
    private db: AngularFireDatabase, private fire: AngularFireAuth) {

    this.userList = db.list('users')
  }

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      CIn: new FormControl('', [
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.minLength(3)
      ]),
      fIrstname: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z ]+"),
        Validators.minLength(3)
      ]),
      lAstname: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Za-z ]+"),
        Validators.minLength(3)
      ]),
      pHone: new FormControl('', [
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.minLength(8),
        Validators.maxLength(13)
      ])

    });
  }

  onSubmit() {

    let create = 'false';

    this.userList.push({

      Cin: this.Cin,
      Firstname: this.Firstname,
      Lastname: this.Lastname,
      Phone: this.Phone,

    }).then(added => {
      this.router.navigate(['/users'])




    }).catch(error => {
      console.error(error)
      this.errorMessage1 = error.messaage
      console.log('error', error)
      console.log(error.message)

    })

    /*
     this.condactor = new Conductor(this.lastname,this.firstname,this.phone,this.address);
    
     console.log(this.condactor)
     this.conductorservice.createConductor(this.condactor)
     */

  }

}








