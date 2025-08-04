import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-details',
  imports: [CommonModule],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  category$!: Observable<Category>;

  ngOnInit(): void {
    this.category$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        if (!id || isNaN(id)) {
          this.router.navigate(['/categories']);
          throw new Error('Invalid category ID');
        }
        return this.categoryService.getCategory(id);
      })
    );
  }

  goBack(): void {
    this.router.navigate(['/categories']);
  }
}
