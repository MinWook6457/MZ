// openAI 키 사용하여 imgURL 추출
module.exports = async(prompt) => {
    const OpenAI = require("openai");

    const openai = new OpenAI({
        apiKey : process.env.OPENAI_API_KEY,
    })
    
    const response = await openai.images.generate({
        model : 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: "1024x1024",
    });

    console.log(response.data[0].url)
    
    return response.data[0].url
}

