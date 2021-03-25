import { Link } from 'react-router-dom';
import { useGlobalState } from '../state';


export const Navigation = () => {

    const { navItem } = useGlobalState();
    return (
        <nav id='navigation' key='navigation' className='navigation'>
            <Link key='home' className='nav-item' to='/home'><h1>Home</h1></Link>
            <Link key='discover' className='nav-item' to='/discover'><h1>Discover</h1></Link>
            <Link key='search' className='nav-item' to='/search'><h1>Search</h1></Link>
        </nav>
    );

};

window.onscroll = () => callback();

const getRGB = (str) => {
    const isNum = /[0-9.]/;
    let l = '', rgb = [];
    for(let i = 0; i < str.length; ++i) {
        while(isNum.test(str[i]) && i < str.length) {
            l += str[i];
            ++i;
        }
        if(l.length > 0) {
            rgb.push(Number(l));
            l = '';
        }
    }
    return rgb;
}

const callback = () => {
    const lment = document.getElementById("navigation");
    const color = window.getComputedStyle(lment).backgroundColor;
    const rgb = getRGB(color);
    if(rgb.length > 3) rgb.pop();
    if (document.documentElement.scrollTop > 100) {
        lment.style.setProperty('background-color', 'rgba('+ rgb.join(', ') + ', 0.5)');
    } 
    else
    if (document.documentElement.scrollTop < 100) {
        lment.style.setProperty('background-color', 'rgba('+ rgb.join(', ') + ', 1.0)');
    }
}

export const Paging = ({ changePage, curr, max, reach = 7 }) => {

    // Simple logic to cope with a range of values, which shifts every time the page changes, like
    // 1,'2',3 -> 2,'3',4
    const offset = Math.max(curr - reach, 0) + 1;
    const correct = curr + reach > max ? reach - (curr + reach - max) : 0;
    return (
        <nav className='container text-center'>
            <ul className='pagination centered'>
                <li className='page-item'>
                    <a className='page-item' tabIndex='-1' onClick={() => { if (curr !== 1) changePage(curr - 1) }}>Previous</a>
                </li>
                {
                    Array(reach * 2 - correct).fill().map((_, i) => {
                        const num = offset + i;
                        return (
                            <li key={i} className={'page-item' + (num === curr ? ' active' : '')}>
                                <a className='page-link'
                                    onClick={() => { changePage(num) }}
                                >{num}</a>
                            </li>
                        )
                    })
                }
                <li className='page-item'>
                    <a className='page-item' onClick={() => { if (curr !== 1) changePage(curr + 1) }}>Next</a>
                </li>
            </ul>
        </nav>
    );

};

export const GoBack = () => {
    return <Link to='/home'><h2>Home</h2></Link>;
};

export const Footer = () => {
    return <div className='footer'>footer</div>;
}