import React from 'react';

export function EmbeddedVideo({ option }) {
    return (
        <video height="200" controls autoPlay muted loop playsInline>
            <source src={`/vids/${option}.mp4`} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
}
