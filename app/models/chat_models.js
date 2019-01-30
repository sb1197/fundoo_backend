/**
 * Purpose : To create a chat schema and store data into database.
 * @file   : chat_model.js
 * @author : Shweta Bochare
 * @version: 0.1
 * @since  : 17/01/19 
 */
const mongoose = require('mongoose');
//Creating token schema using moongose

const tokenSchema = mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    token: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        equired: true, 
        default: Date.now, 
        expires: 43200 
    }
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