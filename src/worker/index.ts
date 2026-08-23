import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

app.post("/api/tickle", async (c) => {
	const { imageUrl } = await c.req.json<{ imageUrl: string }>();

	// Fetch the source image
	const imageRes = await fetch(imageUrl);
	if (!imageRes.ok) {
		return c.json({ error: "Failed to fetch image" }, 502);
	}
	const imageBuffer = await imageRes.arrayBuffer();
	const imageArray = Array.from(new Uint8Array(imageBuffer));

	// Run img2img with a "tickled" prompt
	const result = await c.env.AI.run(
		"@cf/runwayml/stable-diffusion-v1-5-img2img" as Parameters<typeof c.env.AI.run>[0],
		{
			prompt:
				"Jerry Garcia laughing hysterically while being tickled, huge open-mouthed grin, eyes scrunched shut with laughter, shoulders raised, wiggling, pure joy",
			negative_prompt: "sad, serious, guitar, stage, microphone",
			image: imageArray,
			strength: 0.55,
			num_steps: 20,
		}
	);

	return new Response(result as unknown as ReadableStream, {
		headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400" },
	});
});

export default app;
