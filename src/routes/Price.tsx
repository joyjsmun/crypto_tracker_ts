import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers, fetchTickerHistory } from "./api";

interface tickerProp{
    coinId:string;
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
`;
const Title = styled.h1`
    text-align: center;
   color: ${(props) => props.theme.accentColor};
`;
const TickerList = styled.ul`
    padding: none;
    padding-left: inherit;
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
`;
const TickerTab = styled.li`
    border:1px solid;
    border-radius:20px;
    font-size: 20px;
    border-color: ${(props) => props.theme.textColor};
    padding: 15px 60px;
`;

function Price({coinId}:tickerProp){
    const {isLoading,data} = useQuery(["tickerHistory",coinId],() => fetchTickerHistory(coinId));
    console.log(data);
    return(<Wrapper>
        {isLoading ? 
        "Loading... " 
        : 
        (
            <TickerList>
               <Title>{data?.name} Price</Title>
                <TickerTab>Price ${data?.price_usd}</TickerTab>
                <TickerTab>Percent Change(1hr) - {data?.percent_change_1h}%</TickerTab>
                <TickerTab>Percent Change(1d) - {data?.percent_change_24h}%</TickerTab>
                <TickerTab>Percent Change(7d) - {data?.percent_change_7d}%</TickerTab>
            </TickerList>
        )
        }</Wrapper>)
}

export default Price;