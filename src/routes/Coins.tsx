import { useState } from "react";
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
height:10vh;
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
    const [coins,setCoins] = useState<CoinInterface[]>([]);

    return<Container>
        <Header>
            <Title>Coin</Title>
        </Header>
        {/* Link will not refresh the page */}
        <CoinList>
          {coins.map((coin) => (<Coin key={coin.id}>
            <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
          </Coin>))}
        </CoinList>
    </Container>
}

export default Coins;
