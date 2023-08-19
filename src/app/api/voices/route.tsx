import { NextResponse } from "next/server";

export async function GET() {

    try {
        const response = await fetch('https://api.elevenlabs.io/v1/voices', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'xi-api-key': process.env.XI_API_KEY as string
            }
        });

        if (!response.ok) {
            throw new Error(`Server responded with HTTP ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error(`Failed to get voices: ${error}`);
        throw error;  // Important to throw if you want to propagate error to the caller
    }
    }