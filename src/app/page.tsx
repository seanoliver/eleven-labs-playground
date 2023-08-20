'use client';

import { use, useEffect, useRef, useState } from 'react';
import { getAudio, getModels, getVoices } from './actions';

export default function Home() {
	const [models, setModels] = useState([]) as any[];
	const [voices, setVoices] = useState([]) as any[];
	const [audio, setAudio] = useState([]) as any;
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
			console.log(response);
			const audioUrl = URL.createObjectURL(response);
			if (audioRef.current) {
				audioRef.current.src = audioUrl;
			}
		};
		fetchAudio();
	}, []);

	// useEffect(() => {
	//     const fetchAudio = async () => {
	//         try {
	//             const response = await fetch('/api/tts', {
	//                 method: 'POST',
	//                 body: JSON.stringify({
	//                     text: 'This is a test of Eleven Labs text to speech API',
	//                     }),
	//               })

	//             if (!response.ok) throw new Error(response.statusText)
	//             const fetchedAudio = await response.json();
	//             const audioUrl = URL.createObjectURL(fetchedAudio.blob);
	//             if (audioRef.current) {
	//               audioRef.current.src = audioUrl;
	//             }
	//         } catch (error) {
	//             console.error(`Failed to fetch audio: ${error}`);
	//         }
	//     };
	//     fetchAudio();
	// }, []);

	// TODO: Convert API Routes to Next.js Server Actions

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
				{audioRef && (
					<audio
						controls
						ref={audioRef}
					/>
				)}
			</main>
		</div>
	);
}
