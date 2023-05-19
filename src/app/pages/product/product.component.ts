import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/services/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  newProduct: Product = { id: 0, name: '', description: '', imageUrl: '', price: 0 };
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  createProduct(): void {
    this.productService.createProduct(this.newProduct).subscribe(product => {
      this.products.push(product);
      this.newProduct = { id: 0, name: '', description: '', imageUrl: '', price: 0 };
    });
  }

  selectProductForUpdate(product: Product): void {
    this.selectedProduct = { ...product };
  }

  updateProduct(): void {
    if (this.selectedProduct) {
      this.productService.updateProduct(this.selectedProduct).subscribe(product => {
        const index = this.products.findIndex(p => p.id === this.selectedProduct?.id);
        if (index !== -1) {
          this.products[index] = product;
        }
        this.selectedProduct = null;
      });
    }
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter(product => product.id !== id);
      });
    }
  }

}
