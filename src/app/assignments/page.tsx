import Image from 'next/image';

interface GiphyImage {
    url: string;
    width: string;
    height: string;
    size: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
}

interface GiphyImages {
    original: GiphyImage;
}

interface GiphyData {
    title: string;
    url: string;
    images: GiphyImages;
}

interface GiphyResponse {
    data: GiphyData;
}

async function fetchGif() {
    try {
        console.log('Fetching GIF...');
        const response = await fetch('https://api.giphy.com/v1/gifs/random?api_key=q1W8wQqUSi0pq0iqMZVYpSoNKPmTqnhH&tag=helldivers&rating=pg-13');
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data: GiphyResponse = await response.json();
        console.log('GIF data:', data);
        return data.data.images.original.url;
    } catch (err) {
        console.error('Error fetching GIF:', err);
        return null;
    }
}

export default async function GiphyImage() {
    const gifUrl = await fetchGif();

    if (!gifUrl) {
        return <div>Error fetching GIF</div>;
    }

    return (
        <Image src={gifUrl} alt="Random GIF" width={200} height={200} />
    );
}
