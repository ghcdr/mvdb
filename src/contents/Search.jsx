import { useState, useRef, useEffect } from 'react';
import { useGlobalState } from '../state';
import { Loading } from './Loading';
import { fetchSome } from '../fetch';
import { MovieList } from './Movie';
import { Paging } from './Navigation';



export const Search = () => {

    document.title = "Search";
    const { searchTerm, storeSearchTerm } = useGlobalState();
    const searchString = useRef(searchTerm);
    // For paging functionality
    const [maxPage, setMaxPage] = useState(0);
    const [pageLoading, setPageLoading] = useState(false);
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
                query: searchString.current.length > 0 ? searchString.current : null,
                page: currentPage,
            });
            console.log(movies)
            setMovieDisplay(movies['results']);
            setMaxPage(movies['total_pages']);
        } catch (err) {
            console.log()
        }
        setPageLoading(false);
    };
    // Register cleanup callback
    useEffect(() => {
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
        <article name='search-results'>
            <input id='title' name='title' type='text' onChange={(inp) => { updateSearchTerm(inp.target.value); }}/>
            { 
                pageLoading ? <Loading/> : (
                    movieDisplay.length === 0 ? <div>Nothing found</div> : (
                        <MovieList movies={movieDisplay}/>
                    )
                )
            }
            {!(pageLoading || movieDisplay.length === 0) && (
                <Paging changePage={changeCurrentPage} curr={currentPage} max={maxPage}/>)}
        </article>
    );

};