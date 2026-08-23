// src/App.tsx

import { useState } from "react";
import "./App.css";

// Wikimedia Commons photos of Jerry Garcia (public domain / freely licensed)
const JERRY_PHOTOS = [
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Jerry_Garcia_at_Keystone_Berkeley%2C_September_1_1975%2C_II.jpg/800px-Jerry_Garcia_at_Keystone_Berkeley%2C_September_1_1975%2C_II.jpg",
		caption: "Jerry Garcia at Keystone Berkeley, 1975",
	},
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Jerry_Garcia_at_Keystone_Berkeley%2C_September_1%2C_1975.jpg/800px-Jerry_Garcia_at_Keystone_Berkeley%2C_September_1%2C_1975.jpg",
		caption: "Jerry Garcia at Keystone Berkeley, 1975",
	},
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Jerry_Garcia_1977.jpg/640px-Jerry_Garcia_1977.jpg",
		caption: "Jerry Garcia, 1977",
	},
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Jerry_Garcia_1982.jpg/640px-Jerry_Garcia_1982.jpg",
		caption: "Jerry Garcia, 1982",
	},
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Jerry_Garcia_1989.jpg/640px-Jerry_Garcia_1989.jpg",
		caption: "Jerry Garcia, 1989",
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
