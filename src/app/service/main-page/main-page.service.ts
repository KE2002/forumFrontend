import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry, catchError, throwError } from 'rxjs';
export interface GetAllProblemsAndReplies {
  problem: {
    createdAt: number;
    question: string;
    problemImg: string;
    description: string;
    upvote: number;
  };
  replyMain: {
    reply: {
      createdAt: number;
      replyId: string;
      reactions: string[];
      content: string;
    };
    user: {
      name: string;
      profileImg: string;
    };
  }[];
  asker: {
    name: string;
    profileImg: string;
  };
  category: string;
}
export interface GetAllProblems {
  problem: {
    createdAt: number;
    question: string;
    problemImg: string;
    description: string;
    upvote: number;
  };
  userProfileImg: string | null;
  username: string | null;
  category: string | null;
}
export interface PostAQuestionInterface {
  username: string;
  question: string;
  description: string;
  problemImg: string;
  upvote: number;
}
const urlBase: string = 'https://forum-backend-azure.vercel.app/problem/';
@Injectable({
  providedIn: 'root',
})
export class MainPageService {
  constructor(private http: HttpClient) {}

  GetAllQuestionsForMainPage(): Observable<GetAllProblems[]> {
    const url = `${urlBase}fetchAllProblems`;

    return this.http
      .get<GetAllProblems[]>(url)
      .pipe(retry(0), catchError(this.handleError));
  }
  GetAllQuestionsAndReplyForMainPage(text: {
    question: string;
  }): Observable<GetAllProblemsAndReplies[]> {
    const url = `${urlBase}getOneProblemAndReplies`;

    return this.http
      .post<GetAllProblemsAndReplies[]>(url, text)
      .pipe(retry(0), catchError(this.handleError));
  }
  private handleError(error: Error) {
    console.log(error);

    return throwError(() => error);
  }

  PostAQuestion(question: string, description: string, problemImg: string) {
    const url = `${urlBase}createNewProblem`;
    const storage = localStorage.getItem('userData');
    const name =
      storage == null
        ? ''
        : JSON.parse(localStorage.getItem('userData')!).username;

    // console.log({
    //   username: name,
    //   question: question,
    //   description: description,
    //   problemImg: problemImg,
    //   upvote: 0,
    // });
    return this.http
      .post<PostAQuestionInterface>(url, {
        username: name,
        question: question,
        description: description,
        problemImg: problemImg,
        upvote: 0,
      })
      .pipe(retry(0), catchError(this.handleError));
  }
}
