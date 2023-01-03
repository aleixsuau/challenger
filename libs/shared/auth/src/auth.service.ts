import { inject, Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, getAuth, onAuthStateChanged, User, signOut } from '@angular/fire/auth';
import { BehaviorSubject, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {  
  private readonly _user = new BehaviorSubject<User | null>(null);
  readonly user$ = this._user.asObservable();

  constructor() {
    // This inject is required in order Firebase to work:
    // https://stackoverflow.com/questions/69842218/angular-12-firebase-modulesnot-correctly-provided
    inject(Auth);
    onAuthStateChanged(getAuth(), (user) => this._user.next(user));
  }

  signIn() {
    return from(signInWithPopup(getAuth(), new GoogleAuthProvider()));
  }

  signOut() {
    return from(signOut(getAuth()));
  }
}
