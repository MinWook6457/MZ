const OpenAI = require("openai");
require('dotenv').config()

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const openai = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY,
})

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/create", async (req, res) => {
    // Get the prompt from the request
    const { prompt } = req.body;
  
    // Generate image from prompt
    try {
        const response = await openai.images.generate({
            model : 'dall-e-3',
            prompt: prompt,
            n: 1,
            size: "1024x1024",
        });

        console.log(response)
        // Send back image url
        res.send(response.data[0].url);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error generating image");
    }
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
