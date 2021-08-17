import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


//Material Imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { DailyVolumeComponent } from './utils/daily-volume/daily-volume.component';
//misc imports
import { ChartsModule } from 'ng2-charts';
import { LinksComponent } from './utils/links/links.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TVchartComponent } from './tvchart/tvchart.component';
//service imports

import { HttpClientModule } from '@angular/common/http';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { ClipboardModule } from 'ngx-clipboard';
import { TradesComponent } from './trades/trades.component';
import { BuysellPipe } from './utils/buysell.pipe';


const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'top',
			distance: 12,
			gap: 10
		}
  }
}

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    ExplorerComponent,
    DailyVolumeComponent,
    LinksComponent,
    FooterComponent,
    NotFoundComponent,
    TVchartComponent,
    TradesComponent,
    BuysellPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    ChartsModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),
    ClipboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
