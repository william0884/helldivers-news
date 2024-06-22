import React from 'react';

function NavBar() {
	return (
		<nav className="bg-gray-800 p-4">
			<div className="container mx-auto flex justify-between items-center">
				<a href="/" className="text-lg font-bold text-red-200"><img src="/logo.png" alt="logo" className="h-12" /> </a>
				<div>
			
					<a href="/news" className="text-gray-300 hover:text-red-500 px-3">News</a>
					<a href="/assignments" className="text-gray-300 hover:text-red-500 px-3">Assignments</a>
					<a href="/join" className="text-gray-300 hover:text-red-500 px-3">Join</a>
					<a href="/report" className="text-gray-300 hover:text-red-500 px-3">Report</a>
				</div>
			</div>
		</nav>
	);
}

export default NavBar;
