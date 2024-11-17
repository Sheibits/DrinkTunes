import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ReportsService } from '../../../services/reports.service'; // Servicio para los reportes

Chart.register(...registerables);

@Component({
  selector: 'app-ads-by-restaurant',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './ads-by-restaurant.component.html',
  styleUrls: ['./ads-by-restaurant.component.css'],
})
export class AdsByRestaurantComponent implements OnInit {
  bubbleChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const data = tooltipItem.raw as any;
            return `Restaurante: ${tooltipItem.label}, Anuncios: ${data.r}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Restaurantes',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Cantidad de Anuncios',
        },
        beginAtZero: true,
      },
    },
  };

  bubbleChartLabels: string[] = []; // Etiquetas del gráfico
  bubbleChartType: ChartType = 'bubble'; // Tipo de gráfico
  bubbleChartData: ChartDataset[] = []; // Datos del gráfico

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.reportsService.getAdsByRestaurant().subscribe((data) => {
      this.bubbleChartData = [
        {
          label: 'Anuncios por Restaurante',
          data: data.map((item, index) => ({
            x: index, // La posición en el eje X será su índice
            y: item.value, // El valor del anuncio
            r: Math.sqrt(item.value) * 5, // Radio proporcional al valor
          })),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
          borderColor: '#003366',
          borderWidth: 1,
        },
      ];

      this.bubbleChartLabels = data.map((item) => item.label); // Extrae las etiquetas
    });
  }
}
