let express = require('express');
let app = express();

// #11

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// #1

// console.log("Hello World")

// #2

// app.get('/', (req, res) => {
//   res.send("Hello Express")
// })

// # 4

// Normal usage
app.use(express.static(__dirname + '/public'));

// Assets at the /public route
app.use('/public', express.static(__dirname + '/public'));

// #7

app.use('/now', (req, res, next) => {
	let string = `${req.method} ${req.path} - ${req.ip}`;
	console.log(string);

	next();
});

// #3

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// #5

// app.get("/json", (req, res) => {
//   res.json({
//     message: "Hello json"
//   });
// });

// #6

process.env.MESSAGE_STYLE = 'uppercase';

app.get('/json', function (req, res) {
	if (process.env.MESSAGE_STYLE === 'uppercase') {
		res.json({
			message: 'HELLO JSON',
		});
	} else {
		res.json({
			message: 'Hello json',
		});
	}
});

// #8

app.get(
	'/now',
	(req, res, next) => {
		req.time = new Date().toString();
		next();
	},
	(req, res) => {
		res.json({ time: req.time });
	},
);

// #9

app.get('/:word/echo', (req, res) => {
	const { word } = req.params;
	res.json({
		echo: word,
	});
});

// #10

app.get('/name', function (req, res) {
	var firstName = req.query.first;
	var lastName = req.query.last;
	// OR you can destructure and rename the keys
	var { first: firstName, last: lastName } = req.query;
	// Use template literals to form a formatted string
	res.json({
		name: `${firstName} ${lastName}`,
	});
});

// #12

app.post('/name', function (req, res) {
	// Handle the data in the request
	var string = req.body.first + ' ' + req.body.last;
	res.json({ name: string });
});

module.exports = app;