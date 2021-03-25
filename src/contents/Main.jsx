import { React } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Popular } from './Popular';
import { MovieAbout } from './Movie';
import { Discover } from './Discover';
import { Navigation, GoBack, Footer } from './Navigation';
import { useGlobalState, GlobalStateProvider } from '../state';
import { Loading } from './Loading';
import { Search } from './Search';


export const Main = () => {
    const { waitingConfig } = useGlobalState();
    return (
        waitingConfig ? <Loading/> : 
            <BrowserRouter>
            <Navigation />
                <main className='page'>
                    <div>
                        <Switch>
                            <Route exact path="/" ><Redirect to="/home" /></Route>
                            <Route exact path="/home" component={ Popular } />
                            <Route exact path="/discover" component={ Discover } />
                            <Route exact path="/movies/:id" component={ MovieAbout } />
                            <Route exact path="/search" component={ Search } />
                            <Route path="*" component={ GoBack } />
                        </Switch>
                    </div>
                </main>
                <Footer />
            </BrowserRouter>
    );
}

export const App = () => {
    return (
        <GlobalStateProvider>
            <Main />
        </GlobalStateProvider>
    );
}