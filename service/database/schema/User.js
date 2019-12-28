const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let objectId = Schema.Types.ObjectId;
const bcrypt = require('bcrypt');
const SAIT_WORK_FACTORY = 10;

//创建用户模型
const userSchema = new Schema({
    userID: {type: objectId},
    userName: {unique: true, type: String},
    password: String,
    createAt: {type: Date, default: Date.now()},
    lastLoginAt: {type: Date, default: Date.now()}
});

// 密码加盐
userSchema.pre('save', function(next) {
    bcrypt.genSalt(SAIT_WORK_FACTORY, (err, salt) => {
        if(err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) return next(err);
            this.password = hash;
            next();
        });
    })
})
//密码对比
userSchema.methods = {
    comparePassword: (_passw, passw) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_passw, passw, (err, isMacth) => {
                if(err) reject(err);
                resolve(isMacth);
            })
        })
    }
}
//发布模型
mongoose.model('User', userSchema);