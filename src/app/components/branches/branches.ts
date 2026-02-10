import { Component } from '@angular/core';
import { BranchService } from '../../services/branch-service';
import { Branch } from '../../models/Branch';

@Component({
  selector: 'app-branches',
  imports: [],
  templateUrl: './branches.html',
  styleUrl: './branches.scss',
})
export class Branches {
  branches: Branch[] = [];
  selectedBranch: Branch | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private categoryService: BranchService) {}

  ngOnInit(): void {
    this.categoryService.getBranches().subscribe({
      next: (data) => {
        this.branches = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'שגיאה בטעינת הנתונים מהשרת';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onBranchSelect(branch: Branch): void {
    this.selectedBranch = branch;
  }

}
