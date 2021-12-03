import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }



  getPosts() {
    return this.http.get<any>(`${this.baseUrl}/posts`);
  }
  getComments(id: any) {
    return this.http.get<any>(`${this.baseUrl}/posts/${id}/comments`);
  }

  postPost(Post:any) {
    return this.http.post<any>(`${this.baseUrl}/posts` , JSON.stringify(Post))
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

}
