import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ReportsService } from '../../../services/reports.service'; // Servicio para los reportes

Chart.register(...registerables);

@Component({
  selector: 'app-activity-summary',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './activity-summary.component.html',
  styleUrls: ['./activity-summary.component.css'],
})
export class ActivitySummaryComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: string[] = []; // Etiquetas para el gráfico
  barChartType: ChartType = 'doughnut'; // Tipo de gráfico
  barChartLegend = true; // Mostrar leyenda
  barChartData: ChartDataset[] = []; // Datos del gráfico

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.reportsService.getActivitySummary().subscribe((data) => {
      // Configurar etiquetas y datos para el gráfico
      this.barChartLabels = data.map((item) => item.label); // Extrae las etiquetas
      this.barChartData = [
        {
          data: data.map((item) => item.value), // Extrae los valores
          label: 'Resumen de Actividades',
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
          borderColor: '#FFFFFF',
          borderWidth: 1,
        },
      ];
    });
  }
}
