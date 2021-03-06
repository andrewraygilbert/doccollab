import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { BROWSER_STORAGE } from './../constants/browser-storage';
import { Credentials, TokenObject, CreateUserDTO } from '@doccollab/api-interfaces';

const apiBaseUrl = environment.API_BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private localStorage: Storage,
  ) { }

  public getToken(): string | null {
    return this.localStorage.getItem('access_token');
  }

  public saveToken(token: TokenObject): void {
    this.localStorage.setItem('access_token', token.access_token);
  }

  public async login(credentials: Credentials): Promise<TokenObject> {
    const url = `${apiBaseUrl}auth/login`;
    return this.http
      .post(url, credentials)
      .toPromise()
      .then(response => response as TokenObject)
      .catch(err => {
        return Promise.reject(err);
      });
  }

  public getUserInfo() {
    const token = this.getToken();
    let userInfo: any;
    if (token) {
      userInfo = JSON.parse(atob(token.split('.')[1]));
    }
    console.log('userInfo', userInfo);
    return userInfo;
  }

  public async logout(): Promise<void> {
    this.localStorage.removeItem('access_token');
  }

  public async register(createUserDto: CreateUserDTO) {
    const url = `${apiBaseUrl}users/register`;
    return this.http
      .post(url, createUserDto)
      .toPromise()
      .then(response => response as any)
      .catch(err => {
        return Promise.reject(err);
      });
  }

}
