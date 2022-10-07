import Component from '@glimmer/component';

interface SharedChartPieArgs {
  data: number[];
  labels: string[];
  colors: string[];
  label: string;
}

export default class SharedChartPie extends Component<SharedChartPieArgs> {
  get chartData() {
    const data = {
      datasets: [
        {
          data: this.args.data,
          borderWidth: 1,
          borderColor: '#000',
          hoverBorderWidth: 3,
          backgroundColor: this.args.colors,
          fill: 'false',
          label: this.args.label,
          hoverBackgroundColor: 'rgba(100, 0, 100, 0.5)',
        },
      ],
      labels: this.args.labels,
    };
    return data;
  }
}
