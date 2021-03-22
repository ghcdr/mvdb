import { Link } from 'react-router-dom';
import { useGlobalState } from '../state';


export const Navigation = () => {
    const { navItem } = useGlobalState();

    return (//navbar-fixed-top
        <nav className='navbar navbar-inverse'>
            <div className='container-fluid'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#myNavbar'>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>                        
                    </button>
                    <Link to='/home' className='navbar-brand'>Movies and stuff</Link>
                </div>
                <div className='collapse navbar-collapse' id='myNavbar'>
                    <ul className='nav navbar-nav'>
                        <li className={'page-item'}><Link to='/home'>Home</Link></li>
                        <li className={'page-item'}><Link to='/discover'>Discover</Link></li>
                        <li className={'page-item'}><Link to='/search'>Search</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )

};

export const Paging = ({changePage, curr, max, reach = 7}) => {

    // Simple logic to cope with a range of values, which shifts every time the page changes, like
    // 1,'2',3 -> 2,'3',4
    const offset = Math.max(curr - reach, 0) + 1;
    const correct = curr + reach > max ? reach - (curr + reach - max) : 0;
    return (
        <nav className='container text-center'>
            <ul className='pagination centered'>
                <li className='page-item'>
                    <a className='page-item' tabIndex='-1' onClick={() => { if(curr !== 1) changePage(curr - 1)} }>Previous</a>
                </li>
                {
                    Array(reach*2 - correct).fill().map((_, i) => {
                        const num = offset + i;
                        return (
                        <li key={i} className={'page-item' + (num === curr ? ' active' : '')}>
                            <a className='page-link'
                            onClick={() => {changePage(num)} }
                            >{num}</a>
                        </li>
                        )
                    })
                }
                <li className='page-item'>
                    <a className='page-item' onClick={() => { if(curr !== 1) changePage(curr + 1)} }>Next</a>
                </li>
            </ul>
        </nav>
    );

};

export const GoBack = () => {
    return <Link to='/home'><h2>Home</h2></Link>;
};