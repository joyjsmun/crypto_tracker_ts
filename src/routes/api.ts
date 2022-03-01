const BASE_URL = `https://api.coinpaprika.com/v1`

export async function fetchCoins(){
    return fetch(`${BASE_URL}/coins`).then((response) => 
    response.json()
    );
}

//define coinId's typeof
export async function fetchCoinInfo(coinId:string){
    return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => response.json());
}

export async function fetchCoinTickers(coinId:string){
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) => response.json());
}

export async function fetchCoinHistory(coinId:string){
    // right now
    const endDate = Math.floor(Date.now()/1000);
    // 60s * 60m * 24hr*7d = before 7days till now(two weeks ago)
    const startDate = endDate - 60*60*24*7*3;
    return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`).then((response)  => response.json());
}