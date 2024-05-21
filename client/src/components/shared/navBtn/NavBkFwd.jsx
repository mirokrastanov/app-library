import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const parse = {
    'Back': ['arrow_back'],
    'Forward': ['arrow_forward'],

};

export function NavBkFwd({ target, check, handler }) {
    const icon = parse[target][0];

    useEffect(() => {
        // console.log(target, check, handler);
    }, [])

    return (
        <li className={`nav-link a-left${check ? '' : ' tooltip-anchor'}`}>
            <Link onClick={handler} className="bk-nav-link">
                {check ? `Go ${target}` : (<span className="material-symbols-outlined">{icon}</span>)}
            </Link>
            <div className='tooltip'>Go {target}</div>
        </li>
    );
}