let axios = require('axios');
let cheerio = require('cheerio');

const url = "https://www.jobkorea.co.kr/recruit/joblist?menucode=duty&dutyCtgr=10016";

exports.handler = async (event, context, callback) => {
    // 사용 변수들
    let jobList = []; // 잡코리아 채용정보를 저장할 배열
    let today = new Date();   

    let year = today.getFullYear(); // 년도
    let year_str = year + "-";

    await axios.get(url)
    .then(all_data => {
        // 성공적으로 data(html)를 받아왔다면
        console.log("Success");
        //console.log(all_data.data);

        // cheerio 모듈을 사용하여 data를 저장하고
        let $ = cheerio.load(all_data.data);

        //jobkorea에서 필요한 채용정보 추출하기
        const pre_url = "https://www.jobkorea.co.kr";
        const $bodyList = $('body>div#wrap>div#container>div#content>div.rcr_cnt>div#dev-gi-list>div.tplJobListWrap>div.tplList>table>tbody>tr');
        console.log("bodyList");
        console.log($bodyList);
        $bodyList.each((index, item) => {
            let d = year+"-"+$(item).find("td.odd>span.date>span.tahoma").text().substr(1).replace("/","-");
            d = d == year_str ? "상시채용" : d;
            let c = $(item).find("td.tplCo>a").text()+ " " +$(item).find("td.tplTit>div.titBx>strong>a").text();

            let obj = {
                date: d,
                content: c,
                link: pre_url+$(item).find("td.tplTit>div.titBx>strong>a")[0].attribs.href,
                id: d+c,
            };
            jobList.push(obj);
        });
    })
    .catch(err => {
        console.log(err);
        callback(null, {
            statusCode : 400,
            body : JSON.stringify("error crawler get"),
        });
    });
    console.log(today);
    console.log(jobList);
    
    return {
        statusCode : 200,
        body : jobList
    };
    // callback(null, {
    //     statusCode : 200,
    //     body : JSON.stringify(jobList)
    // });
};