import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";



interface ChartProps{
    coinId:string
}

interface IHistorical{
time_open: string;
time_close: string;
open: number;
high:number;
low: number;
close: number;
volume: number;
market_cap: number;
}

function LineChart({coinId}:ChartProps){
    // 14 of them => array[]
    const {isLoading,data} = 
        useQuery<IHistorical[]>(["ohlcv",coinId],() => fetchCoinHistory(coinId),{
            // refetchInterval:10000,
        });
    return (
        <div>
        {isLoading ? 
           ("Chart is loading..." 
           ):(
           <ApexChart 
           type="candlestick"
           series={[
            {
                data:
                [{
                    x: new Date(1538778600000),
                    y: [6629.81, 6650.5, 6623.04, 6633.33]
                  },
                  {
                    x: new Date(1538780400000),
                    y: [6632.01, 6643.59, 6620, 6630.11]
                  },
                  {
                    x: new Date(1538782200000),
                    y: [6630.71, 6648.95, 6623.34, 6635.65]
                  },
                  {
                    x: new Date(1538784000000),
                    y: [6635.65, 6651, 6629.67, 6638.24]
                  },
                  {
                    x: new Date(1538785800000),
                    y: [6638.24, 6640, 6620, 6624.47]
                  }
                ]}


           ]}
             options={{
                theme:{
                    mode:"dark"
                },
                 chart:{
                     type:"candlestick",
                     height: 350,
                     width:500,
                     toolbar:{
                         show:false,
                     },
                     background: "transparent",
                 },
                 yaxis:{
                     tooltip:{
                         enabled:false
                     }
                 },
                 xaxis:{
                     type:"datetime"
                 },
                 title: {
                    text: `${data} Price`,
                    align: "center",
                  },
             }}
            
           />
        )
    }
        </div>
    )
}

export default LineChart;