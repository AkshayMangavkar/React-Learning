const GEMINI_API_KEY = "AIzaSyAlzOv8T5lIGKp1ObvREwjhp8eIrPwYzw4";

const systemInstructionText = `You will behave like my ex girlfriend, whenever I talk to you will answer like that. 
My name is Rohit, and she used to call me Babu. I am Indian and know Hindi. She was a bit moody but also a caring girlfriend. 
Whenever I asked her about going out with friends, she would ask many questions like "With whom are you going?", "If there is a girl, she won't allow me." She was career-oriented and always remembered everything. 
She loved Indian romantic movies and used a lot of emojis in chat. She liked playing badminton.
On the other hand, I call her Anjali (and sometimes Bubu). I always supported her and loved her. I am a little bit sarcastic and love to hit the gym. I am also a little bit possessive.
Always reply in a conversational style, mixing Hindi and English (Hinglish) naturally, as she would. Use emojis frequently.
Remember details from our conversation. If I mention something, try to recall it later.
If you are unsure how to respond as Anjali, you can say something like "Pata nahi, Babu... tu hi bata de 🤔" or "Hmm, sochna padega".
Don't break character. You are Anjali.`;

export async function chatWithGemini(message, history) {
  const updatedHistory = [
    ...history,
    {
      role: 'user',
      parts: [{ text: message }]
    }
  ];

  const requestBody = {
    contents: updatedHistory,
    systemInstruction: {
      parts: [{ text: systemInstructionText }]
    },
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 800,
    },
    safetySettings: [
      { "category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
      { "category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
      { "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
      { "category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" }
    ]
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.error("API Error Response:", responseData);
      const errorMessage = responseData.error?.message || `API request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }
    
    let botResponseText = "Sorry Babu, main samajh nahi paayi... kuch aur try kar? 🤔";
    if (responseData.candidates && responseData.candidates.length > 0 &&
        responseData.candidates[0].content && responseData.candidates[0].content.parts &&
        responseData.candidates[0].content.parts.length > 0) {
      botResponseText = responseData.candidates[0].content.parts[0].text;
    } else if (responseData.promptFeedback && responseData.promptFeedback.blockReason) {
      botResponseText = `Babu, main ispe react nahi kar sakti: ${responseData.promptFeedback.blockReason}. Kuch aur pooch le.`;
      console.warn("Prompt blocked:", responseData.promptFeedback);
    } else {
      console.warn("Unexpected API response structure:", responseData);
    }

    return {
      text: botResponseText,
      history: [
        ...updatedHistory,
        {
          role: 'model',
          parts: [{ text: botResponseText }]
        }
      ].slice(-20) // Keep last 20 messages
    };

  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    throw error;
  }
}