/**
 * Purpose : To create a chat schema and store data into database.
 * @file   : chat_model.js
 * @author : Shweta Bochare
 * @version: 0.1
 * @since  : 17/01/19 
 */
const mongoose = require('mongoose');
//Creating chat schema using moongose
const ChatSchema = mongoose.Schema({
    senderName: {
        type: String
    },
    reciverName: {
        type: String
    },
    message: {
        type: String
    },
});
var chat = mongoose.model('Chat', ChatSchema);
function chatModel() {

}
chatModel.prototype.peerChatMsgSaveModel = (req, callback) => {
    //Saving chats to the database using mongoose  
    var newData = new chat(req);
    newData.save((err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}

chatModel.prototype.getAllUserChats = (callback) => {
    //To get all users for chat
    chat.find({}, (err, result) => {
        if (err) 
        {
            callback(err);
        }
        else 
        {       
            callback(null, result);
        }
    });
}

module.exports = new chatModel();