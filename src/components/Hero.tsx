import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 3;
    const nextVideoRef = useRef<HTMLVideoElement>(null);
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
    useEffect(() => {
        if (loadedVideos === totalVideos) {
            setIsLoading(false);
        }
    });
    useGSAP(
        () => {
            if (hasClicked) {
                gsap.set("#next-video", { visibility: "visible" });
                gsap.to("#next-video", {
                    transformOrigin: "center",
                    scale: 1,
                    widows: "100%",
                    height: "100%",
                    duration: 1,
                    ease: "power1.inOut",
                    onStart: () => {
                        if (nextVideoRef.current) {
                            nextVideoRef.current.play();
                        }
                    },
                });
                gsap.from("#current-video", {
                    transformOrigin: "center",
                    scale: 0,
                    duration: 1.5,
                    ease: "power.inOut",
                });
            }
        },
        { dependencies: [currentIndex], revertOnUpdate: true }
    );
    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: "polygon(14% 0%, 70% 0%, 90% 90%, 0% 100%)",
            borderRadius: "0 0 40% 10%",
        });
        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0 0 0 0",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "bottom center",
                scrub: true,
            },
        });
    });

    return (
        <div className="relativ h-dvh w-screen overflow-x-hidden">
            {isLoading && (
                <div className=" flex-center absolute z-[100] h-dvh w-screen bg-red-50 overflow-hidden">
                    <div className="w-12 h-12 animate-spin rounded-full border-4 border-t-4 border-t-blue-100 border-blue-300"></div>
                </div>
            )}
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
                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                    G<b>A</b>MING
                </h1>
                <div className=" absolute top-0 left-0 z-40 size-full">
                    <div className=" mt-24 px-5 sm:px-10">
                        <h1 className=" spacial-font hero-heading text-blue-75">
                            Someting New
                        </h1>
                        <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                            Enter the transitional
                        </p>
                        <Button
                            id="watch-trailer"
                            title="watch-trailer"
                            leftIcon={<TiLocationArrow />}
                            containerClass="bg-yellow-300 flex-center gap-1"
                        />
                    </div>
                </div>
            </div>
            <h1 className="special-font hero-heading absolute bottom-5 right-5 z-0 text-black">
                G<b>A</b>MING
            </h1>
        </div>
    );
};

export default Hero;
