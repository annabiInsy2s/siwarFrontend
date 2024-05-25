import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.userList = db.list('users');
  }

  addUser(user: User) {
    throw new Error('Method not implemented.');
  }

  createUser(user: User) {
    this.userList.push({
      Cin: user.Cin,
      Firstname: user.Firstname,
      Lastname: user.Lastname,
      Phone: user.Phone,
    }).catch(error => {
      console.error(error);
    });
  }

  getUsers(): Observable<any> {
    return this.db.list('users').snapshotChanges();
  }

  getUserById(id: any): Observable<any> {
    return this.db.list('users', ref => ref.orderByKey().equalTo(id)).snapshotChanges();
  }

  deleteUserById(id: string): Promise<void> {
    return this.userList.remove(id);
  }
}
