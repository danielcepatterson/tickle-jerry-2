// src/App.tsx

import { useState, useRef, useEffect, useCallback } from "react";
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
	const [isTickled, setIsTickled] = useState(false);
	const tickledCache = useRef<Map<string, string>>(new Map());
	const fetchingSet = useRef<Set<string>>(new Set());
	const tickleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	// Pre-fetch the tickled version of the current photo in the background
	const prefetchTickled = useCallback((src: string) => {
		if (tickledCache.current.has(src) || fetchingSet.current.has(src)) return;
		fetchingSet.current.add(src);
		fetch("/api/tickle", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ imageUrl: src }),
		})
			.then((res) => {
				if (!res.ok) throw new Error("tickle failed");
				return res.blob();
			})
			.then((blob) => {
				tickledCache.current.set(src, URL.createObjectURL(blob));
			})
			.catch(() => {/* silently fail — tickle just won't work for this photo */})
			.finally(() => fetchingSet.current.delete(src));
	}, []);

	useEffect(() => {
		prefetchTickled(photo.src);
	}, [photo.src, prefetchTickled]);

	function nextPhoto() {
		indexRef.current += 1;
		if (indexRef.current >= queue.current.length) {
			const last = queue.current[queue.current.length - 1];
			let next = shuffle(JERRY_PHOTOS);
			if (next[0] === last) next = [...next.slice(1), next[0]];
			queue.current = next;
			indexRef.current = 0;
		}
		const next = queue.current[indexRef.current];
		setPhoto(next);
		prefetchTickled(next.src);
	}

	function handleTickle() {
		if (!tickledCache.current.has(photo.src)) return; // not ready yet
		if (tickleTimer.current) clearTimeout(tickleTimer.current);
		setIsTickled(true);
		tickleTimer.current = setTimeout(() => setIsTickled(false), 300);
	}

	const displaySrc = isTickled && tickledCache.current.has(photo.src)
		? tickledCache.current.get(photo.src)!
		: photo.src;

	const isReady = tickledCache.current.has(photo.src);

	return (
		<div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#1a1a1a", color: "#e8d8a0", fontFamily: "Georgia, serif", padding: "2rem" }}>
			<h1 style={{ fontSize: "2.5rem", marginBottom: "0.25rem", textAlign: "center" }}>✌️ Jerry Garcia ✌️</h1>
			<p style={{ fontSize: "1rem", color: "#a89060", marginBottom: "1.5rem", textAlign: "center" }}>Grateful Dead • Guitar & Soul</p>
			<div style={{ position: "relative", cursor: isReady ? "pointer" : "default" }}>
				<img
					src={displaySrc}
					alt={photo.caption}
					onMouseDown={handleTickle}
					onTouchStart={(e) => { e.preventDefault(); handleTickle(); }}
					style={{
						maxWidth: "min(480px, 90vw)",
						maxHeight: "60vh",
						objectFit: "contain",
						borderRadius: "8px",
						boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
						userSelect: "none",
						WebkitUserSelect: "none",
						transition: isTickled ? "none" : "opacity 0.1s",
					}}
					draggable={false}
				/>
				{!isReady && (
					<div style={{ position: "absolute", bottom: "0.5rem", right: "0.5rem", fontSize: "0.75rem", color: "#a89060", background: "rgba(0,0,0,0.6)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
						tickling... 🤞
					</div>
				)}
				{isReady && !isTickled && (
					<div style={{ position: "absolute", bottom: "0.5rem", right: "0.5rem", fontSize: "0.75rem", color: "#e8d8a0", background: "rgba(0,0,0,0.6)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
						👆 tickle jerry
					</div>
				)}
			</div>
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
