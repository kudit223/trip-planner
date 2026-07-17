const joi = require("joi");
const { customAlphabet } = require("nanoid");
const Room = require("../models/Room");
const User = require("../models/User");

exports.createRoom = async (req, res) => {
  try {
    const { name } = req.body;

    //validation
    const schema = joi.object({
      name: joi.string().trim().required(),
    });

    const { error } = schema.validate({
      name,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 6);

    // assuming roomid is unique
    let isRoomIdExists = true;
    let roomId;

    // this loop will continue till it will find unique room id
    while (isRoomIdExists) {
      // create short user friendly room id length 6
      roomId = nanoid();

      const isRoomDetailsExists = await Room.findOne({ roomId });
      if (!isRoomDetailsExists) {
        isRoomIdExists = false;
      }
    }

    // Id from token
    const { id } = req.user;

    //user details using id which i stored in token after that middleware saved in req.user
    const userDetails = await User.findById(id);

    //room document created
    const roomDetails = await Room.create({
      roomId,
      name,
      admin: userDetails.email,
    });

    res.status(201).json({
      success: true,
      message: "Room Created Successfully!!",
      data: roomDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
};
