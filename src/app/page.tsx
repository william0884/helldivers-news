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

	return (
		<main>
		<p>The current war ID is {warData.id}</p>
		<p>News feed data: {JSON.stringify(newsFeedData)}</p>
		</main>
	);
	} catch (error) {
		console.error('Error fetching data', error);
		return (<main>Error fetching data. Please try again later.</main>);
	}
}
