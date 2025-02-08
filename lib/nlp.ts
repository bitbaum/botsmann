import { NLPResult } from '@/types/products';

export async function processQuery(query: string): Promise<NLPResult> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'system',
          content: `Convert one-word shopping queries into structured product search parameters.
                   Return a JSON object with 'category' and 'attributes'.
                   Example: For "laptop", return:
                   {
                     "category": "electronics/computers",
                     "attributes": {
                       "type": "laptop",
                       "minRam": "8GB",
                       "minStorage": "256GB"
                     }
                   }`
        }, {
          role: 'user',
          content: query
        }],
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      throw new Error('Failed to process query with OpenAI');
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('Invalid response from OpenAI');
    }

    try {
      const parsed = JSON.parse(content);
      return {
        category: parsed.category || 'general',
        attributes: parsed.attributes || {}
      };
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      return {
        category: 'general',
        attributes: { query }
      };
    }
  } catch (error) {
    console.error('NLP processing error:', error);
    // Fallback to basic search
    return {
      category: 'general',
      attributes: { query }
    };
  }
}
