import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ReportsService } from '../../../services/reports.service';

Chart.register(...registerables);

@Component({
  selector: 'app-role-distribution',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './role-distribution.component.html',
  styleUrls: ['./role-distribution.component.css'],
})
export class RoleDistributionComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar'; // Cambiado a 'bar'
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.reportsService.getRoleDistribution().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.label); // Extrae los nombres de los roles
      this.barChartData = [
        {
          data: data.map((item) => item.value), // Extrae los valores de los roles
          label: 'Distribución de Roles',
          backgroundColor: [
            '#f3d295',
            '#c18c2b',
            '#ecab36',
            '#785009',
            '#CD5C5C',
            '#D2691E',
            '#B22222',
            '#800000',
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
