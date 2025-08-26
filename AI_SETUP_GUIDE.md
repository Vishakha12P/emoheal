# EMOHEAL AI Chatbot Setup Guide

## Free AI Options for Realistic Chatbot

### Option 1: Hugging Face Inference API (Recommended - Free)

1. **Sign up for free account:**
   - Go to https://huggingface.co/
   - Create a free account
   - Navigate to Settings → Access Tokens
   - Create a new token

2. **Update the chatbot code:**
   - Replace `"Bearer hf_xxx"` in `src/components/Chatbot.js` with your actual token
   - Example: `"Authorization": "Bearer hf_your_token_here"`

3. **Free tier limits:**
   - 30,000 requests per month
   - Perfect for personal/small projects

### Option 2: OpenAI API (Limited Free Tier)

1. **Sign up:**
   - Go to https://platform.openai.com/
   - Create account and get API key
   - Free tier: $5 credit (about 1000-2000 messages)

2. **Implementation:**
   ```javascript
   const response = await fetch('https://api.openai.com/v1/chat/completions', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${YOUR_API_KEY}`
     },
     body: JSON.stringify({
       model: 'gpt-3.5-turbo',
       messages: [
         {
           role: 'system',
           content: 'You are EMOHEAL, a compassionate AI companion for breast cancer patients. Provide emotional support, encouragement, and understanding.'
         },
         {
           role: 'user',
           content: userMessage
         }
       ],
       max_tokens: 150,
       temperature: 0.7
     })
   });
   ```

### Option 3: Local AI Models (Completely Free)

1. **Ollama (Recommended for local):**
   - Download from https://ollama.ai/
   - Install and run: `ollama run llama2`
   - Use local API endpoint

2. **Implementation:**
   ```javascript
   const response = await fetch('http://localhost:11434/api/generate', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       model: 'llama2',
       prompt: `You are EMOHEAL, a compassionate AI companion for breast cancer patients. User: ${userMessage}`,
       stream: false
     })
   });
   ```

### Option 4: Cohere AI (Free Tier)

1. **Sign up:**
   - Go to https://cohere.ai/
   - Free tier: 5 requests per minute, 100 requests per month

2. **Implementation:**
   ```javascript
   const response = await fetch('https://api.cohere.ai/v1/generate', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${YOUR_API_KEY}`
     },
     body: JSON.stringify({
       model: 'command',
       prompt: `You are EMOHEAL, a compassionate AI companion for breast cancer patients. User: ${userMessage}`,
       max_tokens: 150,
       temperature: 0.7
     })
   });
   ```

## Quick Setup Instructions

### For Hugging Face (Easiest):

1. **Get your token:**
   ```bash
   # Go to https://huggingface.co/settings/tokens
   # Create new token with "read" permissions
   ```

2. **Update the code:**
   ```javascript
   // In src/components/Chatbot.js, line ~95
   "Authorization": "Bearer YOUR_ACTUAL_TOKEN_HERE"
   ```

3. **Test the chatbot:**
   - Start your React app: `npm start`
   - Navigate to the chatbot section
   - Try sending a message

### Environment Variables (Recommended):

1. **Create `.env` file in project root:**
   ```env
   REACT_APP_HUGGINGFACE_TOKEN=your_token_here
   REACT_APP_OPENAI_KEY=your_openai_key_here
   ```

2. **Update the code to use environment variables:**
   ```javascript
   "Authorization": `Bearer ${process.env.REACT_APP_HUGGINGFACE_TOKEN}`
   ```

## Troubleshooting

### Common Issues:

1. **CORS errors:**
   - Use a proxy or backend server
   - Or use local AI models like Ollama

2. **Rate limiting:**
   - Implement retry logic with exponential backoff
   - Use fallback responses when API is unavailable

3. **Token not working:**
   - Check token permissions
   - Ensure token is correctly formatted
   - Try regenerating the token

### Fallback System:

The chatbot includes a robust fallback system that will:
- Use local empathetic responses if AI is unavailable
- Show error messages to users
- Continue functioning even without internet

## Security Notes:

1. **Never commit API keys to version control**
2. **Use environment variables for sensitive data**
3. **Implement rate limiting on your end**
4. **Consider using a backend proxy for production**

## Cost Optimization:

1. **Hugging Face:** Free tier is generous for personal projects
2. **OpenAI:** Use GPT-3.5-turbo instead of GPT-4 for lower costs
3. **Local models:** Completely free but require more setup
4. **Hybrid approach:** Use AI for complex responses, fallback for simple ones

## Next Steps:

1. Choose your preferred AI service
2. Get your API key/token
3. Update the code with your credentials
4. Test the chatbot functionality
5. Deploy your application

The chatbot will automatically fall back to local responses if the AI service is unavailable, ensuring your users always get support!
