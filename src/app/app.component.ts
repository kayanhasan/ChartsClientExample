import { Component } from '@angular/core';
import * as signalr from '@microsoft/signalr';
import { Title } from '@angular/platform-browser';
import * as Highcharts from 'highcharts'
import { Type } from '@angular/compiler';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
   
connection :signalR.HubConnection;
  constructor() {

    this.connection=new signalr.HubConnectionBuilder().withUrl("https:localhost:7012/satishub").build();
    this.connection.start();
    this.connection.on("receiveMessage",message=>{
      console.log(message);
      this.chart.showLoading(); 
      /*for (let index = 0; index < this.chart.series.length; index++) {
       this.chart.series[index].remove(true);
       }*/
      // this.chart.remove(true);
      
      var series_ids:string[]= [];
for (var s in this.chart.series) {
    series_ids.push(this.chart.series[s].options.id);
}
for (let index = 0; index < series_ids.length; index++) {
  this.chart.series[index].remove();
  this.updateFromInput=true;
     this.chart.hideLoading();
}

      /*for (let index = 0; index < this.chart.length; index++) {
        this.chart.series[index].remove(true);
      }
      */
     for (let index = 0; index < message.length; index++) {
      this.chart.addSeries(message[index]);
      this.chart.series[index].id=index;
     }
     this.updateFromInput=true;
     this.chart.hideLoading();
   
    });
    const self=this;
    this.chartCallback = chart => {
      self.chart=chart;
    }
  }
  chart;
  updateFromInput=false;
  chartCallback;
  Highcharts : typeof Highcharts = Highcharts;
  chartOptions:Highcharts.Options={
    title:{
      text:"Başlık"
    },subtitle:{
      text:"Alt Başlık"
    },
    yAxis :{
      title :{
        text :"Y Ekseni"
      }
    },
    xAxis :{
      accessibility:{
        rangeDescription :"2019-2020"
      }
    },
    legend :{
      layout :"vertical",
      align:"right",
      verticalAlign:"middle"
    },
    plotOptions:{
      series:{
        label:{
          connectorAllowed:true
        },
        pointStart:100
      }
    }
    
  } 
}
