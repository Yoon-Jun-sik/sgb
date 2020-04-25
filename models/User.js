const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	name: { type: String, maxlength: 50 },
	email: { type: String, trim: true, unique: 1 }, //trim 띄어쓰기를 없에줌,unique 하나만쓸수있게
	password: { type: String, maxlength: 5 },
	lastname: { type: String, maxlength: 50 },
	role: { type: Number, default: 0 }, //롤을 부여하기위해 설정 (관리자,일반...)
	image: { type: String },
	token: { type: String },
	tokenExp: { type: Number } // 토큰 유효기간을 위해 설정
});

//모델로 유저스키라를 감싸줌
const User = mongoose.model("User", userSchema);
//다른곳에서 쓸수잇게 export 해줌
module.exports = { User };
