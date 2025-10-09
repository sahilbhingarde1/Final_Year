export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const hfResponse = await fetch("https://TonYS36-Model.hf.space/generate-face", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.HF_TOKEN}`,
      },
      body: JSON.stringify(req.body),
    });

    if (!hfResponse.ok) {
      const errorText = await hfResponse.text();
      throw new Error(errorText);
    }

    // Forward the image blob or JSON back to the frontend
    const arrayBuffer = await hfResponse.arrayBuffer();
    res.setHeader("Content-Type", "image/png");
    res.send(Buffer.from(arrayBuffer));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate face" });
  }
}
