import NavBar from './_components/navbar';

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

interface ApiResponse {
    data: Stratagem[];
}

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
			<p>{randomStratagem.imageUrl}</p>
                        {/* Render other fields as necessary */}
                    </div>
                </div>
            </main>
        );
    } catch (error) {
        console.error('Error fetching data', error);
        return <main>Error fetching data. Please try again later.</main>;
    }
}
