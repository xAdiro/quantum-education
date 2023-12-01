import Chart, { ChartConfiguration } from 'chart.js/auto'

(async function() {
    const labels = [1, 2, 3, 4, 5, 6, 7];
        const data = {
        labels: labels,
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const config: ChartConfiguration = {
        type: 'line',
        data: data,
    }

    const chartElement: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('classic-jump-chart')!;
  
    new Chart(
      chartElement, config
    );
  })();
   