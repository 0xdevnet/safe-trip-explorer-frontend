import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    widget,
    IChartingLibraryWidget,
    ChartingLibraryWidgetOptions,
    ResolutionString,
} from '../../assets/charting_library';
import { MetadataService } from '../services/metadata.service';
import datafeed from './datafeed';


@Component({
  selector: 'app-tvchart',
  templateUrl: './tvchart.component.html',
  styleUrls: ['./tvchart.component.scss']
})
export class TVchartComponent implements OnInit {

  constructor(private data:MetadataService) { }

    private _symbol: ChartingLibraryWidgetOptions['symbol'] = 'AAPL';
    private _interval: ChartingLibraryWidgetOptions['interval'] = '60' as ResolutionString;
    private _libraryPath: ChartingLibraryWidgetOptions['library_path'] = '/assets/charting_library/';
    private _chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'] = 'https://saveload.tradingview.com';
    private _chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'] = '1.1';
    private _clientId: ChartingLibraryWidgetOptions['client_id'] = 'tradingview.com';
    private _userId: ChartingLibraryWidgetOptions['user_id'] = 'public_user_id';
    private _fullscreen: ChartingLibraryWidgetOptions['fullscreen'] = false;
    private _autosize: ChartingLibraryWidgetOptions['autosize'] = true;
    private _containerId: ChartingLibraryWidgetOptions['container'] = 'tv_chart_container';
    private _tvWidget: IChartingLibraryWidget | null = null;

    public tokens:any = [];

    ngOnInit(){
        this.data.getloading().subscribe(status =>{
            if(status == false){
                this.data.getTokens().subscribe(data=>{
                    this.tokens = data;
                    this.renderChart()
                })
            }
        })

    }

    renderChart() {
        datafeed.storeVars(this.tokens)

        const widgetOptions: ChartingLibraryWidgetOptions = {
            symbol: this._symbol,
            datafeed: datafeed,
            interval: this._interval,
            container: this._containerId,
            theme:'Dark',
            library_path: this._libraryPath,
            locale: 'en',
            disabled_features: ['use_localstorage_for_settings'],
            enabled_features: ['study_templates'],
            charts_storage_url: this._chartsStorageUrl,
            charts_storage_api_version: this._chartsStorageApiVersion,
            client_id: this._clientId,
            user_id: this._userId,
            fullscreen: this._fullscreen,
            autosize: this._autosize,
        };

        const tvWidget = new widget(widgetOptions);
        this._tvWidget = tvWidget;

        tvWidget.onChartReady(() => {
            tvWidget.headerReady().then(() => {
                console.log("Chart Ready!")
            });
        });
    }

    ngOnDestroy() {
        if (this._tvWidget !== null) {
            this._tvWidget.remove();
            this._tvWidget = null;
        }
    }
}