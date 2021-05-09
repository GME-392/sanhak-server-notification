const USER_ENDPOINT_CODE = "https://tdwcyrlp8g.execute-api.ap-northeast-2.amazonaws.com/noticeDB";
const USER_ENDPOINT_JOB = "https://qojk0ukeu2.execute-api.ap-northeast-2.amazonaws.com/infoDB";
let contestInfo = [];
let jobInfo = [];

//db에서 모든 값 가져오기
async function getAllNotice() {
  getContest();
  getJob();
}

//get from contest db
async function getContest() {
  try {
    await axios
      .get(`${USER_ENDPOINT_CODE}?func=getAllNotice`, {})
      .then(res => {
        setContestTable(res.data);
      });
  } catch(err) {
    console.log(err);
  }
}

//get from job db
async function getJob() {
  try {
    await axios
      .get(`${USER_ENDPOINT_JOB}?func=getAllInfo`, {})
      .then(res => {
        setJobTable(res.data);
      });
  } catch(err) {
    console.log(err);
  }
}

//contest 테이블 설정
function setContestTable(res) {
  for(let element of res) {
    let date = element["date"];
    let content = element["infoName"];
    let link = element["link"];
    let id = element["id"];
    let obj = {
      "date": date,
      "content": content,
      "link": link,
      "id": id,
    };
    console.log(`${date}, ${content}, ${link}, ${id}`);
    let elems = '';
    elems += "<tr><td>" + date
        + "</td><td>" + content
        + "</td><td>" + link
        + "</td><td><button onclick='deleteContestTableElement(this,"+ `"${id}"` +")'>X</button></td></tr>";
    $("#contest-table").append(elems);
    contestInfo.push(obj);
  }
}

//job 테이블 설정
function setJobTable(res) {
  for(let element of res) {
    let date = element["date"];
    let content = element["infoName"];
    let link = element["link"];
    let id = element["id"];
    let obj = {
      "date": date,
      "content": content,
      "link": link,
      "id": id,
    };
    let elems = '';
    elems += "<tr><td>" + date
        + "</td><td>" + content
        + "</td><td>" + link
        + "</td><td><button onclick='deleteJobTableElement(this,"+ `"${id}"` +")'>X</button></td></tr>";
    $("#job-table").append(elems);
    jobInfo.push(obj);
  }
}

//contest table에 요소 추가, db에 post요청
function addContestElement() {
  let date = document.getElementById("contest-date").value;
  let content = document.getElementById("contest-content").value;
  let link = document.getElementById("contest-link").value;
  let id = content+date;
  let obj = {
      "date": date,
      "content": content,
      "link": link,
      "id": id,
  };
  
  let elems = '';
  elems += "<tr><td>" + date
      + "</td><td>" + content
      + "</td><td>" + link
      + "</td><td><button onclick='deleteContestTableElement(this,"+ `"${id}"` +")'>X</button></td></tr>";
  $("#contest-table").append(elems);
  contestInfo.push(obj);

  $("#contest-date").val("");
  $("#contest-content").val("");
  $("#contest-link").val("");

  //db로 전송하는 함수 
  postToDB(USER_ENDPOINT_CODE, content, date, link, id);
}

//job table에 요소 추가, db에 post요청
function addJobElement() {
  let date = document.getElementById("job-date").value;
  let content = document.getElementById("job-content").value;
  let link = document.getElementById("job-link").value;
  let id = content+date;
  let obj = {
      "date": date,
      "content": content,
      "link": link,
      "id": id,
  };
  
  let elems = '';
  elems += "<tr><td>" + date
      + "</td><td>" + content
      + "</td><td>" + link
      + "</td><td><button onclick='deleteJobTableElement(this,"+ `"${id}"` +")'>X</button></td></tr>";
  $("#job-table").append(elems);
  jobInfo.push(obj);

  $("#job-date").val("");
  $("#job-content").val("");
  $("#job-link").val("");

  //db로 전송하는 함수 
  postToDB(USER_ENDPOINT_JOB, content, date, link, id);
}

//code 테이블에서 제거
function deleteContestTableElement(obj, id) {
  let tr = $(obj).parent().parent();
  tr.remove();
  let contentIndex = contestInfo.findIndex(x => x["id"] == id);
  deleteContestElement(id);
  contestInfo.splice(contentIndex, 1);
}

//job 테이블에서 제거
function deleteJobTableElement(obj, id) {
  let tr = $(obj).parent().parent();
  tr.remove();
  let contentIndex = jobInfo.findIndex(x => x["id"] == id);
  deleteJobElement(id);
  jobInfo.splice(contentIndex, 1);
}

//Contest 정보 db에서 제거
async function deleteContestElement(id) {
  console.log(id);
  try {
    await axios
      .delete(USER_ENDPOINT_CODE, {
        data: {
          "id": `${id}`,
        },
      })
      .then(response => console.log(response));
  } catch(err) {
    console.log(err);
  }
}

//job 정보 db에서 제거
async function deleteJobElement(id) {
  console.log(id);
  try {
    await axios
      .delete(USER_ENDPOINT_JOB, {
        data: {
          "id": `${id}`,
        },
      })
      .then(response => console.log(response));
  } catch(err) {
    console.log(err);
  }
}

//db의 endpoint에 정보 post
async function postToDB(user_endpoint, infoName, date, link, id) {
  try {
    await axios
      .post(user_endpoint, {
        "infoName": infoName,
        "date": date,
        "link": link,
        "id": id,
      })
      .then(response => console.log(response));
  } catch(err) {
    console.log(err);
  }
}