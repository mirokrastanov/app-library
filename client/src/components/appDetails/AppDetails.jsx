import './AppDetails.css';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function AppDetails() {
    // grab route param id
    // 1 - 9 small | 10 - 13 large

    const { id } = useParams();

    useEffect(() => {
        console.log(id);
    }, [])

    return (
        <div>AppDetails</div>
    )
}

export default AppDetails;