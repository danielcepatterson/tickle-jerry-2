// src/App.tsx

import { useState } from "react";
import "./App.css";

// Verified Wikimedia Commons photos of Jerry Garcia
const JERRY_PHOTOS = [
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Grateful_Dead_-_Jerry_Garcia.jpg",
		caption: "Jerry Garcia — Grateful Dead",
	},
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Jerry-Garcia-01cropped.jpg",
		caption: "Jerry Garcia",
	},
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Jerry-Mickey_at_Red_Rocks_taken_08-11-87.jpg",
		caption: "Jerry Garcia & Mickey Hart at Red Rocks, 1987",
	},
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/2/24/Jerry_Garcia%27s_Lightning_Bolt_guitar.jpg",
		caption: "Jerry Garcia's iconic Lightning Bolt guitar",
	},
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Jerry_Garcia_by_Jay_Blakesberg.jpg",
		caption: "Jerry Garcia — photo by Jay Blakesberg",
	},
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/0/04/Grateful_Dead_-_Jerry_Garcia_%28cropped%29.jpg",
		caption: "Jerry Garcia — Grateful Dead (cropped)",
	},
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Jerry_Garcia_at_Red_Rocks_taken_1987-08-11.jpg",
		caption: "Jerry Garcia at Red Rocks, August 11, 1987",
	},
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Jerry_Garcia%27s_Rosebud.jpg",
		caption: "Jerry Garcia's 'Rosebud' guitar",
	},
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/9/92/Detail_of_Jerry_Garcia_%27Rosebud%27_Guitar_-_Rock_%26_Roll_Hall_of_Fame_and_Museum_-_Cleveland_-_Ohio_-_USA_%2815304059750%29.jpg",
		caption: "Jerry Garcia's 'Rosebud' guitar detail — Rock & Roll Hall of Fame",
	},
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Detail_of_Jerry_Garcia_Top_Hat_Guitar_-_Rock_%26_Roll_Hall_of_Fame_and_Museum_-_Cleveland_-_Ohio_-_USA_%2815304055920%29.jpg",
		caption: "Jerry Garcia's 'Top Hat' guitar detail — Rock & Roll Hall of Fame",
	},
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/d/db/Jerry_Garcia%27s_%22Wolf%22_Guitar_%281973%2C_serial_no._D._Irwin_001%29_by_Doug_Irwin_-_Play_It_Loud._MET_%282019-05-13_19.36.59_by_Eden%2C_Janine_and_Jim%29.jpg",
		caption: "Jerry Garcia's 'Wolf' guitar (1973) — MET Museum",
	},
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Edgefield_Jerry_Garcia_statue.jpg",
		caption: "Jerry Garcia statue at Edgefield",
	},
];

function getRandomPhoto() {
	return JERRY_PHOTOS[Math.floor(Math.random() * JERRY_PHOTOS.length)];
}

function App() {
	const [photo, setPhoto] = useState(getRandomPhoto);

	return (
		<div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#1a1a1a", color: "#e8d8a0", fontFamily: "Georgia, serif", padding: "2rem" }}>
			<h1 style={{ fontSize: "2.5rem", marginBottom: "0.25rem", textAlign: "center" }}>✌️ Jerry Garcia ✌️</h1>
			<p style={{ fontSize: "1rem", color: "#a89060", marginBottom: "1.5rem", textAlign: "center" }}>Grateful Dead • Guitar & Soul</p>
			<img
				src={photo.src}
				alt={photo.caption}
				style={{ maxWidth: "min(480px, 90vw)", maxHeight: "60vh", objectFit: "contain", borderRadius: "8px", boxShadow: "0 8px 32px rgba(0,0,0,0.6)" }}
			/>
			<p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#a89060", textAlign: "center" }}>{photo.caption}</p>
			<button
				onClick={() => setPhoto(getRandomPhoto())}
				style={{ marginTop: "1.5rem", padding: "0.6rem 1.5rem", fontSize: "1rem", background: "#4a3a10", color: "#e8d8a0", border: "1px solid #a89060", borderRadius: "6px", cursor: "pointer" }}
			>
				🎸 Another Jerry
			</button>
		</div>
	);
}

export default App;
