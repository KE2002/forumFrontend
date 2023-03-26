import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, retry, debounceTime } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

export interface LogIn {
  name: string;
  password: string;
}

export interface SignUp {
  name: string;
  password: string;
  email: string;
}
export interface Responses {
  access_token: string;
}
export interface InputSearch {
  text: string;
}

export interface UserDescription {
  name: string;
  desc: string;
  profileImg: string;
  technology: string[];
}

export interface TextSearchResponse {
  score: number;
  questiondesc: string | null;
  question: string | null;
  userdesc: string | null;
  label: string[];
  technology: string[] | null;
  username: string | null;
  userImage: string | null;
  questionImage: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  constructor(private http: HttpClient) {}

  loginUrl: string = 'https://forum-backend-azure.vercel.app/auth/loginUser';
  signUpUrl: string = 'https://forum-backend-azure.vercel.app/auth/createUser';
  textSearchUrl: string = 'https://forum-backend-azure.vercel.app/fulltext';

  userDescUrl: string =
    'https://forum-backend-azure.vercel.app/user/updateDetails';

  loginUserDetails(login: LogIn): Observable<Responses> {
    return this.http
      .post<Responses>(this.loginUrl, login, httpOptions)
      .pipe(retry(0), catchError(this.handleError));
  }

  signUpDetails(signUp: SignUp): Observable<Responses> {
    return this.http
      .post<Responses>(this.signUpUrl, signUp, httpOptions)
      .pipe(retry(0), catchError(this.handleError));
  }
  userDescDetails(userDesc: UserDescription): Observable<UserDescription> {
    let userDtl: any = localStorage.getItem('userData');
    if (userDtl) {
      userDtl = JSON.parse(userDtl);
    }
    // console.log(userDtl.access_token);
    const descHeader: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userDtl.access_token}`,
    });
    return this.http
      .post<UserDescription>(this.userDescUrl, userDesc, {
        headers: descHeader,
      })
      .pipe(retry(0), catchError(this.handleError));
  }
  textSearch(ipSearch: InputSearch): Observable<TextSearchResponse[]> {
    return this.http
      .post<TextSearchResponse[]>(this.textSearchUrl, ipSearch, httpOptions)
      .pipe(retry(0), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error.error.message);
    return of(error.error.message);
  }
}
