const express = require("express");
const app = express();
const port = 5000;
const config = require("./config/key");

//바디파서(클라이언트에서 오는 정보를 분석하는 라이브러리)
const bodyParser = require("body-parser");
//유저모델 가져옴
const { User } = require("./models/User");
//application/x-ww-form-urlencoded로 오는 정보를 분석함
app.use(bodyParser.urlencoded({ extended: true })); //바디파서 옵션
//application/json으로 오는 정보를 분석함
app.use(bodyParser.json()); // 바디파서 옵션

const mongooge = require("mongoose");
mongooge
	.connect(config.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => console.log("디비 연결 성공"))
	.catch(err => console.log(err));

app.get("/", (req, res) => res.send("세원이 못생김 => true"));
//회원가입
app.post("/register", (req, res) => {
	//가입시 필요한 정보들을 클라이언트에서 가져오면
	//가져온 정보를 데이터베이스에 넣어준다.
	//인스턴스 생성
	const user = new User(req.body); //req.body에 json형식으로 데이터가 들어있음 이경우 유저 모델에 정보들이 들어있음 (데이터 저장 타입)
	user.save((err, userInfo) => {
		//정보 저장시 에러,콜백 줌
		if (err) return res.json({ success: false, err }); //에러가뜨면 제이슨형식으로 폴스값과 에러를 전해줌
		//위에 리턴이 안일어나면 밑에 리턴이 잃어남 고로 성공시발생
		return res.status(200).json({ success: true, userInfo }); //200값(성공)과 트루,userInfo(입력받은 값 전달)
	});
});

app.listen(port, () =>
	console.log(`Example app listening at http://localhost:${port}`)
);
