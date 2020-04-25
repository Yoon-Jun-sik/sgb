const express = require("express");
const app = express();
const port = 5000;

const mongooge = require("mongoose");
mongooge
	.connect(
		"mongodb+srv://sgb:wns6598@cluster0-fo807.mongodb.net/test?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		}
	)
	.then(() => console.log("디비 연결 성공"))
	.catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World!세원이 안녕"));

app.listen(port, () =>
	console.log(`Example app listening at http://localhost:${port}`)
);
