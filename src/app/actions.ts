'use server';

const fs = require('fs');
const path = require('path');
const uniqueId = Date.now().toString(36) + Math.random().toString(36);

const XI_BASE_URL = 'https://api.elevenlabs.io/v1';

export async function getModels() {
	try {
		const response = await fetch(`${XI_BASE_URL}/models`, {
			method: 'GET',
			headers: {
				'accept': 'application/json',
				'xi-api-key': process.env.XI_API_KEY as string,
			},
		});

		if (!response.ok) {
			throw new Error(`Server responded with HTTP ${response.status}`);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		console.error(`Failed to get models: ${error}`);
		throw error; // Propagate error to the caller
	}
}

export async function getVoices() {
	try {
		const response = await fetch(`${XI_BASE_URL}/voices`, {
			method: 'GET',
			headers: {
				'accept': 'application/json',
				'xi-api-key': process.env.XI_API_KEY as string,
			},
		});

		if (!response.ok) {
			throw new Error(`Server responded with HTTP ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(`Failed to get models: ${error}`);
		throw error; // Propagate error to the caller
	}
}

export async function getAudio(
	text: string,
	modelId = 'eleven_monolingual_v1',
	voiceId = process.env.XI_THOMAS_VOICE_ID as string
) {
	try {
		const response = await fetch(
			`${XI_BASE_URL}/text-to-speech/${voiceId}`,
			{
				method: 'POST',
				headers: {
					'accept': 'application/json',
					'xi-api-key': process.env.XI_API_KEY as string,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					text: text,
					model_id: modelId,
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

		// Convert the blob to a buffer
		const buffer = Buffer.from(await blob.arrayBuffer());
		fs.writeFileSync(path.resolve(__dirname, `../audio/${uniqueId}.mp3`), buffer);

		return true;

	} catch (error) {
		console.error(`Failed to get models: ${error}`);
		throw error; // Propagate error to the caller
	}
}
