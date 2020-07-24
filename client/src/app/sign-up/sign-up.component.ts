import { Component, OnInit } from '@angular/core';
import { Cat, AuthService } from '../services/auth.service';
import {Router} from '@angular/router';
/** @title Simple form field */
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  cats: Cat[];
  email = ''
  constructor(private catService: AuthService, private router: Router) {}

  ngOnInit() {
    const catsObservable = this.catService.getAllCats();
    catsObservable.subscribe((catsData: []) => {
      this.cats = catsData['cats'];
    });
    console.log(localStorage.getItem('ID'))
    if(localStorage.getItem('ID')){
      console.log(localStorage.getItem('ID'))
      this.router.navigateByUrl('/enter-contest')
    }
  }
  checkEmail(){

    const checkEmailObservable = this.catService.checkEmail(this.email);
    checkEmailObservable.subscribe((data: {}) => {
      console.log(data)
      if(data['success'])
      {
        localStorage.setItem('email', data['email']);
        localStorage.setItem('ID', data['_id'])
        this.router.navigateByUrl('/enter-contest')
      }
    })
  }
}

/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
