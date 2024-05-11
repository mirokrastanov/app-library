import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const parse = {
    'Home': ['home', '/'],

};

export function NavBtn({ target, check, handler }) {
    const routeTo = parse[target][1];
    const icon = parse[target][0];

    useEffect(() => {
        // console.log(target, check, handler);
    }, [])

    return (
        <li className={`nav-link a-left${check ? '' : ' tooltip-anchor'}`}>
            <Link to={routeTo} onClick={handler} className='nav-a'>
                {check ? target : (<span className="material-symbols-outlined">{icon}</span>)}
            </Link>
            <div className='tooltip'>{target}</div>
        </li>
    );
}