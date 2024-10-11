interface IAudioStoryProps {
    src: string;
}

function AudioStory(props: IAudioStoryProps) {
    return <audio src={props.src} autoPlay loop />;
}

export default AudioStory;
