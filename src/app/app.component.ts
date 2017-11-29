import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  title: string = 'Firebase';

  user: Observable<firebase.User>;

  email: string;
  password: string;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.user = this.angularFireAuth.authState;
  }

  loginFacebook() {
    this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  loginGitHub() {
    this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }

  loginEmail() {
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .catch((error: any) => { console.log(error); } );

    this.email = '';
    this.password = '';
  }

  signOut() {
    this.angularFireAuth.auth.signOut();
  }
}
