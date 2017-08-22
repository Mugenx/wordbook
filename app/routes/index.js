var express = require('express');
var shell = require('shelljs');
var bodyParser = require('body-parser');
var router = express.Router();

// var pg = require('pg');
// DB connect string
const {
  Client
} = require('pg');

const connectionString = 'postgres://admin:123456@localhost/wordbook';

const client = new Client({
  connectionString: connectionString,
})
client.connect()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));


router.get('/', function (req, res) {



  client.query('SELECT * FROM words', (err, result) => {
    res.render('index', {
      pageTitle: 'WordBook',
      pageID: 'Home',
      words: result.rows
    });
    // client.end()
  })


}) // end of index

router.post('/translte', function (req, res) {

  var word = req.body.word;

  var output = shell.exec('dict query ' + word);
  output = output.substr(0, output.indexOf('网络释义'));

  client.query("INSERT INTO words ( word,def ) VALUES ('" + word + "','" + output + "')")

  // res.send(output);
});


router.post('/delete', function (req, res) {

  var id = req.body.id;

  client.query('DELETE FROM words WHERE id=' + id)

});

module.exports = router;