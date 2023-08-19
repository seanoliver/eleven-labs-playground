import { NextResponse } from "next/server";

export async function getModels() {
  console.log('api key', process.env.XI_API_KEY);
  try {
    const response = await fetch('https://api.elevenlabs.io/v1/models', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'xi-api-key': process.env.XI_API_KEY as string
      }
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(`Failed to get models: ${error}`);
  }

};
