'use client';

import { useEffect, useState } from "react";
import { getModels } from "./actions"

export default function Home() {
  const [models, setModels] = useState([]) as any[];
  const [voices, setVoices] = useState([]) as any[];

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('/api/models')
        console.log('🟢response', response);
        if (!response.ok) throw new Error(response.statusText)
        const fetchedModels = await response.json();
        console.log('fetchedModels', fetchedModels);
        setModels(fetchedModels);
      } catch (error) {
        console.error(`Failed to fetch models: ${error}`);
      }
    };
    fetchModels();
  }, []);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await fetch('/api/voices')
        console.log('🟢response voices', response);
        if (!response.ok) throw new Error(response.statusText)
        const fetchedVoices = await response.json();
        console.log('fetchedVoices', fetchedVoices);
        setVoices(fetchedVoices);
      } catch (error) {
        console.error(`Failed to fetch voices: ${error}`);
      }
    };
    fetchVoices();
  }, []);

  return (
    <div className="container">
      <main>
        <h1 className="title">Hello World</h1>
        {models && models.map((model: any) => (
          <div key={model.model_id}>
            <h2>{model.name}</h2>
            <p>{model.description}</p>
          </div>
        ))}
        {voices && voices.voices.map((voice: any) => (
          <div key={voice.voice_id}>
            <h2>{voice.name}</h2>
            <p>{voice.description}</p>
          </div>
        ))}
      </main>
    </div>
  )

}
