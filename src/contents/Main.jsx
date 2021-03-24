import { React } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Popular } from './Popular';
import { MovieAbout } from './Movie';
import { Discover } from './Discover';
import { Navigation, GoBack } from './Navigation';
import { useGlobalState, GlobalStateProvider } from '../state';
import { Loading } from './Loading';
import { Search } from './Search';


export const Main = () => {
    const { waitingConfig, setNavItem } = useGlobalState();
    return (
        waitingConfig ? <Loading/> : 
        <main>
            <BrowserRouter>
                <Navigation />
                <div className='body'>
                    <Switch>
                        <Route exact path="/" ><Redirect to="/home" /></Route>
                        <Route exact path="/home" component={ Popular }  render = { () =>{ console.log('ass'); }}/>
                        <Route exact path="/discover" component={ Discover } onUpdate={() => setNavItem('discover')}/>
                        <Route exact path="/movies/:id" component={ MovieAbout } onUpdate={() => setNavItem('')}/>
                        <Route exact path="/search" component={ Search } onUpdate={() => setNavItem('search')}/>
                        <Route path="*" component={ GoBack } onUpdate={() => setNavItem('')}/>
                    </Switch>
                </div>
            </BrowserRouter> 
        </main>
    );
}

export const App = () => {
    return (
        <GlobalStateProvider>
            <Main />
        </GlobalStateProvider>
    );
}