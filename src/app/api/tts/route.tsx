import { NextRequest, NextResponse } from 'next/server';

const VOICE_ID = 'GBv7mTt0atIp3Br8iCZE'; // Thomas (US English, calm)

export async function POST(req: NextRequest, res: NextResponse) {
	try {
		const response = await fetch(
			`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
			{
				method: 'POST',
				headers: {
					'accept': 'application/json',
					'xi-api-key': process.env.XI_API_KEY as string,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					text: 'This is a test',
					model_id: 'eleven_monolingual_v1',
					voice_settings: {
						stability: 0.5,
						similarity_boost: 0.5,
					},
				}),
			}
		);

		if (!response.ok) {
			throw new Error(`Server responded with HTTP ${response.status}`);
		}

        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        
        // const audio = new Audio(audioUrl);
        // audio.play();

		// const data = await response.json();

		return NextResponse.json({blob});
	} catch (error) {
		console.error(`Failed to get voices: ${error}`);
		throw error; // Important to throw if you want to propagate error to the caller
	}
}
