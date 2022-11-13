import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { ChartConfiguration, ChartOptions } from "chart.js";
// import { LineChart } from 'd3/line-chart';

@Component({
  selector: 'app-calories',
  templateUrl: './calories.component.html',
  styleUrls: ['./calories.component.scss']
})
export class CaloriesComponent implements OnInit, OnChanges {
  @Input() data: any = [];
  // xAxis: string[] = ['one', 'two', 'three'];
  // yAxis: number[] = [12, 15, 13];
  yAxis: number[] = [2000, 2000, 2000, 2000, 1650, 1535]
  xAxis: string[] = ['2022-11-11', '2022-11-10', '2022-11-09', '2022-11-08', '2022-11-04', '2022-11-07']


  ngOnInit(): void {
    // this.createSvg();
    // this.drawBars(this.calories);
    // this.tranformData(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.tranformData(this.data);
    console.log('y axis: ', this.yAxis);
    console.log('x axis: ', this.xAxis);
    console.log('tye x :', typeof this.xAxis[1]);
    console.log('line chart data: ', this.lineChartData);
  }

  createData(xData: string[], yData: number[]) {
    let chart: ChartConfiguration<'line'>['data'] = {
      labels: xData,
      datasets: [
        {
          data: yData,
          label: 'Calories',
          fill: false,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)'
        }
      ] 
    };
    return chart;
  }

  tranformData(inputData: any) {
    console.log('data here: ', inputData);
    this.xAxis = [];
    this.yAxis = [];
    inputData.forEach((input: any) => {
      this.xAxis.push(input.Date);
      this.yAxis.push(input['Calories Consumed']);
    });
    let chart = this.createData(this.xAxis, this.yAxis);
    this.lineChartData = chart;
  }

  

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.xAxis,
    datasets: [
      {
        data: this.yAxis,
        label: 'Calories',
        fill: false,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = false;







  calories = [
    { 
      date: '11-04-22',
      calories: 20
    },
    { 
      date: '11-05-22',
      calories: 25
    },
    { 
      date: '11-06-22',
      calories: 25
    },
    { 
      date: '11-07-22',
      calories: 40
    },
  ];
  svg: any = null;
  margin: number = 50;
  width: number = 750 - (this.margin * 2);
  height: number = 400 - (this.margin * 2);

  createSvg() {
    this.svg = d3.select("figure#bar")
    .append('svg')
    .attr('width', this.width + (this.margin * 2))
    .attr('height', this.height + (this.margin * 2))
    .append('g')
    .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.date))
    .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, 50])
    .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: any) => x(d.date))
    .attr("y", (d: any) => y(d.calories))
    .attr("width", x.bandwidth())
    .attr("height", (d: any) => this.height - y(d.calories))
    .attr("fill", "#d04a35");
}

  // drawLines(data: any[]) {
  //   const x = d3.scaleBand()
  // }

  // line = d3.line()
  //   .x((d: any) => { return d.date })
  //   .y((d: any) => { return d.calories })




}
