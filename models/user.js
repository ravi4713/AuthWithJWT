const mongoose = require('mongoose');
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Please Enter Email'],
        unique:true,
        validate:[isEmail,'Please enter valid email']
    },
    password:{
        type:String,
        required:[true,'Please Enter Password'],
        minlength:[6,'minimum length of password is 6']
    }
});






//fire a function before doc save to db
//password is hasded before it saves
userSchema.pre('save',async function (next){
    const salt =await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


//static method to login user
userSchema.statics.login = async function(email, password){
    const user1 = await this.findOne({email});
    if (user1){
        const auth = await bcrypt.compare(password,user1.password)
        if (auth){
            return user1;
        }throw Error('incorrect password')

    }throw Error('incorrect Email')
}
const user = mongoose.model('user',userSchema);

module.exports = user;