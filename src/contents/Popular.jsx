import { useState, useEffect } from 'react';
import { MovieList } from './Movie';
import { fetchPopular } from '../fetch';
import { Loading } from './Loading';


export const Popular = () => {

    document.title = "Popular";
    const [waiting, setWaiting] = useState(true);
    const [moviesList, setMoviesList] = useState([]);
    const fetchMovies = async () => {
        try {
            setWaiting(true);
            const movies = await fetchPopular();
            setMoviesList(movies);
        } catch (err) {
            console.log(err)
        }
        setWaiting(false);
    }
    useEffect(() => { fetchMovies(); }, []);
    return (waiting ? <Loading /> : <MovieList movies={moviesList['results']} />);

};