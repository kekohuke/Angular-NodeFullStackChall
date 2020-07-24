import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Question, QuestionService } from '../services/question.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-end-page',
  templateUrl: './end-page.component.html',
  styleUrls: ['./end-page.component.css']
})
export class EndPageComponent implements OnInit {
  score: Number=0
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    const getScore = this.questionService.getTotalScore();
    getScore.subscribe((data: {}) => {
      console.log(data)
      this.score = data['score'];
    })
  }

}
