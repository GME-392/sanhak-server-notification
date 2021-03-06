let axios = require("axios");

const USER_ENDPOINT_JOB = "https://qojk0ukeu2.execute-api.ap-northeast-2.amazonaws.com/infoDB";
const JOB_KOREA_ENDPOINT = "https://tt39zwn1ba.execute-api.ap-northeast-2.amazonaws.com/stage1/crawler/";
let jobList = [];

//get job korea crawler
async function getJobPostDB() {
    try {
      await axios
        .get(JOB_KOREA_ENDPOINT, {})
        .then(res => {
            jobList = res.data.body;
            //console.log(`id: ${jobList[0]["id"]}, date: ${jobList[0]["date"]}, content: ${jobList[0]["content"]}`);
            postToDB(jobList[0]);
            for(let i in jobList) {
                //console.log(jobList[i]);
                postToDB(jobList[i]);
            }
        });
    } catch(err) {
      console.log(err);
    }
}

//db의 endpoint에 정보 post
async function postToDB(obj) {
    try {
        await axios
            .post(USER_ENDPOINT_JOB, {
            "infoName": obj["content"],
            "date": obj["date"],
            "link": obj["link"],
            "id": obj["id"],
        })
        .then(response => console.log(response));
    } catch(err) {
        console.log(err);
    }
}


exports.handler = (event) => {
    // TODO implement
    getJobPostDB();
    const response = {
        statusCode: 200,
        body: JSON.stringify('push to jobDB'),
    };
    return response;
};
