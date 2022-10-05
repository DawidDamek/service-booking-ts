import Component from '@glimmer/component';

interface SharedChartPieArgs {
  data: number[];
  labels: string[];
  colors: string[];
}

export default class SharedChartPie extends Component<SharedChartPieArgs> {
  get chartData() {
    const data = {
      datasets: [
        {
          data: this.args.data,
          borderWidth: 1,
          borderColor: '#000',
          hoverBorderWidth: 6,
          backgroundColor: this.args.colors,
          hoverBackgroundColor: 'rgba(100, 0, 100, 0.5)',
        },
      ],
      labels: this.args.labels,
    };
    return data;
  }

  get chartOptions() {
    const options = {
      startAngle: 0,
      animation: {
        animateRotate: false,
        animateScale: false,
      },
    };

    return options;
  }
}
