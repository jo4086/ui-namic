"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var sendHtml = "<!DOCTYPE html>\n<html lang=\"ko\">\n    <head>\n        <meta charset=\"utf-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n        <title>Document</title>\n    </head>\n    <body>\n        <h1>RESTApiget localhost:3000/xxx</h1>\n    </body>\n</html>\n";
router.get('/', function (req, res) {
    res.send(sendHtml);
});
router.get('/aa', function (req, res) {
    res.send('xxxx aa');
});
exports.default = router;
