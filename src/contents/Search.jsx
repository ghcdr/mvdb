import { useState, useRef, useEffect } from 'react';
import { useGlobalState } from '../state';
import { Loading, NothingFound } from './Loading';
import { fetchSome } from '../fetch';
import { MovieList } from './Movie';
import { Paging } from './Navigation';



export const Search = () => {

    document.title = "Search";
    const { searchTerm, storeSearchTerm } = useGlobalState();
    const searchString = useRef(searchTerm);
    // For paging functionality
    const [maxPage, setMaxPage] = useState(0);
    // Set true, to avoid displaying that nothing was found at first
    const [pageLoading, setPageLoading] = useState(true);
    const [currentPage, changeCurrentPage] = useState(1);
    // Where query results are stored
    const [movieDisplay, setMovieDisplay] = useState([]);
    // Async search
    const movieQuery = async () => {
        try {
            // Only wait for other page if it's not the first one
            if (currentPage > 1)
                setPageLoading(true);
            const movies = await fetchSome('search/movie', {
                query: searchString.current.length > 0 ? searchString.current : 'A',
                page: currentPage,
            });
            setMovieDisplay(movies['results']);
            setMaxPage(movies['total_pages']);
        } catch (err) {
            console.log(err)
        }
        setPageLoading(false);
    };
    // Register cleanup callback
    useEffect(() => {
        movieQuery();
        return () => {
            storeSearchTerm(searchString.current);
        }
    }, []);
    // Handle input
    const updateSearchTerm = (term) => {
        searchString.current = term;
        movieQuery();
    };
    // Render
    return (
        <article id='search' className='search-results'>
            <div className='search-bar-frame' >
                <input id='title' className='search-bar' name='title' type='text' placeholder="Search" onChange={(inp) => { updateSearchTerm(inp.target.value); }}/>
            </div>
            { 
                pageLoading ? <Loading/> : (
                    movieDisplay.length === 0 ? <NothingFound /> : (
                        <MovieList movies={movieDisplay}/>
                    )
                )
            }
            {!(pageLoading || movieDisplay.length === 0) && (
                <Paging changePage={changeCurrentPage} curr={currentPage} max={maxPage}/>)}
        </article>
    );

};