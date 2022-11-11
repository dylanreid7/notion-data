import { Observable } from 'rxjs';
import { NotionService } from './notion.service';
// import { notionData } from '../../notion-api/notion-api';
// import notionData from '../../../notion-connection/index';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'notion-data';
  database$!: Observable<any>;
  notionData: any = [];
  displayedColumns: string[] = ['Date', 'Food Tracked', 'Workout', 'Personal Project >1 h', 'Review Goals', 'Meditate', 'Workout Description', 'Tasks Completed', 'Screen Time', 'Calories', 'Weight'];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getDatabase();
  }

  private getDatabase() {
    // this.notionService.getDatabase().then((res: any) => {
    //   this.database$ = res;
    //   console.log('database data: ', res);
    // });
    this.httpClient.get('http://localhost:3000/notion-db').subscribe((data: any) => {
      console.log('data: ', data);
      this.notionData = data;
    });
  }

  // transformData(databaseInfo: any) {
  //   let data = [];
  //   for (const entry of databaseInfo) {
  //       let entryProps = Object.keys(entry.properties);
  //       let dataObj = {};
  //       entryProps.forEach((prop) => {
  //           let propType = entry.properties[prop].type;
  //           let value = entry.properties[prop][propType];
  //           if (typeof value === 'object' && value) {
  //               if (propType === 'title' || propType === 'rich_text') {
  //                   if (value.length) {
  //                       value = value[0].plain_text;
  //                   } else {
  //                       value = '';
  //                   }
  //               } else if (propType === 'date') {
  //                   value = value.start;
  //               }
  //           }
  //           dataObj[prop] = value;
  //       })
  //       data.push(dataObj);
  //   }
  //   console.log('data: ', data);
  //   return data;
  // }
  // constructor(private httpClient: HttpClient) {}

  // getNotionData() {
  //   const url = `https://api.notion.com/v1/databases/${this.databaseId}`
  //   this.httpClient.get<any>(url)
  // }
  // log() {
  //   // console.log('notion data', notionData);
  // }

}
