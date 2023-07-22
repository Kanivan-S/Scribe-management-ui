// src/app/gpt3.service.ts

import { Injectable } from '@angular/core';
import { OPEN_AI_API_KEY } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Gpt3Service {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = OPEN_AI_API_KEY;

  constructor() {}

  async getGpt3Response(prompt: string): Promise<string> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };
    const data = {
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.7,
    };
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant.',
            },
            {
              role: 'user',
              content: 'What is the best tool for API testing?',
            },
          ],
        }),
      });
      if (response.status === 429) return 'Rate Limited';
      const responseData = await response.json();
      console.log('response: ', responseData);
      return responseData.choices[0].text;
    } catch (error) {
      console.error('Error fetching GPT-3 response:', error);
      return 'Error: Unable to fetch response.';
    }
  }
}
