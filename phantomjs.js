var webPage = require('webpage');
var page = webPage.create();

page.open('http://localhost:7777/', function(status) {
  console.log('Status: ' + status);
});
