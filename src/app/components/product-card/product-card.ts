import { Component, Input, EventEmitter, Output } from '@angular/core';

export interface ProductDTO {
  productId: number;
  productName: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  description: string;
}

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})

export class ProductCard {
  @Input() product!: ProductDTO;
  randomHeight: string = '200px';
  
  // אירוע שייורה כשלוחצים על הכרטיס כדי לפתוח מודאל בעתיד
  @Output() openDetails = new EventEmitter<ProductDTO>();

  ngOnInit() {
    // מגדיר גובה רנדומלי קטן לכל כרטיס כדי ליצור את אפקט פינטרסט
    const heights = ['180px', '220px', '260px'];
    this.randomHeight = heights[Math.floor(Math.random() * heights.length)];
  }
  
  onCardClick() {
    this.openDetails.emit(this.product);
  }
}
