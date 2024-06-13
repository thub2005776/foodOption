import React from 'react';
import YouTube from 'react-youtube';

export default function VideoPlayer({videoId}:{videoId:string}) {
    return (
        <div>
            <YouTube videoId={videoId} />
        </div>
    );
};