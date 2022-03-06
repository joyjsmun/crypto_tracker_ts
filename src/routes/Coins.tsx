import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";

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

const CoinList = styled.ul``;

const Coin = styled.li`
background-color: ${(props) => props.theme.textColor};
color:${(props) => props.theme.bgColor};
border-radius: 15px;
margin-bottom: 10px;
a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover{
      a{
          color:${(props) => props.theme.accentColor}
      }
  }

`;

const Loader = styled.span`
    text-align: center;
    display: block;

`

const Img = styled.img`
    width:30px;
    height:30px;
`

const CoinWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left:20px;
`


interface ICoin{
    id: string,
    name: string,
    symbol:string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}
 


function Coins(){
    //unique key, fetch funtcion 
    //react query keeps the data as cache
    const {isLoading,data} = useQuery<ICoin[]>("allCoins",fetchCoins);

    return<Container>
        <Helmet>
            <title>Coins</title>
        </Helmet>
        <Header>
            <Title>Coins</Title>
        </Header>
        {/* Link will not refresh the page */}
       {isLoading? <Loader>Loading...</Loader>
       : (<CoinList>
          {data?.slice(0,100).map((coin) => (<Coin key={coin.id}>
            <CoinWrapper>
            <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
            <Link 
            to={{
                pathname:`/${coin.id}`,
                state:{name:coin.name},
            }}
            >{coin.name} &rarr;</Link>
            </CoinWrapper>
          </Coin>))}
        </CoinList>)}
    </Container>
}

export default Coins;
