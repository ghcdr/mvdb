import { Link } from 'react-router-dom';


export const Navigation = () => {

    return (
        <nav>
            <ul>
                <li>
                    <Link to='/home'>
                        <h2>Home</h2>
                    </Link>
                </li>
                <li>
                    <Link to='/discover'>
                        <h3>Discover</h3>
                    </Link>
                </li>
            </ul>
        </nav>
    );
    
};

export const GoBack = () => {
    return <Link to='/home'><h2>Home</h2></Link>;
};