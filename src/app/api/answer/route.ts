import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { config } from 'dotenv'
import { resolve } from 'path'

// Explicitly load .env.local file
config({ path: resolve(process.cwd(), '.env.local') })

export async function POST(request: NextRequest) {
  // Initialize OpenAI client inside the function to catch initialization errors
  // Try multiple ways to access the env variable
  const apiKey = process.env.OPENAI_API_KEY || 
                 process.env.NEXT_PUBLIC_OPENAI_API_KEY || 
                 (process.env as any).OPENAI_API_KEY
  
  if (!apiKey || apiKey.trim() === '') {
    return NextResponse.json(
      { 
        error: 'OpenAI API key is not configured. Please add OPENAI_API_KEY to your .env.local file and restart your dev server.',
        hint: 'Make sure the file is named .env.local (not .env) and is in the root directory. After adding it, restart with: npm run dev'
      },
      { status: 500 }
    )
  }

  const openai = new OpenAI({
    apiKey: apiKey,
  })
  try {
    const { question } = await request.json()

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      )
    }


    // Create a prompt that encourages creative, detailed responses for "what if" questions
    const prompt = `You are a creative and thoughtful AI that explores hypothetical scenarios. Answer the following "what if" question in a detailed, engaging, and thought-provoking way. Consider multiple perspectives, potential consequences, and interesting implications. Make your response rich, imaginative, and well-structured.

Question: What if ${question}?

Answer:`

    // Try GPT-4 first, fallback to GPT-3.5-turbo if unavailable
    let completion
    try {
      completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a creative AI assistant that explores hypothetical scenarios and "what if" questions with depth, imagination, and thoughtful analysis.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 1500,
      })
    } catch (gpt4Error: any) {
      // Fallback to GPT-3.5-turbo if GPT-4 is unavailable
      if (gpt4Error?.status === 404 || gpt4Error?.code === 'model_not_found') {
        console.log('GPT-4 not available, falling back to GPT-3.5-turbo')
        completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a creative AI assistant that explores hypothetical scenarios and "what if" questions with depth, imagination, and thoughtful analysis.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.8,
          max_tokens: 1500,
        })
      } else {
        throw gpt4Error
      }
    }

    const answer = completion.choices[0]?.message?.content || 'Unable to generate an answer.'

    return NextResponse.json({ answer })
  } catch (error: any) {
    console.error('OpenAI API error:', error)
    
    // Provide more specific error messages
    let errorMessage = 'Failed to generate answer.'
    let statusCode = 500
    
    if (error?.status === 401 || error?.message?.includes('Incorrect API key')) {
      errorMessage = 'Invalid OpenAI API key. Please check your .env.local file.'
      statusCode = 401
    } else if (error?.status === 429 || error?.code === 'rate_limit_exceeded') {
      errorMessage = 'Rate limit exceeded. OpenAI has rate limits on API usage. Please wait a while till developer adds more credits, he is BROKE.'
      statusCode = 429
    } else if (error?.status === 402 || error?.code === 'insufficient_quota') {
      errorMessage = 'Insufficient quota. Your OpenAI account has run out of credits. Please wait a while till developer adds more credits, he is BROKE.'
      statusCode = 402
    } else if (error?.message) {
      errorMessage = error.message
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    )
  }
}

