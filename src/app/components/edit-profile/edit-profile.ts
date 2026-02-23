import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ייבוא הראוטר
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.scss',
})
export class EditProfile {
 private fb = inject(FormBuilder);
  private userService = inject(AuthService);
  private router = inject(Router); // הזרקת הראוטר

  userId!: number;
  fullUserObject: any; // נשמור את כל האובייקט כדי לעדכן אותו בלוקל לאחר מכן

  profileForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phone: [''],
    city: [''],
    street: ['']
  });

  ngOnInit() {
    const data = localStorage.getItem('miniso_user');
    if (data) {
      this.fullUserObject = JSON.parse(data);
      this.userId = this.fullUserObject.userId;
      
      // מאכלסים את הטופס בערכים הקיימים
      this.profileForm.patchValue({
        firstName: this.fullUserObject.firstName,
        lastName: this.fullUserObject.lastName,
        phone: this.fullUserObject.phone,
        city: this.fullUserObject.city,
        street: this.fullUserObject.street
      });
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.userService.updateUser(this.userId, this.profileForm.value).subscribe({
        next: () => {
          const updatedUser = { ...this.fullUserObject, ...this.profileForm.value };
          localStorage.setItem('miniso_user', JSON.stringify(updatedUser));
          alert('הפרטים עודכנו בהצלחה!');
          this.router.navigate(['/']); // ניווט לדף הבית לאחר הצלחה
        },
        error: (err) => alert('עדכון נכשל')
      });
    }
  }

  onCancel() {
    this.router.navigate(['/']); // חזרה לדף הבית בביטול
  }
}
