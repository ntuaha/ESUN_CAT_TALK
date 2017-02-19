var request = require('request');
request = request.defaults({jar: true});

var talk = function(msg){
  let data = {
    askMsg:msg,
    askMsgTmp:msg,
    srcReferrer:'http://www.esunsec.com.tw/emkt/mmng.htm'
  };
  console.log('data',data);
  request.post({url:'http://talk.esunsec.com.tw/talk.action', form: data}, function(err,httpResponse,body){
    if (err) return console.log("err",err);
    request.get({url:'http://talk.esunsec.com.tw/talk!doAnswer.action', form: data}, function(err2,httpResponse2,body2){
      if (err2) return console.log("err2",err2);
      request.post({url:'http://talk.esunsec.com.tw/talk!finalChk.action', form: data},function(err3,httpResponse3,body3){
        if (err3) return console.log("err3",err3);
        console.log(msg+" -> ");
        console.log(JSON.parse(body2).answerMsg[0]);
      });
    });
  });
}

talk(process.argv[2]);
