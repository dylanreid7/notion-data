import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
// import { LineChart } from 'd3/line-chart';

@Component({
  selector: 'app-calories',
  templateUrl: './calories.component.html',
  styleUrls: ['./calories.component.scss']
})
export class CaloriesComponent implements OnInit {
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


  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.calories);
  }

}
