import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  
  listGenre = [
    { text:'Femme', value:'f'},
    { text:'Homme', value:'h'}
  ];

  
  signUpForm! : FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        firstName: ['',[Validators.required]],

      }
    );
  }

  onSubmit() {
    if(this.signUpForm.valid) {
      console.log(this.signUpForm.value);
    } 
  }

}
