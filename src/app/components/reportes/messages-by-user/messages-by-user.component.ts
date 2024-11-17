import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ReportsService } from '../../../services/reports.service'; // Servicio para los reportes

Chart.register(...registerables);

@Component({
  selector: 'app-messages-by-user',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './messages-by-user.component.html',
  styleUrls: ['./messages-by-user.component.css'],
})
export class MessagesByUserComponent implements OnInit {
  polarChartOptions: ChartOptions = {
    responsive: true,
  };

  polarChartLabels: string[] = []; // Etiquetas del gráfico
  polarChartType: ChartType = 'polarArea'; // Tipo de gráfico
  polarChartLegend = true; // Mostrar leyenda
  polarChartData: ChartDataset[] = []; // Datos del gráfico

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.reportsService.getMessagesByUser().subscribe((data) => {
      this.polarChartLabels = data.map((item) => item.label); // Extrae las etiquetas
      this.polarChartData = [
        {
          data: data.map((item) => item.value), // Extrae los valores
          label: 'Mensajes por Usuario',
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
          borderWidth: 1,
        },
      ];
    });
  }
}
