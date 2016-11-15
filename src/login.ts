import {Aurelia, inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {Shimmy, IPage} from './shimmy';

@inject(Shimmy, DialogController)
export class Login {
  //static inject = [DialogController];
  auth = { username: '', password: '', error: '' };

  constructor(private shimmy: Shimmy, private controller : DialogController){
    
    this.controller = controller;
  }

  activate(auth){
    this.auth = auth;
  }

  tryLogin (auth) {

    let self = this;

    this.shimmy.loginUsername(auth.username, auth.password)
      .catch(response => {
        this.auth.error = "Invalid username or password";
      })
      .then(response => {
          if(response.hasOwnProperty('token')) {
            this.auth.error = "";
            self.controller.ok(auth);
          }
      });
  }
}