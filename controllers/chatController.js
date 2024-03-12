const OpenAI = require('openai')
const { readFileSync, writeFileSync } = require('node:fs')

const openai = new OpenAI({
    apiKey: process.env.API_TOKEN
})

const JSONPath = './data/chatHistory.json'

const setResponses = async(prompt) => {
    const responses = await openai.chat.completions.create({
        model: process.env.GPT_MODEL,
        messages: [{
            "role": "user",
            "content": prompt,
        }],
        max_tokens: 100
    })
    return responses
}

const getResponses = async(prompt) => {
    try {
        const responses = await setResponses(prompt)
        return responses
    } catch (error) {
        throw new Error(error)
    }
}


module.exports = {
    getResponses
}