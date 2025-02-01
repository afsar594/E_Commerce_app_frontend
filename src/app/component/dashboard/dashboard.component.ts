import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  oppoCount: number = 0;
  tecnoCount: number = 0;
  goldenmarkCount: number = 0;
  hpCount: number = 0;
  sonyCount: number = 0;
  bananzaCount: number = 0;
  constructor(private api:ApiService) {}

  ngOnInit(): void {
    this.getData()
    // this.loadBarChart();
    // this.loadLineChart();
    this.loadPieChart();
    // this.loadDoughnutChart();
  }

  // Bar Chart
  loadBarChart() {
    new Chart(document.getElementById('barChart') as HTMLCanvasElement, {
      type: 'bar',
      data: {
        labels: ['Oppo', 'Tecno', 'Goldenmark', 'HP', 'Sony', 'Bananza'],
        datasets: [{
          label: 'Item Quantity',
          data: [this.oppoCount, this.tecnoCount, this.goldenmarkCount, this.hpCount, this.sonyCount, this.bananzaCount],
          backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#ff9f40'],
          borderColor: '#333',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
      }
    });
  }


  // Line Chart
  loadLineChart(items: any[]) {
    const labels = items.map((item: any) => item.name); 
    const quantities = items.map((item: any) => item.quantity);
    
    new Chart(document.getElementById('lineChart') as HTMLCanvasElement, {
      type: 'line',
      data: {
        labels: labels, 
        datasets: [{
          label: 'Item Trend', 
          data: quantities,
          borderColor: '#ff6384',
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true, // Ensure that the y-axis starts from zero
          }
        }
      }
    });
  }
  

  // Pie Chart
  loadPieChart() {
    new Chart(document.getElementById('pieChart') as HTMLCanvasElement, {
      type: 'pie',
      data: {
        labels: ['Apples', 'Bananas', 'Oranges', 'Grapes', 'Mangoes'],
        datasets: [{
          data: [120, 90, 50, 70, 100],
          backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff']
        }]
      },
      options: { responsive: true }
    });
  }

  // Doughnut Chart
  loadDoughnutChart(items: any[]) {
    const labels = items.map((item: any) => item.name); // Assuming `name` is the item name
    const quantities = items.map((item: any) => item.quantity); // Assuming `quantity` is the quantity of the item
    const backgroundColors = items.map(() => this.getRandomColor()); // Optional, you can use random colors or set a specific color array.
  
    new Chart(document.getElementById('doughnutChart') as HTMLCanvasElement, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: quantities,
          backgroundColor: backgroundColors
        }]
      },
      options: { 
        responsive: true,
        plugins: {
          legend: { display: true }
        }
      }
    });
  }
  
  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

  getData() {
    this.api.getAllItems().subscribe((res: any) => {
      // Count the number of items for each brand
      this.oppoCount = res.filter((item: any) => item.brand.toLowerCase() === 'oppo').length;
      this.tecnoCount = res.filter((item: any) => item.brand.toLowerCase() === 'tecno').length;
      this.goldenmarkCount = res.filter((item: any) => item.brand.toLowerCase() === 'goldenmark').length;
      this.hpCount = res.filter((item: any) => item.brand.toLowerCase() === 'hp').length;
      this.sonyCount = res.filter((item: any) => item.brand.toLowerCase() === 'sony').length;
      this.bananzaCount = res.filter((item: any) => item.brand.toLowerCase() === 'bananza').length;

      // Load the bar chart with fetched data

      const items = res.map((item: any) => ({
        name: item.name,
        quantity: item.quantity 
      }));
  
      this.loadLineChart(items);

      this.loadBarChart();
      this.loadDoughnutChart(res);
    });
  }
  
}
