// openAI 키 사용하여 imgURL 추출
module.exports = async(content) => {
    const OpenAI = require("openai");

    const openai = new OpenAI({
        apiKey : process.env.OPENAI_API_KEY,
    })
    
    const response = await openai.images.generate({
        model : 'dall-e-3',
        prompt: content,
        n: 1,
        size: "1024x1024",
    });
    
    return response.data[0].url
}

