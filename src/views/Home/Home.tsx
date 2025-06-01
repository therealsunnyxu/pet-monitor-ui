import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import BaseView from "../BaseView/BaseView";

const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    sources: [
        {
            src: "https://pet-monitor-api.therealsunnyxu.com/hls/stream.m3u8",
            type: 'application/x-mpegurl'
        }
    ],
};
function Home() {
    return (
        <BaseView>
            <section>
                <VideoPlayer options={videoJsOptions} />
            </section>
        </BaseView>
    );
}

export default Home;