import NavBar from './_components/navbar';
import Image from 'next/image';
import React from 'react';

interface Stratagem {
    id: number;
    codename: string;
    name: string;
    keys: string[];
    uses: string;
    cooldown: number;
    activation: number;
    imageUrl: string;
    groupId: number;
    createdAt: string;
    updatedAt: string;
}

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

interface ApiResponse {
    data: Stratagem[];
}

interface GiphyData {
    title: string;
    url: string;
    images: GiphyImages;
}

interface GiphyResponse {
    data: GiphyData;
}

async function fetchGif(tag: string) {
    try {
        console.log('Fetching GIF...');
        const giphyKey = process.env.GIPHYAPI;
	if (!giphyKey) {
		throw new Error('GIPHYAPI key is not set in environment variables');
	}
	console.log('GIPHY API Key:', giphyKey);
	const randomQueryParam = Math.random().toString(36).substring(7);
        const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${giphyKey}&tag=${tag}&rating=pg-13&random=${randomQueryParam}`);
        if (!response.ok) {
            throw new Error(`There was a Error: ${response.status}`);
        }
        const data: GiphyResponse = await response.json();
        console.log('GIF data:', data);
        return data.data.images.original.url;
    } catch (err) {
        console.error('Some error getting the gif Error fetching GIF:', err);
        return null;
    }
}

const GiphyImage = async ({ tag }: { tag: string }) => {
    const gifUrl = await fetchGif(tag);

    if (!gifUrl) {
        return <div>Error fetching GIF</div>;
    }

    return (
        <Image src={gifUrl} alt="Random GIF" width={200} height={200} />
    );
};

export default async function Page() {
    try {
        const response = await fetch('https://api-hellhub-collective.koyeb.app/api/stratagems');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const apiResponse: ApiResponse = await response.json();
        const stratagems = apiResponse.data;

        // Get a random stratagem
        const randomIndex = Math.floor(Math.random() * stratagems.length);
        const randomStratagem = stratagems[randomIndex];

        return (
            <main className="bg-cyan-900 min-h-screen text-white">
                <NavBar />
                <div className="container mx-auto p-6">
                    <p className="text-lg mb-6">WELCOME TO SUPER EARTH WEBSITE!</p>
                    <div>
                        <h2>{randomStratagem.name}</h2>

                        <p>{randomStratagem.keys}</p>
                        <Image src={randomStratagem.imageUrl} width={150} height={150} alt={randomStratagem.name} />
                        <GiphyImage tag={randomStratagem.name} />
                    </div>
                </div>
            </main>
        );
    } catch (error) {
        console.error('Error fetching data', error);
        return <main>Error fetching data. Please try again later.</main>;
    }
}
