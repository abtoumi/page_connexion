import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AuthenticationService, AlertService } from '../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;  
  

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService : AlertService

  ) { }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            recaptchaReactive: ['', Validators.required]
        });    
  }
  // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

        onSubmit() {
          this.submitted = true;

          // stop here if form is invalid
          if (this.loginForm.invalid) {
              return;
          }

          this.loading = true;
          this.alertService.clear();
          // LOGIN : SOPRA ; MOT PASS: 1234
          this.authenticationService.login(this.f.username.value, this.f.password.value)
              .pipe(first())
              .subscribe(
                  data => 
                  
                  { 
                    this.loading = false;
                  if(data == true){
                    this.router.navigate(['home']);
                    
                  }else{
                      this.alertService.error("Username or password is incorrect");
                      this.loading = false;
                  }
                      
                  },
                  error => {

                  });
       }

}
