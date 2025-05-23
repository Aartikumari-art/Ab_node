require("dotenv").config();
const { OpenAI } = require("openai");
const messageModel = require("../models/messageModel");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const handlePostMessage = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res
      .status(400)
      .json({ status: 400, message: "Message is required" });
  }

  try {
    // Step 1: Get OpenAI response
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // or "gpt-3.5-turbo"
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    });

    const aiResponse = completion.choices[0].message.content;

    // Step 2: Save message (you can also save aiResponse if you want)
    const newMessage = await messageModel.create({
      message,
      aiResponse, // make sure your schema supports this
    });

    // Step 3: Respond to client
    return res.status(201).json({
      status: 201,
      message: "Message processed successfully",
      data: {
        userMessage: message,
        aiResponse,
      },
    });
  } catch (err) {
    console.error("OpenAI error:", err);
    return res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = {
  handlePostMessage,
};
