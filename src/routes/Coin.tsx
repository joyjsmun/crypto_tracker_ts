import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";


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


function Coin(){
    const [loading,setLoading] = useState(true);
    const {coinId} = useParams<RouteParams>();
    const {state} = useLocation<RouteState>();
    const [info,setInfo] = useState();
    const [priceInfo,setPrice] = useState();
    useEffect(() => {
        (async () => {
            const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json()
            const priceData = await(await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            setInfo(infoData);
            setPrice(priceData);

        })();
    },[])
    
    return<Container>
    <Header>
        <Title>{state?.name || "Loading..."}</Title>
    </Header>
    {/* Link will not refresh the page */}
   {loading? <Loader>Loading...</Loader> :null}
   </Container>
   
}

export default Coin;