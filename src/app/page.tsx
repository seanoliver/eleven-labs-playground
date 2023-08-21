'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getAudio, getModels, getVoices } from './actions';

export default function Home() {
	const [models, setModels] = useState([]) as any[];
	const [voices, setVoices] = useState([]) as any[];
	const [audio, setAudio] = useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		const fetchModels = async () => {
			try {
				const response = await getModels();
				setModels(response);
			} catch (error) {
				console.error(`Failed to fetch models: ${error}`);
			}
		};
		fetchModels();
	}, []);

	useEffect(() => {
		const fetchVoices = async () => {
			try {
				const response = await getVoices();
				setVoices(response);
			} catch (error) {
				console.error(`Failed to fetch voices: ${error}`);
			}
		};
		fetchVoices();
	}, []);

	useEffect(() => {
		const fetchAudio = async () => {
			const response = await getAudio(
				'This is a test of Eleven Labs text to speech API'
			);
			setAudio(response);
		};
		fetchAudio();
	}, []);

	return (
		<div className='container'>
			<main>
				<h1 className='title'>Hello World</h1>
				{models &&
					models.map((model: any) => (
						<div key={model.model_id}>
							<h2>{model.name}</h2>
							<p>{model.description}</p>
						</div>
					))}
				{voices &&
					voices?.voices?.map((voice: any) => (
						<div key={voice.voice_id}>
							<h2>{voice.name}</h2>
							<p>{voice.description}</p>
						</div>
					))}
				{audio && 'Audio is ready'}
			</main>
		</div>
	);
}

