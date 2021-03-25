import { React, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchOne } from '../fetch';
import { Loading } from './Loading';
import { useGlobalState } from '../state';


// TODO: add a default image in case of poster/backdrop absence
const image_unavailable = "";

export const MovieAbout = () => {

    // Fetch movie Info
    const { id } = useParams();
    const [waiting, setWaiting] = useState(true);
    const [details, setDetails] = useState([]);
    const fetchDetails = async () => {
        try {
            setWaiting(true);
            const data = await fetchOne(id);
            setDetails(data);
        } catch(err) {
            console.log(`Failed fetching movie details (mid: ${id})`);
        }
        setWaiting(false);
    }
    useEffect(() => {fetchDetails()}, []);
    const {title: movieTitle, poster_path: poster, backdrop_path, overview: about} = details;
    document.title = movieTitle;
    // Set image url
    const {API_Config} = useGlobalState();
    const {secure_base_url, poster_sizes, backdrop_sizes} = API_Config;
    const poster_url = secure_base_url + '/' + poster_sizes[1];
    const backdrop_url = secure_base_url + '/' + backdrop_sizes[1];
    if(waiting) 
        return (<Loading />);
    else
    {
        document.title = movieTitle;
        console.log(details)
        return (
            <section className='movie-about'>
                <div className='backdrop'>
                    <img src={backdrop_url + backdrop_path} alt={'backdrop: ' + movieTitle} />
                </div>
                <h4 className='title'>{movieTitle}</h4>
                <p className='about'>{about}</p>
            </section>
        );
    }

};


export const MovieList = ({movies}) => {

    const {API_Config} = useGlobalState();
    const {secure_base_url, poster_sizes} = API_Config;
    const url = secure_base_url + '/' + poster_sizes[2];
    return (
        <section className='canvas'>
            <div className='grid'>
                {movies.map((mov) => {
                        const {id: mid, title: movieTitle, poster_path: poster} = mov;
                        return (
                            <div key={mid} className='cell'>
                                <Link to={`/movies/${mid}`} key={mid}>
                                    <img src={poster===null ? image_unavailable : url + poster} alt={'poster: ' + movieTitle}/>
                                    <h4>{movieTitle}</h4>
                                </Link>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );

};