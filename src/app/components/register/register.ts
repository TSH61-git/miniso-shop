// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register { 
  registerForm!: FormGroup;
  passwordStrength: string = '';
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      // שם פרטי: חובה, מינימום 2 תווים
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      // שם משפחה: חובה, מינימום 2 תווים
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      // אימייל: חובה, פורמט תקין של אימייל
      email: ['', [Validators.required, Validators.email]],
      // סיסמה: חובה, לפחות 6 תווים
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          console.log('Success');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'אירעה שגיאה ברישום. אנא נסה שוב מאוחר יותר.';
        }
      });
    }
  }
}