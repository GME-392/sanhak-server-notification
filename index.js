let USER_ENDPOINT_CODE = "https://tdwcyrlp8g.execute-api.ap-northeast-2.amazonaws.com/noticeDB";
let USER_ENDPOINT_JOB = "";
let contestInfo = [];
let jobInfo = [];

function getMaxId(arr) {
  let result = -1;
  for(let i of arr) {
    if (result < i["id"]) {
      result = i["id"];
    }
  }

  return result + 1;
}

async function getAllNotice() {
  try {
    await axios
      .get(`${USER_ENDPOINT_CODE}?func=getAllNotice`, {})
      .then(res => {
        console.log(res.data);
        setContestTable(res.data);
      });
  } catch(err) {
    console.log(err);
  }

  // -------------endpoint 차후에 수정
  try {
    await axios
      .get(`${USER_ENDPOINT_CODE}?func=getAllNotice`, {})
      .then(res => {
        setJobTable(res.data);
      });
  } catch(err) {
    console.log(err);
  }
}

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
    
    let elems = '';
    elems += "<tr><td>" + date
        + "</td><td>" + content
        + "</td><td>" + link
        + "</td><td><button onclick='deleteContestTableElement(this,"+ `${USER_ENDPOINT_CODE}, ${id}` +")'>X</button></td></tr>";
    $("#contest-table").append(elems);
    contestInfo.push(obj);
  }
}

function addContestTableElement() {
    let date = document.getElementById("contest-date").value;
    let content = document.getElementById("contest-content").value;
    let link = document.getElementById("contest-link").value;
    let id = date+content;
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
        + "</td><td><button onclick='deleteContestTableElement(this,"+ `${USER_ENDPOINT_CODE}, ${id}` +", contestInfo)'>X</button></td></tr>";
    $("#contest-table").append(elems);
    contestInfo.push(obj);

    $("#contest-date").val("");
    $("#contest-content").val("");
    $("#contest-link").val("");

    //code db로 전송
    postElement(USER_ENDPOINT_CODE, id, content, date, link);
}

//endpoint차후에 수정
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
        + "</td><td><button onclick='deleteTableElement(this,"+ `${USER_ENDPOINT_CODE}, ${id}` +", jobInfo)'>X</button></td></tr>";
    $("#job-table").append(elems);
    jobInfo.push(obj);
  }
}

//job table에서 요소 추가
function addJobTableElement() {
  let date = document.getElementById("job-date").value;
  let content = document.getElementById("job-content").value;
  let link = document.getElementById("job-link").value;
  let id = date+content;
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
      + "</td><td><button onclick='deleteTableElement(this,"+ `${USER_ENDPOINT_CODE}, ${id}` +", jobInfo)'>X</button></td></tr>";
  $("#job-table").append(elems);
  jobInfo.push(obj);

  $("#job-date").val("");
  $("#job-content").val("");
  $("#job-link").val("");

  //code db로 전송 ------------- 나중에 endpoint 수정
  postElement(USER_ENDPOINT_CODE, id, content, date, link);
}

//user endpoint에 post
async function postElement(user_endpoint, id, infoName, date, link) {
  try {
    await axios
      .post(user_endpoint, {
        "id": id,
        "infoName": infoName,
        "date": date,
        "link": link,
      })
      .then(response => console.log(response));
  } catch(err) {
    console.log(err);
  }
}

//테이블에서 제거
function deleteTableElement(obj, user_endpoint, id, arr) {
    let tr = $(obj).parent().parent();
    tr.remove();
    //let contentIndex = arr.findIndex(x => x["id"] === parseInt(id));
    let contentIndex = arr.findIndex(x => x["id"] === id);
    deleteElement(user_endpoint, arr[contentIndex]["id"]);
    arr.splice(contentIndex, 1);
}

//contest테이블에서 제거
function deleteContestTableElement(obj, user_endpoint, id) {
  let tr = $(obj).parent().parent();
  tr.remove();
  let contentIndex = contestInfo.findIndex(x => x["id"] == id);
  deleteElement(user_endpoint, id);
  contestInfo.splice(contentIndex, 1);
}

//db에서 제거.
//차후에는 db에 id필드값을 추가하든 방법을 찾아야 할 듯
async function deleteElement(user_endpoint, id) {
  console.log(id);
  try {
    await axios
      .delete(user_endpoint, {
        data: {
          "id": id,
        }
      })
      .then(response => console.log(response));
  } catch(err) {
    console.log(err);
  }
}