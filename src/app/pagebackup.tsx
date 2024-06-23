import NavBar from './_components/navbar';

export default async function Page() { 
	try {

			return (
			 <main className="bg-cyan-900 min-h-screen text-white">
			<NavBar />
			 <div className="container mx-auto p-6">
			  <p className="text-lg mb-6">WELCOME TO SUPER EARTH WEBSITE!</p>
			  </div>
			  </main>		 
	);
	} catch (error) {
		console.error('Error fetching data', error);
		return <main>Error fetching data. Please try again later.</main>;
	}
}
