import type { NextApiRequest, NextApiResponse } from 'next';
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: `${process.env.OPENAI_API_KEY}`,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let requestImage = req.body.request;

  try {
    const response = await openai.createImage({
      prompt: requestImage,
      n: 1,
      size: '512x512',
    });
    let url = response.data.data[0].url;
    res.status(200).json({ url: url });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
}
