import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'final';
  constructor(private authservice: AuthService) {
    var firebaseConfig = {
      apiKey: "AIzaSyD5J29BJalQOdWXe79RXUNmKpf_dglkZYA",
      authDomain: "final-892d1.firebaseapp.com",
      projectId: "final-892d1",
      storageBucket: "final-892d1.appspot.com",
      messagingSenderId: "530744312384",
      appId: "1:530744312384:web:eac3579269df5f4b69d5a5",
      measurementId: "G-ZX71Z69BKR"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}

