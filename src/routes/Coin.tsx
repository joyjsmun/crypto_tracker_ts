import { useEffect, useState } from "react";
import {Helmet} from "react-helmet";
import { useQuery } from "react-query";
import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import Chart from "./Chart";
import Price from "./Price";


const Title = styled.h1`
    color:${props => props.theme.accentColor};
`

const Container = styled.div`
max-width: 480px;
margin: 0 auto;
padding:0px 20px;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;

`;

const Loader = styled.span`
    text-align: center;
    display: block;
`


interface RouteParams {
    coinId:string;
}

interface RouteState{
    name:string,
}

interface InfoData{
    
    id:string ;
    name:    string ;
    symbol:    string ;
    rank:    number ;
    is_new:    boolean ;
    is_active:    boolean ;
    type:    string ;
    description:    string ;
    message:    string ;
    open_source:    boolean ;
    started_at:    string ;
    development_status:    string ;
    hardware_wallet:    boolean ;
    proof_type:    string ;
    org_structure:    string ;
    hash_algorithm:    string ;
    first_data_at:    string ;
    last_data_at:    string;
}

interface PriceData{
    id:string;
    name:   string;
    symbol:   string;
    rank:   number;
    circulating_supply:   number;
    total_supply:   number;
    max_supply:   number;
    beta_value:   number;
    first_data_at:   string;
    last_updated:   string;
    quotes:  {
        USD:{
        ath_date: string;
        ath_price :number;
        market_cap :number;
        market_cap_change_24h :number;
        percent_change_1h :number;
        percent_change_1y :number;
        percent_change_6h :number;
        percent_change_7d :number;
        percent_change_12h :number;
        percent_change_15m :number;
        percent_change_24h :number;
        percent_change_30d :number;
        percent_change_30m :number;
        percent_from_price_ath :number;
        price :number;
        volume_24h :number;
        volume_24h_change_24h :number;
        }
    };
}

const OverView = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0,0,0,0.4);
    padding: 10px 20px;
    border-radius:10px;
`

const OverViewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`
const Description = styled.p`
margin: 20px 0px;
`

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    margin: 25px 0px;
    gap:10px;
`

const Tab = styled.div<{isActive:boolean}>`
    text-align: center;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 400;
    background-color: rgba(0,0,0,0.3);
    padding: 7px 0px;
    border-radius: 10px;
    color:${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
    a{
        display: block;
    }
`
const Button = styled.button`
  background-color: ${(props) => props.theme.accentColor}; /* Green */
  border: none;
  color: white;
  padding: 10px 12px;
  border-radius: 20px;
  text-align: center;
  text-decoration: none;
  margin-right: 20px ;
`

function Coin(){
    const {coinId} = useParams<RouteParams>();
    const {state} = useLocation<RouteState>();
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");

    // query need the unique key and loading as well
    const {isLoading:infoLoading,data:infoData} = useQuery<InfoData>(["info", coinId],() => fetchCoinInfo(coinId));
    const {isLoading:tickerLoading,data:tickersData} = 
        useQuery<PriceData>(["tickers", coinId],() => fetchCoinTickers(coinId),{
            refetchInterval:5000,
        });

   
    // const [loading,setLoading] = useState(true);
    // const [info,setInfo] = useState<InfoData>();
    // const [priceInfo,setPriceInfo] = useState<PriceData>();
    // useEffect(() => {
    //     (async () => {
    //         const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json()
    //         const priceData = await(await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
    //         setInfo(infoData);
    //         setPriceInfo(priceData);
    //         setLoading(false);
    //     })();
    // },[coinId]);

    // loading can be either one 
   const loading = infoLoading || tickerLoading;

    return<Container>
        <Helmet>
            <title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title>
        </Helmet>
    <Header>
        <Button><Link to="/">Back to Coin List &rarr;</Link></Button>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
     
    {/* Link will not refresh the page */}
   {loading? <Loader>Loading...</Loader> : (
       <>
       <OverView>
           <OverViewItem>
               <span>Rank:</span>
               <span>{infoData?.rank}</span>
           </OverViewItem>
           <OverViewItem>
               <span>Symbol:</span>
               <span>{infoData?.symbol}</span>
           </OverViewItem>
           <OverViewItem>
               <span>Price:</span>
               <span>${tickersData?.quotes.USD.price}</span>
           </OverViewItem>
       </OverView>
       <Description>{infoData?.description}</Description>
           <OverView>
            <OverViewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverViewItem>
            <OverViewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverViewItem>
          </OverView>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/Chart`} >Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
                <Link to={`/${coinId}/Price`}>Price</Link>
            </Tab>
          </Tabs>
          <Switch>
              <Route path={`/:coinId/price`}>
                  <Price coinId={coinId} />
              </Route>
              <Route path={`/:coinId/chart`}>
                  <Chart coinId={coinId}/>
              </Route>
          </Switch>
       </>
   )}
   </Container>
   
}

export default Coin;