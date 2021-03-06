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
           type="line" 
            series={[
            {
                name:"Price",
                data:data?.map(price => price.close)
            },
            // {
            //     name:"sales",
            //     data:[1,2,3,4,5]
            // }
         ]}
            options={{
                theme:{
                    mode:"dark"
                },
                chart:{
                    height:300,
                    width:500,
                    toolbar:{
                        show:false,
                    },
                    background: "transparent",
                },
                grid:{show:false},
                stroke: {
                    curve:"smooth",
                    width: 4,
                },
                yaxis:{show:false},
                xaxis:{
                    axisBorder:{show:false},
                    labels:{show:false},
                    type:"datetime",
                axisTicks:{show:false},
                categories: data?.map(price => price.time_close)
                 },
                 fill: {type:"gradient",gradient:{gradientToColors:["#0be881"], stops:[0,100]},
                },
                colors:["#0fbcf9"],
                tooltip:{
                    y:{
                        formatter:(value) => `$ ${value.toFixed(3)}`
                    }
                }
            }} 
        />
    )}
    </div>
    );
}

export default LineChart;