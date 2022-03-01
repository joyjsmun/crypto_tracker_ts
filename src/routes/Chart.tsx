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

function Chart({coinId}:ChartProps){
    // 14 of them => array[]
    const {isLoading,data} = useQuery<IHistorical[]>(["ohlcv",coinId],() => fetchCoinHistory(coinId));
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
                axisTicks:{show:false},
            },
            }} 
        />
    )}
    </div>
    );
}

export default Chart;