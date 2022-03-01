import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";

interface ICoin{
    coinId:string
}

function Chart({coinId}:ICoin){
    const {isLoading,data} = useQuery(["ohlcv",coinId],() => fetchCoinHistory(coinId))
    return <h1></h1>
}

export default Chart;