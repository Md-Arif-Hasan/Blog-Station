const js2xmlparser = require("js2xmlparser");
const js2Html = require("json-to-html");
const js2Txt = require("json-to-plain-text");

exports.sendJsResponse = (req, res, statusCode, data) => {
  return res.status(statusCode).send(data);
};

exports.sendXmlResponse = (req, res, statusCode, data) => {
  return res.status(statusCode).send(js2xmlparser.parse("data",data));
};

exports.sendHtmlResponse = ( req, res, statusCode, data) => {
    return res.status(statusCode).send(js2Html( data));
  };

  exports.sendTextResponse = ( req, res, statusCode, data) => {
    return res.status(statusCode).send(js2Txt.toPlainText(data));
  };


exports.sendResponse = (req,res, statusCode, data) =>{
    if(req.headers.accept == "application/json"){
        this.sendJsResponse(req,res,statusCode, data);
    }

    if(req.headers.accept == "application/xml"){
        this.sendXmlResponse(req,res,statusCode, data);
    }

    if(req.headers.accept == "application/html"){
        this.sendHtmlResponse(req,res,statusCode, data);
    }

    if(req.headers.accept == "application/text"){
        this.sendHtmlResponse(req,res,statusCode, data);
    }
}
