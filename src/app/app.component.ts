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

  viewLoginForm: boolean = false;
  viewAddForm: boolean = false;

  name: string;
  image: string;
  email: string;
  password: string;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.user = this.angularFireAuth.authState;
  }

  showLoginForm() {
    this.viewLoginForm = this.viewLoginForm === false ? true : false;
  }

  showAddForm() {
    this.viewLoginForm = false;
    this.viewAddForm = this.viewAddForm === false ? true : false;
  }

  addUser() {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then((response: any) => {
        let currentUser = firebase.auth().currentUser;
        currentUser.updateProfile({ displayName: this.name, photoURL: this.image });
      })
      .catch((error: any) => { console.log(error); });

    this.cleanForm();
  }

  loginFacebook() {
    this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((response: any) => { firebase.auth().currentUser.linkWithCredential(response.credential); })
      .catch((error: any) => { firebase.auth().currentUser.linkWithCredential(error.credential); });
  }

  loginGitHub() {
    this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response: any) => { firebase.auth().currentUser.linkWithCredential(response.credential); })
      .catch((error: any) => { firebase.auth().currentUser.linkWithCredential(error.credential); });
  }

  loginEmail() {
    firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then((response: any) => { firebase.auth().currentUser.linkWithCredential(response.credential); })
      .catch((error: any) => { firebase.auth().currentUser.linkWithCredential(error.credential); });

    this.cleanForm();
  }

  signOut() {
    this.angularFireAuth.auth.signOut();
  }

  cleanForm() {
    this.name = '';
    this.image = '';
    this.email = '';
    this.password = '';
  }
}
