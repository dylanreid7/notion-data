import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

// ACCESS CONSTANTS
export const NOTION = {
  bearerToken: 'secret_LYOku8UK7G5JSfL5UCxuQx1TWJ1uMzSRY8SY4PjsqtL',
  database: {
    api: 'https://api.notion.com/v1/databases',
    id: '83efc70a776e4b50adbe430cce9a6f9a',
  },
  page: {
    api: 'https://api.notion.com/v1/pages',
    id: '750c2620100f40e988c12432a87dbd9d'
  }
};

// HEADERS
export const headerOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${NOTION.bearerToken}`,
    'Access-Control-Allow-Origin': 'http://localhost:4200'
  })
};

@Injectable()
export class NotionService {

  private _database$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public database$: Observable<any> = this._database$.asObservable();

//   private _pageData$: BehaviorSubject<any> = new BehaviorSubject<any>({});
//   public pageData$: Observable<any> = this._pageData$.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  async getDatabase(): Promise<any> {
    const databaseData = await this.http.get(`${NOTION.database.api}/${NOTION.database.id}`, headerOptions);
    this._database$.next(databaseData);
    return databaseData;
  }

//   async getPage(): Promise<any> {
//     const pageData = await this.http.get(`${NOTION.page.api}/${NOTION.page.id}`, headerOptions);
//     this._pageData$.next(pageData);
    
//     return pageData;
//   }
}