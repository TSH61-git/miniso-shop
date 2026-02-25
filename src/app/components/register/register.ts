// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
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
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Zא-ת\s]+$/)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Zא-ת\s]+$/)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, this.passwordComplexityValidator]],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.pattern('^[0-9]*$'), Validators.minLength(9), Validators.maxLength(15)]],
      city: ['', [Validators.minLength(2)]],
      street: ['', [Validators.minLength(2)]],
    }, { validators: this.passwordMatchValidator });
  }

  // Custom password complexity validator
  passwordComplexityValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecial = /[#?!@$%^&*-]/.test(value);
    const hasMinLength = value.length >= 8;

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && hasMinLength;
    return !passwordValid ? { 
      passwordComplexity: {
        hasUpperCase,
        hasLowerCase,
        hasNumeric,
        hasSpecial,
        hasMinLength
      }
    } : null;
  }

  // Custom password match validator
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    
    if (!password || !confirmPassword) return null;
    
    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  // Calculate password strength for UI feedback
  updatePasswordStrength(): void {
    const password = this.registerForm.get('password')?.value || '';
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasSpecial = /[#?!@$%^&*-]/.test(password);
    const hasMinLength = password.length >= 8;

    const strength = [hasUpperCase, hasLowerCase, hasNumeric, hasSpecial, hasMinLength].filter(Boolean).length;
    
    if (strength < 3) this.passwordStrength = 'weak';
    else if (strength < 5) this.passwordStrength = 'medium';
    else this.passwordStrength = 'strong';
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      // Remove confirmPassword before sending to API
      const formData = { ...this.registerForm.value };
      delete formData.confirmPassword;
      
      this.authService.register(formData).subscribe({
        next: () => {
          console.log('Success');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'אירעה שגיאה ברישום. אנא נסה שוב מאוחר יותר.';
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.registerForm.markAllAsTouched();
    }
  }

  isPasswordVisible: boolean = false;

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}