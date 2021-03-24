import { useEffect, useState, useRef } from 'react';
import { fetchSome } from '../fetch';
import { useGlobalState } from '../state';
import { Loading } from './Loading';
import { MovieList } from './Movie';
import { Paging } from './Navigation';



export const Discover = () => {

    document.title = "Discover";
    const { storeCheckedGenres, storedGenres, genresList } = useGlobalState();
    // Restore checked genres
    const checkedGenres = useRef(storedGenres);
    // Backup values on unmount
    useEffect(()=>{
        return () => {
            storeCheckedGenres(checkedGenres.current);
        }
    }, []);
    // Update movie list
    const [movieDisplay, setMovieDisplay] = useState([]);
    const [maxPage, setMaxPage] = useState(0);
    const [pageLoading, setPageLoading] = useState(false);
    const [currentPage, changeCurrentPage] = useState(1);
    const movieQuery = async () => {
        try {
            // Only wait for other page if it's not the first one
            if(currentPage > 1) 
                setPageLoading(true);
            //let movies = {'results': [], 'total_pages': 0};
            const movies = await fetchSome('discover/movie', {
                with_genres: checkedGenres.current.size > 0 ? Array.from(checkedGenres.current).toString() : null,
                page: currentPage,
            });
            setMovieDisplay(movies['results']);
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
    useEffect(() => {movieQuery();}, [currentPage]);
    // Render
    return (
        <article>
            <div class='filters' key='filters'>
                {
                    genresList.map((val) => {
                        const {id: gid, name: gname} = val;
                        return (
                            <div key={gid} className='genre'>
                                <label>{gname}</label>
                                <input name={gname} defaultChecked={checkedGenres.current.has(gid)} type='checkbox' 
                                    onClick={(cbx) => {handleCheck(cbx.target.checked, gid)}}/>
                            </div>
                        )
                    })
                }
            </div>
            <section>
                { 
                    pageLoading ? <Loading/> : (
                        movieDisplay.length === 0 && checkedGenres.current.size > 0 ? <div className='nothing-found'>Nothing found</div> : (
                            <MovieList movies={movieDisplay}/>
                        )
                    )
                }
            </section>
            {/*!(pageLoading || movieDisplay.length === 0) && (
                <div>
                    <button key='prev' onClick={() => {if(currPage.current === 1) return; currPage.current -= 1; movieQuery();}}>{'<'}</button>
                    <label key='page'>{currPage.current}</label>
                    <button key='next' onClick={() => {if(currPage.current === maxPage) return; currPage.current += 1; movieQuery();}}>{'>'}</button>
                </div>
            )*/}
            {!(pageLoading || movieDisplay.length === 0) && (
                <Paging changePage={changeCurrentPage} curr={currentPage} max={maxPage}/>)}
        </article>
    );
};

