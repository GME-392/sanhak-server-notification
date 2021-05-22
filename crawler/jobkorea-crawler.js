var axios = require('axios');
var cheerio = require('cheerio');

//event, context, callback
exports.handler = async () => {
    
  // 사용 변수들
  //let User_ID = event.name;
  let url = "https://www.jobkorea.co.kr/recruit/joblist?menucode=duty&dutyCtgr=10016";
  let solve_num = []; // 지금까지 푼 문제들을 저장해 놓은 배열  
  
  let today = new Date();   

  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 날짜
  let day = today.getDay();  // 요일

  await axios.get(url).then(all_data => {
      // 성공적으로 data(html)를 받아왔다면
      console.log("Success!!");

      //console.log(all_data.data);
       // cheerio 모듈을 사용하여 data를 저장하고
      let $ = cheerio.load(all_data.data);
      // 해당 string은 내가 원하는 정보인 "지금까지 solve한 문제들"이 저장되어 있는 경로임!
      //:nth-child(6)>div.tplList>table>tbody>tr>td>a
      $('body>div#wrap>div#container>div#content>div.rcr_cnt>div#dev-gi-list>div.tplJobListWrap>div.tplList>table>tbody>tr').each((index,item) => {
          solve_num.push($(item).find("td a").text()); // 지금까지 푼 문제 번호들 저장
          //console.log(item);
      });

      const pre_url = "https://www.jobkorea.co.kr";
      const $bodyList = $('body>div#wrap>div#container>div#content>div.rcr_cnt>div#dev-gi-list>div.tplJobListWrap>div.tplList>table>tbody>tr');
      $bodyList.each((index, item) => {
        console.log($(item).find("td.tplCo>a").text());
        console.log($(item).find("td.tplTit>div.titBx>strong>a").text());
        console.log(pre_url+$(item).find("td.tplTit>div.titBx>strong>a")[0].attribs.href);
        console.log($(item).find("td.odd>span.date>span.tahoma").text().substr(1).split("/"));
        console.log(year+"-"+$(item).find("td.odd>span.date>span.tahoma").text().substr(1).replace("/","-"));
        //console.log($(item).find("td.odd>span.date").text()); 뒤 요일까지 붙어서 나옴.
      })
  })
  .catch(err => {console.log(err);});
  console.log(solve_num);
  return {
      statusCode : 200,
      body : solve_num
  } 

};
exports.handler();

/*
//event, context, callback
exports.handler = async () => {
    
    // 사용 변수들
    //let User_ID = event.name;
    let User_ID = "ghtn5706";
    let url = `https://www.acmicpc.net/user/${User_ID}`;
    let solve_num = []; // 지금까지 푼 문제들을 저장해 놓은 배열  
    console.log(url);
    await axios.get(url).then(all_data => {
        // 성공적으로 data(html)를 받아왔다면
        console.log("Success!!");

        //console.log(all_data.data);
         // cheerio 모듈을 사용하여 data를 저장하고
        let $ = cheerio.load(all_data.data);
        // 해당 string은 내가 원하는 정보인 "지금까지 solve한 문제들"이 저장되어 있는 경로임!
        $('body>div.wrapper>div.container>div.row>div.col-md-12>div.row>div.col-md-9>div.panel:nth-child(1)>div.panel-body>a').each((index,item) => {
            solve_num.push(item.attribs.href.substr(9)); // 지금까지 푼 문제  번호들 저장
        });
            
        })
    .catch(err => {console.log(err);});
    console.log(solve_num);
    return {
        statusCode : 200,
        body : solve_num
    } 

};
exports.handler();
*/
/*
request("https://www.reddit.com", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  $('div#siteTable > div.link').each(function( index ) {
    var title = $(this).find('p.title > a.title').text().trim();
    var score = $(this).find('div.score.unvoted').text().trim();
    var user = $(this).find('a.author').text().trim();
    console.log("Title: " + title);
    console.log("Score: " + score);
    console.log("User: " + user);
    fs.appendFileSync('reddit.txt', title + '\n' + score + '\n' + user + '\n');
  });

});*/