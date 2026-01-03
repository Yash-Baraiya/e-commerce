import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/loan.service';
import { Product, ProductStats } from '../../models/loan.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: ProductStats | null = null;
  products: Product[] = [];
  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    
    this.productService.getStats().subscribe({
      next: (data: ProductStats) => {
        this.stats = data;
      },
      error: (err: any) => console.error('Error loading stats:', err)
    });

    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading products:', err);
        this.loading = false;
      }
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'In Stock': 'status-in-stock',
      'Low Stock': 'status-low-stock',
      'Out of Stock': 'status-out-of-stock'
    };
    return statusMap[status] || '';
  }
}
