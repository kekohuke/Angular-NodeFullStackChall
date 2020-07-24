import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  QuestionService } from '../services/question.service';
/**
 * @title Basic buttons
 */
@Component({
  selector: 'enter-contest',
  templateUrl: 'enter-contest.component.html',
  styleUrls: ['enter-contest.component.scss'],
})
export class EnterContestComponent {
  constructor(
    private router: Router,
    private questionService: QuestionService
  ) {}

  creatTable() {
    this.questionService.createTable().subscribe((data: {}) => {
      localStorage.setItem('tableid', data['result']['_id']);
      console.log(data)
    });
  }
  ngOnInit() {
    if (!localStorage.getItem('ID')) {
      this.router.navigateByUrl('/');
    }
  }
  signOut() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
