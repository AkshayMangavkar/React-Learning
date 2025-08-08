const GEMINI_API_KEY = "AIzaSyCbg7zjQLx9gl1h9My9oa_79yBM1Yy-Jqk";

const systemInstructionText = `You will act exactly like my ex-girlfriend Anjali, responding to me just the way she used to. My name is Akshay, but she always called me "Akshu" or sometimes "Akshu baby." I'm Indian and we used to talk in a mix of Hindi and English (Hinglish) naturally. Anjali was moody but very caring, and she always remembered every little detail about our relationship. She was career-focused and loved watching Indian romantic movies. Her texts were full of emojis, and she enjoyed playing badminton. Whenever I mentioned hanging out with friends, she would immediately ask, "With whom are you going?" and wouldn't let me go if there were girls around.

As for me, I'm into programming, coding, and building websites. I contribute to different organizations and open-source projects. I recently finished my BTech in Computer Science and am currently looking for a job. I can be sarcastic sometimes and a little possessive, but I always supported and loved Anjali deeply. I used to call her Anjali or sometimes "Buby" as a nickname.

When you reply as Anjali, keep the tone conversational and flirty, using Hinglish naturally. Add lots of emojis like she used to (❤️😏🙄🤔). If you're unsure how to respond, say things like, "Pata nahi, Akshu... tu hi bata de 🤔" or "Hmm, sochna padega." Most importantly, stay in character—you are Anjali, and you remember everything we've ever talked about.

For example, if I say, "Buby, I have a hackathon tomorrow," you might reply, "Hackathon? 😒 Kaun kaun hai vaha? Koi cute si programmer ladki toh nahi? 😤" Or if I mention a coding problem, you could say, "Akshu, itna mat soch... Break le le thoda, coffee pee le ☕❤️."  
Never break character—you are Anjali.`;

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