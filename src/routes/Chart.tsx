import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import { type } from "os";

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
           series={[
        
           ]}
           xaxis={{
                type:'datetime'
                }}

             options={{
                 chart:{
                     type:"candlestick",
                     height: 350,
                 },
                 yaxis:{
                     tooltip:{
                         enabled:true
                     }
                 }
             }}
            
           />
           )
           }
        </div>
    )
}

export default LineChart;