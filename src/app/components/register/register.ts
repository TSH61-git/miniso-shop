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
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.pattern('^[0-9]*$'), Validators.minLength(9), Validators.maxLength(15)]],
      city: ['', [Validators.minLength(2)]],
      street: ['', [Validators.minLength(2)]],
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

  isPasswordVisible: boolean = false;

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}