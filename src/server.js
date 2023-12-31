const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/classify', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: "text-davinci-003",
        prompt: `Classify the following email:\n"${req.body.text}" into Interested, Not Interested, Follow-up later, Out of office, Other.`,
        max_tokens: 10,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`,
        },
      }
    );

    res.json({ classification: response.data.choices[0].text });
  } catch (error) {
    console.error('Error classifying email:', error);
    res.status(500).json({ error: 'Error classifying email' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
