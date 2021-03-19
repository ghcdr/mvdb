import { useEffect, useState, useRef } from 'react';
import { fetchSome } from '../fetch';
import { useGlobalState } from '../state';
import { Loading } from './Loading';
import { MovieList } from './Movie';


export const Discover = () => {

    document.title = "Discover";
    const { storeCheckedGenres, storedGenres, genresList, 
        searchTerm, storeSearchTerm } = useGlobalState();

    const searchString = useRef(searchTerm);
    const checkedGenres = useRef(storedGenres);
    // Backup values on unmount
    useEffect(()=>{  
        return () => {
            storeSearchTerm(searchString.current);
            storeCheckedGenres(checkedGenres.current);
        }
    }, []);
    // Update movie list
    const [movieDisplay, setMovieDisplay] = useState([]);
    const currPage = useRef(1);
    const [maxPage, setMaxPage] = useState(0);
    const [pageLoading, setPageLoading] = useState(false);
    const movieQuery = async () => {
        try {
            // Only wait for other page if it's not the first one
            if(currPage.current > 1) 
                setPageLoading(true);
            let movies = {'results': [], 'total_pages': 0};
            // Upon querying, mix filter results by genre
            // didn't quite figured out yet
            if(false)//searchString.current.length > 0)
            {
                movies = await fetchSome('search/movie', {
                    query: searchString.current.length > 0 ? searchString.current : null,
                    page: currPage.current,
                });
                const filteredMovies = checkedGenres.current.size === 0 ? movies['results'] : movies['results'].filter((mov) => {
                    const {genre_ids, title} = mov;
                    for(let gid in genre_ids)
                        if(checkedGenres.current.has(gid)) return true;
                    return false;
                })
                setMovieDisplay(filteredMovies);
            } else {
                movies = await fetchSome('discover/movie', {
                    with_genres: checkedGenres.current.size > 0 ? Array.from(checkedGenres.current).toString() : null,
                    page: currPage.current,
                });
                setMovieDisplay(movies['results']);
            }
            setMaxPage(movies['total_pages']);
        } catch (err) {
            console.log()
        }
        setPageLoading(false);
    };
    // Hangle inputs
    const handleCheck = (checked, gid) => {
        checked ? checkedGenres.current.add(gid) : checkedGenres.current.delete(gid);
        movieQuery();
    };
    const updateSearchTerm = (term) => {
        searchString.current = term;
        movieQuery();
    };
    useEffect(() => {movieQuery();}, []);
    // Render
    return (
        <article>
            <form>
                <div key='title'>
                    <label>Discover</label>
                </div>
                {}
                <div key='filters'>
                    <input id='title' name='title' type='text' onChange={(inp) => {updateSearchTerm(inp.target.value);}}/>
                    {
                        genresList.map((val) => {
                            const {id: gid, name: gname} = val;
                            return (
                                <div key={gid}>
                                    <label>{gname}</label>
                                    <input name={gname} defaultChecked={checkedGenres.current.has(gname)} type='checkbox' 
                                        onClick={(cbx) => {handleCheck(cbx.target.checked, gid)}}/>
                                </div>
                            )
                        })
                    }
                </div>
            </form>
            <section>
                { 
                    pageLoading ? <Loading/> : (
                        movieDisplay.length === 0 ? <div>Nothing found</div> : (
                            <MovieList movies={movieDisplay}/>
                        )
                    )
                }
            </section>
            {pageLoading || movieDisplay.length === 0 ? <></> : (
                <div>
                    <button key='prev' onClick={() => {if(currPage.current === 1) return; currPage.current -= 1; movieQuery();}}>{'<'}</button>
                    <label key='page'>{currPage.current}</label>
                    <button key='next' onClick={() => {if(currPage.current === maxPage) return; currPage.current += 1; movieQuery();}}>{'>'}</button>
                </div>
            )}
        </article>
    );
};

