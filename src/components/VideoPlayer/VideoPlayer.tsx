import { useEffect, useRef } from "react";
import videojs from "video.js";

// Styles
import "video.js/dist/video-js.css";
import { CSRFHeaders } from "../Forms/CSRFHeaders";
import "./VideoPlayer.css";

interface IVideoPlayerProps {
    options: videojs.PlayerOptions;
}

const initialOptions: videojs.PlayerOptions = {
    controls: true,
    responsive: true,
    controlBar: {
        volumePanel: {
            inline: false
        }
    },
    html5: {
        vhs: {
            withCredentials: true,
            useNetworkInformationApi: true,
            enableLowLatency: true,
            enableLowInitialPlaylist: true,
        }
    }
};
function VideoPlayer(options: IVideoPlayerProps) {
    const videoRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<videojs.Player>(null);

    useEffect(() => {
        if (!playerRef.current) {
            const videoElement = document.createElement("video-js");
            videoElement.classList.add('vjs-default-skin');
            videoElement.classList.add('vjs-layout-medium');
            videoElement.classList.add('vjs-16-9');
            if (videoRef.current instanceof Element) {
                videoRef.current.appendChild(videoElement);
                playerRef.current = videojs(videoElement, {
                    ...initialOptions,
                    ...options
                });
                const techy = playerRef.current.tech();
                techy.on('retryplaylist', async () => {
                    // a 401 occurs when the server-side acces token expires
                    // ask the server to refresh the access token and try again
                    await fetch("https://pet-monitor-api.therealsunnyxu.com/token/refresh", {
                        method: 'POST',
                        credentials: "include",
                        headers: new CSRFHeaders()
                    });
                })
                playerRef.current.crossOrigin('use-credentials');
                if (options.options.autoplay) {
                    playerRef.current.autoplay(options.options.autoplay);
                }
                if (options.options.sources) {
                    playerRef.current.src(options.options.sources);
                }
            }
        }

        if (playerRef.current) {
            if (options.options.autoplay) {
                playerRef.current.autoplay(options.options.autoplay);
            }
            if (options.options.sources) {
                playerRef.current.src(options.options.sources);
            }
        }
    }, [options]);

    useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <div data-vjs-player>
            <div ref={videoRef} className="video-js" />
        </div>
    );
};

export default VideoPlayer;
