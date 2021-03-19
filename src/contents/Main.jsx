import { React } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Popular } from './Popular';
import { MovieAbout } from './Movie';
import { Discover } from './Discover';
import { Navigation, GoBack } from './Navigation';
import { useGlobalState } from '../state';
import { Loading } from './Loading';


export const Main = () => {
    const {waitingConfig} = useGlobalState();
    return (
        waitingConfig ? <Loading/> : 
        <main>
            <BrowserRouter>
                <Navigation />
                <Switch>
                    <Route exact path="/" ><Redirect to="/home" /></Route>
                    <Route exact path="/home" component={ Popular } />
                    <Route exact path="/discover" component={ Discover } />
                    <Route exact path="/movies/:id" component={ MovieAbout } />
                    <Route path="*" component={ GoBack } />
                </Switch>
            </BrowserRouter>
        </main>
    );
}