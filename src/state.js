import React, { useReducer, useContext, useState, useEffect } from 'react';
import { reducer } from './reducer';
import { fetchSome } from './fetch';


export const GlobalState = React.createContext();

const state0 = {
    storedGenres: new Set([]), // list of checked movie genres
    searchTerm: '',
    navItem: 'home',
};

export const GlobalStateProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, state0);
    const storeCheckedGenres = (genres) => {dispatch({type: 'STORE_CHECKED_GENRES', payload: genres})};
    const storeSearchTerm = (str) => {dispatch({type: 'SET_SEARCH_TERM', payload: str})};
    const setNavItem = (str) => {dispatch({type: 'SET_NAV_ITEM', payload: str})};
    // Fetch available genres
    const [waitingConfig, setWaitingConfig] = useState(true);
    const [waitingGenresList, setWaitingGenresList] = useState(true);
    const [genresList, setGenresList] = useState([]);
    const [API_Config, setAPI_Config] = useState('');
    const preFetch = async () => {
        try {
            setWaitingGenresList(true);
            setWaitingConfig(true);
            const glist = await fetchSome('genre/movie/list');
            const config = await fetchSome('configuration');
            setAPI_Config(config['images']);
            setGenresList(glist['genres']);
        } catch (err) {
            console.log(err)
        }
        setWaitingGenresList(false);
        setWaitingConfig(false);
    }
    useEffect(() => {preFetch();}, []);

    return (
        <GlobalState.Provider value={{
            ...state,
            waitingGenresList,
            waitingConfig,
            storeCheckedGenres,
            storeSearchTerm,
            setNavItem,
            genresList, 
            API_Config,
            }}>
            {children}
        </GlobalState.Provider>
    );
    
};

export const useGlobalState = () => {
    return useContext(GlobalState);
};