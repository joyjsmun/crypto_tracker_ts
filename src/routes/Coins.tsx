import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StringDecoder } from "string_decoder";
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

const CoinList = styled.ul``;

const Coin = styled.li`
background-color: white;
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

interface CoinInterface{
    id: string,
    name: string,
    symbol:string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}




function Coins(){
    //array of coin => <CoinInterface[]> 
    const [coins,setCoins] = useState<CoinInterface[]>([]);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        // this func will excute immediately
       (async() => {
          const response = await fetch("https://api.coinpaprika.com/v1/coins");
          const json = await response.json();
          setCoins(json.slice(0,100));
          setLoading(false);
       })();
    },[])

    return<Container>
        <Header>
            <Title>Coin</Title>
        </Header>
        {/* Link will not refresh the page */}
       {loading? <Loader>Loading...</Loader>
       : (<CoinList>
          {coins.map((coin) => (<Coin key={coin.id}>
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
