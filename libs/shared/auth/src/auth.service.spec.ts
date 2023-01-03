import { AuthService } from './auth.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Auth } from '@angular/fire/auth';
import * as AngularFire from '@angular/fire/auth';

jest.mock('@angular/fire/auth', () => {
  const Auth = class Auth {};
  const getAuth = jest.fn();
  const signInWithPopup = jest.fn(() => Promise.resolve(true));
  const signOut = jest.fn(() => Promise.resolve(true));
  const onAuthStateChanged = jest.fn();
  const GoogleAuthProvider = jest.fn();
  
  return {
    Auth,
    getAuth,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
  };
});


describe('AuthService', () => {
  let spectator: SpectatorService<AuthService>;
  
  const createService = createServiceFactory({
    service: AuthService,
    mocks: [Auth]
  });

  beforeEach(() => spectator = createService());

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();

    expect(AngularFire.getAuth).toHaveBeenCalled();
    expect(AngularFire.onAuthStateChanged).toHaveBeenCalled();
  });

  it('should signIn', () => {
    spectator.service.signIn();

    expect(AngularFire.getAuth).toHaveBeenCalled();
    expect(AngularFire.GoogleAuthProvider).toHaveBeenCalled();
    expect(AngularFire.signInWithPopup).toHaveBeenCalled();
  });

  it('should signOut', () => {
    spectator.service.signOut();

    expect(AngularFire.getAuth).toHaveBeenCalled();
    expect(AngularFire.signOut).toHaveBeenCalled();
  });
});
