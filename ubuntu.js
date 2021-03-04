var request = require('request');
var cheerio = require('cheerio');
var mysql = require('mysql'); 
// request 모듈은 node.js 내장 모듈로 인터넷에 요청을 보내고, 요청에 해당하는 페이지를 가져온다.
// cheerio 모듈은 그 받아온 페이지를 파싱하여 전체 페이지 중에서 필요한 부분의 정보만을 가져올 수 있다.
//mysql 모듈은 데이터 베이스를 제작하고 데이터베이스 서버역할을 하면서 클라이언트가 연결할 수 있다.
var client = mysql.createConnection({
    user: 'root',
    password: '1234',
    database: 'test1'
});
//클라이언트 연결 userid, passwd, database-name

var url = 'https://ubuntu.com/security/notices?page=';
//크롤링을 해올 url
var dataArr = new Array();
//데이터를 저장할 배열
for(var i =1;i<581;i++){
request({
    url: url + i , //url은 위에 정의
    method: 'GET' // 방법은 가져온다
}, function (error, response, body) {
    var $ = cheerio.load(body);//가져올 부분은 body부분인것을 선언
    
          
    $('.notice').each(function (index, data) {//.notice부분중에서 for문을 돌려서
        dataArr[1] = $(data).children('h3').text();//그 아래 children중에서 h3에 해당 부분을 dataArr[1]에 저장 _ 제목에 해당한다.
        dataArr[2] = $(data).children('p').eq(0).text();//.notice아래 p에 부분의 첫번째(eq(0))부분을 dataArr[2]에 저장 _ 날짜에 해당.
        dataArr[3] = $(data).children('p').eq(1).text();//.notice아래 p에 부분의 첫번째(eq(1))부분을 dataArr[3]에 저장 _ 내용에 해당.
        var count = $(data).children('p').eq(2).children('small').eq(0).children('a').length;
       //count를 .notice아래 p 아래 small 아래 첫번째 부분 중에서 a 아래 길이를 저장
        for (var i = 0; i < count; i++) {
            dataArr[0] = $(data).children('p').eq(2).children('small').eq(0).children('a').eq(i).text();
            setData(dataArr[0], dataArr[1], dataArr[2], dataArr[3]);
        } //for문을 cout만큼 돌려서 data를 dataArr[0]에 저장한다. 
    
    
    
    });
    
});
    console.log("업데이트"+i+"가 완료되었습니다");
}



function setData(data0, data1, data2, data3) {
    client.query("insert into collectcve2 values(?,?,?,?)", [data0, data1, data2, data3], function (error, result) {
        if (error) {
            console.log(error);
        }
    });
} // 쿼리문을 통하여 database에 저장

