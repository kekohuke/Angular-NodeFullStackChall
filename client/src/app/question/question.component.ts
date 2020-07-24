import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, QuestionService } from '../services/question.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
import { interval } from 'rxjs';
interface Option {
  value: string;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  public questions: any = [];
  public index: number = 0;
  public timer: number = 0;
  showElement = true;
  selecting: any;
  timerInterval; 
  handler: any;
  submitted: Boolean = false;
  options: Option[] = [
    { value: 'steak-0' },
    { value: 'pizza-1' },
    { value: 'tacos-2' },
  ];
  result: String;
  constructor(
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => (this.index = params.id));
  }
  
  getValue(event) {
    console.log(event.target.parentNode.innerText);
    this.selecting = event.target.parentNode.innerText;
  }
  ngOnInit(): void {
    const getQuestions = this.questionService.getQuestions();
    getQuestions.subscribe((data: {}) => {
      this.questions = data['questions'];
    });
    this.timerInterval = setInterval(()=>{
      this.timer ++;
    }, 1000)
    this.handler = setTimeout(() => {
      this.handleSubmit(true);
      
      this.showElement = false;
    }, 15000);
  }
  handleSubmit(timeout): void {
    clearTimeout(this.handler)
    clearInterval(this.timerInterval)
    this.submitted = true;
    const checkQ = this.questionService.checkQuestion(
      localStorage.getItem('email'),
      this.questions[this.index].question,
      this.selecting,
      localStorage.getItem('ID')
    );
    checkQ.subscribe((data: {}) => {
      console.log(data);
      if(data['correct']){
        
        this.result = "Correct Answer";
      }else{
        this.result = "Wrong Answer";
      }
      if(timeout){
        this.result = "Time out - " + this.result;
      }
    });
  }
  next(): void {
    if (this.index < 4) {
      this.result = '';
      this.index++;
      this.router.navigateByUrl(`question/${this.index}`).then((e) => {
        if (!e) {
          console.log('Navigation has failed!');
        }
      });
      this.timer = 0;
      this.submitted = false;
      clearTimeout(this.handler)
      clearInterval(this.timerInterval)
      this.timerInterval = setInterval(()=>{
        this.timer ++;
      }, 1000)
      this.handler = setTimeout(() => {
        this.handleSubmit(true);
        clearTimeout(this.handler);
        clearInterval(this.timerInterval)
        this.showElement = false;
      }, 15000);
    } else {
      this.router.navigateByUrl('/end-page');
    }
  }
}
