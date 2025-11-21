import { NextResponse } from 'next/server'
import { config } from 'dotenv'
import { resolve } from 'path'

// Explicitly load .env.local file
config({ path: resolve(process.cwd(), '.env.local') })

export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY
  
  return NextResponse.json({
    hasApiKey: !!apiKey,
    keyLength: apiKey?.length || 0,
    keyPrefix: apiKey ? apiKey.substring(0, 7) + '...' : 'none',
    allOpenAIKeys: Object.keys(process.env).filter(k => k.toUpperCase().includes('OPENAI')),
    nodeEnv: process.env.NODE_ENV,
    message: apiKey 
      ? 'API key found! ✅' 
      : 'API key NOT found. Make sure .env.local exists in the root directory and restart the dev server.'
  })
}

