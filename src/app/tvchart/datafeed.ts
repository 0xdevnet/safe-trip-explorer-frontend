import axios from 'axios';
import { environment } from 'src/environments/environment';

let recentBars: any = [];
const configurationData = {
  supported_resolutions: ['1', '5', '15', '30', '60', '240', '1D', '1W', '1M']
};

let symbolData: any = {}

const datafeed = {
  storeVars: (params: any) => {
    symbolData = params
  },
  onReady: (callback: any) => {
    setTimeout(() => callback(configurationData));
  },
  resolveSymbol: async (symbolName: any, onSymbolResolvedCallback: any, onResolveErrorCallback: any) => {

    if (symbolData == {}) {
      onResolveErrorCallback();
    } else {
      const symbol = {
        ticker: symbolName,
        name: `${symbolData.pair_base_name}/${symbolData.pair_quote_name}`,
        session: '24x7',
        timezone: 'UTC',
        minmov: 1,
        pricescale: 100000000,
        has_intraday: true,
        intraday_multipliers: ['1', '5', '15', '30', '60'],
        has_empty_bars: true,
        has_weekly_and_monthly: true,
        supported_resolutions: configurationData.supported_resolutions,
        volume_precision: 1,
        data_status: 'streaming',
      }
      //onSymbolResolvedCallback(symbol);
      setTimeout(() => onSymbolResolvedCallback(symbol));
    }
  },
  // This method is used by the charting library to get historical data for the symbol. 
  getBars: async (symbolInfo: any, resolution: any, periodParams: any, onHistoryCallback: any, onErrorCallback: any) => {
    try {

      let params = {
        'resolution': resolution,
        'count': periodParams.countBack,
        'till': periodParams.to,
        'base': symbolData.pair_base_address,
        'quote': symbolData.pair_quote_address
      }
      const url = environment.server_url + "api/tokens/chartdata/"
      const response2 = await axios.get(url, { params: params })

      let bars = response2.data.data.map((el: any) => ({
        time: el.time * 1000,
        low: el.low,
        high: el.high,
        open: Number(el.open),
        close: Number(el.close),
        volume: el.volume
      }))

      if (bars.length) {
        if (periodParams.firstDataRequest) {
          recentBars = bars.slice(-10)
        }
        console.log("callback-onhistory with data")
        onHistoryCallback(bars, { noData: false });
      } else {
        onHistoryCallback([], { noData: true });
      }
    }
    catch (error) {
      console.error(error)
      //onErrorCallback();  //prevent infinite loop in development
    }

  },
  subscribeBars: (symbolInfo: any, resolution: any, onRealtimeCallback: any, subscribeID: any, onResetCacheNeededCallback: any) => { },
  unsubscribeBars: (subscribeID: any) => { },
  searchSymbols: (userInput: string, exchange: string, symbolType: string, onResult: any) => { }
};

export { datafeed, recentBars }