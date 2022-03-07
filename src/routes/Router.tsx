import {BrowserRouter, Switch,Route} from "react-router-dom"
import Coin from "./Coin";
import Coins from "./Coins";

interface IRouteProps{
    toggleDark:() => void;
    isDark:boolean;
}

function Router({toggleDark,isDark}:IRouteProps){
    return(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route  path="/:coinId">
                    <Coin isDark={isDark}/>
                </Route>
                <Route path="/">
                    <Coins toggleDark={toggleDark} />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router;