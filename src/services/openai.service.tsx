//This use a openai library, but the apikey is insecure. If it is deployed to production, is better to create a backend to manage the API key.
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true //Remove in production
});

//Function to connect the Openai API, assign roles and behaviors.
export const getChatResponse = async (message: string) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { 
                    role: "system", 
                    content: "You are an assistant conversational, generating friendly responses adapted to the context with natural language. Remember to resonate like a human" 
                },
                { 
                    role: "user", 
                    content: message 
                },
            ],
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching chat response:", error);
        throw error;
    }
};