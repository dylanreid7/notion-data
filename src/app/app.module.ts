import { DataPipe } from './data.pipe';
import { NotionService } from './notion.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CaloriesComponent } from './calories/calories.component';
import { NgChartsModule } from 'ng2-charts';
// import { ChartsModule } from '@progress/kendo-angular-charts';
// import { ButtonsModule } from "@progress/kendo-angular-buttons";
// import { InputsModule } from "@progress/kendo-angular-inputs";
import 'hammerjs';



@NgModule({
  declarations: [
    AppComponent,
    DataPipe,
    CaloriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    NgChartsModule,
    MatCheckboxModule
  ],
  providers: [NotionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
