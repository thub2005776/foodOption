import React from "react";
import YouTube from 'react-youtube';

export default function VideoPlayer({videoId}:{videoId:string}) {
    return(
        <YouTube videoId={videoId}/>
    )
}