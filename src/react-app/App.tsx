// src/App.tsx

import { useState, useRef } from "react";
import "./App.css";

function shuffle<T>(arr: T[]): T[] {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

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
		src: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Jerry_Garcia_by_Jay_Blakesberg.jpg",
		caption: "Jerry Garcia — photo by Jay Blakesberg",
	},
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/0/04/Grateful_Dead_-_Jerry_Garcia_%28cropped%29.jpg",
		caption: "Jerry Garcia — Grateful Dead",
	},
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Jerry_Garcia_at_Red_Rocks_taken_1987-08-11.jpg",
		caption: "Jerry Garcia at Red Rocks, August 11, 1987",
	},
];

function App() {
	const queue = useRef<typeof JERRY_PHOTOS>(shuffle(JERRY_PHOTOS));
	const indexRef = useRef(0);
	const [photo, setPhoto] = useState(queue.current[0]);

	function nextPhoto() {
		indexRef.current += 1;
		if (indexRef.current >= queue.current.length) {
			// Reshuffle for the next round, avoid showing same photo twice in a row
			const last = queue.current[queue.current.length - 1];
			let next = shuffle(JERRY_PHOTOS);
			if (next[0] === last) next = [...next.slice(1), next[0]];
			queue.current = next;
			indexRef.current = 0;
		}
		setPhoto(queue.current[indexRef.current]);
	}

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
				onClick={nextPhoto}
				style={{ marginTop: "1.5rem", padding: "0.6rem 1.5rem", fontSize: "1rem", background: "#4a3a10", color: "#e8d8a0", border: "1px solid #a89060", borderRadius: "6px", cursor: "pointer" }}
			>
				🎸 Another Jerry
			</button>
		</div>
	);
}

export default App;
