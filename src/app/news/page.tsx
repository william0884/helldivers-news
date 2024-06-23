import NavBar from '../_components/navbar';

type WarID = number;

async function getWarData() {
	const res = await fetch('https://api.helldivers2.dev/raw/api/WarSeason/current/WarID')

	if (!res.ok) {
		throw new Error('Failed to fetch data') 
	}

	return res.json()
}

async function getNewsFeedData(warID) {
	const res = await fetch(`https://api.helldivers2.dev/raw/api/NewsFeed/${warID}`);

	if (!res.ok) {
		throw new Error('Failed to fetch news feed data');
	}
	return res.json();
} 
export default async function Page() { 
	try {
		const warData = await getWarData();
		const newsFeedData = await getNewsFeedData(warData.id);

		const feedItems = newsFeedData.map(feednew => {

			return (
				<div key={feednew.id} className="mb-4 p-4 bg-cyan-800 rounded shadow-lg"> 
				<p className="text-amber-300">{feednew.message}</p>
				</div>
			);
		});

			return (
			 <main className="bg-cyan-900 min-h-screen text-white">
			<NavBar />
			 <div className="container mx-auto p-6">
			  <p className="text-lg mb-6">SUPER EARTH UPDATES HELLDIVERS</p>
			  {feedItems}
			  </div>
			  </main>		 
	);
	} catch (error) {
		console.error('Error fetching data', error);
		return <main>Error fetching data. Please try again later.</main>;
	}
}
