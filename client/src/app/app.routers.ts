import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component';
import {EnterContestComponent} from './enter-contest/enter-contest.component';
import {QuestionComponent} from './question/question.component';
import {EndPageComponent} from './end-page/end-page.component';
const routes: Routes = [
  {path: '', component: SignUpComponent},
  {path: 'enter-contest', component: EnterContestComponent},
  {path: 'question/:id', component: QuestionComponent},
  {path: 'question',  redirectTo: '/question/0'},
  {path: 'end-page', component: EndPageComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouters {}