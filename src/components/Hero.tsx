import { useRef, useState } from "react";

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [hasloading, setHasLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 3;
    const nextVideoRef = useRef(null);
    const upComingVideo = (currentIndex % totalVideos) + 1;

    const handleMiniVideoClick = () => {
        setHasClicked(true);
        setCurrentIndex(upComingVideo);
    };

    const getVideoSrc = (index: number) => {
        return `videos/hero-${index}.mp4`;
    };
    const handleVideoOnLoad = () => {
        setLoadedVideos((prev) => prev + 1);
    };
    return (
        <div className="relativ h-dvh w-screen overflow-x-hidden">
            <div
                id="video-frame"
                className="relativ z-10 h-dvh w-screen overflow-x-hidden rotate-lg bg-blue-75"
            >
                <div>
                    <div className=" mask-clip-path absolute-center z-50 size-64 cursor-pointer overflow-hidden">
                        <div
                            onClick={handleMiniVideoClick}
                            className=" origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
                        >
                            <video
                                ref={nextVideoRef}
                                src={getVideoSrc(upComingVideo)}
                                loop
                                muted
                                id="current-video"
                                className=" size-64 origin-center scale-150 object-cover object-center"
                                onLoadedData={handleVideoOnLoad}
                            ></video>
                        </div>
                    </div>
                    <video
                        className=" absolute-center invisible absolute z-20 siz-64 object-cover object-center"
                        src={getVideoSrc(currentIndex)}
                        ref={nextVideoRef}
                        onLoadedData={handleVideoOnLoad}
                        loop
                        muted
                        id="next-video"
                    ></video>
                    <video
                        src={getVideoSrc(
                            currentIndex === totalVideos - 1 ? 1 : currentIndex
                        )}
                        className=" absolute top-0 left-0 size-full object-cover object-center"
                        autoPlay
                        loop
                        muted
                        onLoadedData={handleVideoOnLoad}
                    ></video>
                </div>
                <h1 className=" spacial-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                    My Site
                </h1>
                <div className=" absolute top-0 left-0 z-40 size-full">
                    <div className=" mt-24 px-5 sm:px-10">
                        <h1 className=" spacial-font hero-heading text-blue-75">
                            Someting New
                        </h1>
                        <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                            Enter the transitional
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
