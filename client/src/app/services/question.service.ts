import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

export interface Question {
  question: string,
  _id: string
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  url = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) {}
  getQuestions(): Observable<any> {

    return this.http.get<any>(this.url+'get-all-questions',{})
  }
  checkQuestion(email, question, answer, userid): Observable<any> {
    return this.http.post<any>(this.url+'check-question',{tableid: localStorage.getItem('tableid'),email, question, answer, userid})
  }

  createTable(): Observable<any> {
    return this.http.post<any>(this.url+'create-table', {userid:localStorage.getItem('ID') })
  }

  getTotalScore(): Observable<any> {
    return this.http.post<any>(this.url+'score', {tableid: localStorage.getItem('tableid')});
  }
}
