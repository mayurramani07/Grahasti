import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chats = await Chat.find({ userIDs: tokenUserId });
    const chatsWithReceivers = [];

    for (const chat of chats) {
      const receiverId = chat.userIDs.find(
        (id) => id.toString() !== tokenUserId
      );

      const receiver = await User.findById(receiverId).select(
        "_id username avatar"
      );

      chatsWithReceivers.push({ ...chat.toObject(), receiver });
    }

    res.status(200).json(chatsWithReceivers);
  } catch (error) {
    console.log(error.response);
    res.status(500).json({ message: "Failed to read chats" });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      userIDs: { $in: [tokenUserId] },
    }).populate({
      path: "messages",
      options: { sort: { createdAt: 1 } },
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (!chat.seenBy.includes(tokenUserId)) {
      chat.seenBy.push(tokenUserId);
      await chat.save();
    }

    res.status(200).json(chat);
  } catch (error) {
    console.log(error.response);
    res.status(500).json({ message: "Failed to get chat" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chatExist = await Chat.findOne({
      userIDs: { $all: [tokenUserId, req.body.recieverId] },
    });

    if(chatExist) return res.status(200).json({message: "chat already exists"});

    const newChat = new Chat({
      userIDs: [tokenUserId, req.body.recieverId],
    });

    await newChat.save();

    res.status(200).json(newChat);
  } catch (error) {
    console.log(error.response);
    res.status(500).json({ message: "Failed to add chat" });
  }
};

export const readChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    // Find the chat and update it in one operation
    const chat = await Chat.findOneAndUpdate(
      {
        _id: req.params.id,
        userIDs: { $in: [tokenUserId] },
      },
      {
        $addToSet: { seenBy: tokenUserId },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error(error); // Changed from error.response to error for better debugging
    res.status(500).json({ message: "Failed to read chat" });
  }
};
