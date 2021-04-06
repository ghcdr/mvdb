import { Link, useLocation } from 'react-router-dom';
import { matchPath } from 'react-router';
import { useEffect } from 'react';


export const Navigation = () => {

    const location = useLocation();

    useEffect(() => {
        // trigger navbar re-render, to change button highlight
      }, [location]);

    const selected = (p) => { return matchPath(p, {
            path: window.location.pathname,
            exact: true,
            strict: true
        });
    }
    return (
        <nav id='navigation' key='navigation' className='navigation'>
            <Link key='home' className={selected('/home') ? 'nav-item-selected' : 'nav-item'} to='/home'><h1>Home</h1></Link>
            <Link key='discover' className={selected('/discover') ? 'nav-item-selected' : 'nav-item'} to='/discover'><h1>Discover</h1></Link>
            <Link key='search' className={selected('/search') ? 'nav-item-selected' : 'nav-item'} to='/search'><h1>Search</h1></Link>
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
    if(rgb.length > 3) rgb.pop();
    return rgb;
}

const callback = () => {
    const lment = document.getElementById("navigation");
    const color = window.getComputedStyle(lment).backgroundColor;
    const rgb = getRGB(color);
    if (document.documentElement.scrollTop > 100) {
        lment.style.setProperty('background-color', 'rgba('+ rgb.join(', ') + ', 0.5)');
    } 
    else
    if (document.documentElement.scrollTop < 100) {
        lment.style.setProperty('background-color', 'rgba('+ rgb.join(', ') + ', 1.0)');
    }
}

export const Paging = ({ changePage, curr, max, reach = 5 }) => {
    // shifts every time the page changes, like
    // 1,'2',3 -> 2,'3',4
    const size = max < 2 * reach ? max : 2 * reach;
    const offset = curr < reach ? 1 : max - curr < reach ? Math.max(0, max - 2 * reach) + 1 : curr - reach + 1;
    return (
        <nav role='paging' className='container text-center'>
            <ul role='paging-buttons' className='pagination centered'>
                <li className='page-item'>
                    <a className='page-item' href='#' tabIndex='-1' onClick={() => { if (curr !== 1) changePage(curr - 1) }}>
                        Previous
                    </a>
                </li>
                {
                    Array(size).fill().map((_, i) => {
                        const num = offset + i;
                        return (
                            <li key={i} className={'page-item' + (num === curr ? ' active' : '')}>
                                <a className='page-link' href='#'
                                    onClick={() => { changePage(num) }}
                                >{num}</a>
                            </li>
                        )
                    })
                }
                <li className='page-item'>
                    <a className='page-item' href='#' onClick={() => { if (curr !== max) changePage(curr + 1) }}>
                        Next
                    </a>
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