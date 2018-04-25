This repository allows to reproduce an issue of corrupted data when sending a POST request from phantomjs to a nodejs server.

Start the server with:
  node server.js

Then start the client with:
  phantomjs phantomjs.js

The issue can be reproduced with nodejs 8.9.1 and phantomjs 2.1.1 on Windows 10, the server after some time displays KO (which means the post data was corrupted).
The issue seems to happen with other nodejs versions (9.x and 10).
It does not seem to happen with nodejs 6, and it does not seem to happen with other browsers than phantomjs 2.x.
