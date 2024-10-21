import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Chart, registerables } from "chart.js";
import { PublishedBooksService } from "../../services/published-books.service";
import { PublishedBook } from "../../model/published-book.entity";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-statistics-published-book',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './statistics-published-book.component.html',
  styleUrl: './statistics-published-book.component.css'
})
export class StatisticsPublishedBookComponent implements OnInit {
  publishedBook: PublishedBook | undefined;

  constructor(private route: ActivatedRoute, private publishedBooksService: PublishedBooksService)
  {
    Chart.register(...registerables);
  }

  ngOnInit() {
    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.getBookDetails(bookId);
  }

  getBookDetails(bookId: number): void {
    this.publishedBooksService.getPublishedBookById(bookId).subscribe((book: PublishedBook) => {
      this.publishedBook = book;

      // Verificamos si se encuentran datos para la creación de gráficos estadísticos
      if (book.statistics.length > 0) {
        this.loadCharts(book);
      } else {
        console.warn('No hay estadísticas disponibles para este libro.');
      }
    });
  }

  loadCharts(book: PublishedBook): void {
    const readersData = book.statistics[0].interestedReaders;
    const purchasesData = book.statistics[0].physicalPurchases;
    const downloadsData = book.statistics[0].digitalDownloads;

    console.log('Interested Readers:', readersData);
    console.log('Physical Purchases:', purchasesData);
    console.log('Digital Downloads:', downloadsData);

    // Gráfico de barras de lectores interesados
    new Chart('readersChart', {
      type: 'bar',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Number of Interested Readers',
          data: readersData,
          backgroundColor: 'rgba(120, 194, 83, 0.8)'
        }]
      },
      options: {
        scales: {
          y: {beginAtZero: true}
        }
      }
    });

    // Gráfico de lineas de compras y descargas (formatos fisico y digital)
    new Chart('purchasesAndDownloadsChart', {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Number of Purchases (Physical)',
            data: purchasesData,
            borderColor: 'rgba(153, 102, 255, 1)',
            fill: false,
            tension: 0.1
          },
          {
            label: 'Number of Downloads (Digital)',
            data: downloadsData,
            borderColor: 'rgba(255, 159, 64, 1)',
            fill: false,
            tension: 0.1
          }
        ]
      },
      options: {
        scales: {
          y: {beginAtZero: true}
        }
      }
    });
  }
}
