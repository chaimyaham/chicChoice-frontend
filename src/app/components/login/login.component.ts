import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogLayoutDisplay, ToastNotificationInitializer } from '@costlydeveloper/ngx-awesome-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  errorMessage: string | null = null;
  submitted = false;
  loading = false;

  constructor(public router:Router,private formBuilder:FormBuilder,private authService:AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit(){
    this.submitted=true;
    if (this.loginForm.invalid) {
    
      return;
    }
    this.loading = true;
      console.log(this.loginForm.value)
      const username=this.loginForm.value.username;
      const password=this.loginForm.value.password;
      this.authService.login(username, password).subscribe(
        response => {
         
           this.loading = false;
           this.openToast()
           this.router.navigate(['/dashboard']);
        },
        error => {
           
           this.loading = false;
           if (error.status === 400) {
             this.errorMessage = "Nom d'utilisateur ou mot de passe incorrect.";
           } else {
             this.errorMessage = "Une erreur s'est produite. Veuillez réessayer plus tard.";
           }
        }
       );
       
  }
  openToast() {         
    const newToastNotification = new ToastNotificationInitializer();
    newToastNotification.setTitle('Success!!');
    newToastNotification.setMessage('You successfully loged in.');
    newToastNotification.setConfig({      
      layoutType: DialogLayoutDisplay.SUCCESS,
     });
    newToastNotification.openToastNotification$();
    
   }

  

}
