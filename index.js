let USER_ENDPOINT = "https://tdwcyrlp8g.execute-api.ap-northeast-2.amazonaws.com/noticeDB";
let arr = [];
let jobInfo = [];
let g_id = -1;
let MAXID = 10000;

function pushInfo() {
    let date = document.getElementById("contest-date").value;
    let content = document.getElementById("contest-content").value;
    let link = document.getElementById("contest-link").value;
    let id = date+content
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
        + "</td><td><button onclick='tableDelete(this,"+ `"${id}"` +")'>X</button></td></tr>";
    $("#contest-table").append(elems);
    arr.push(obj);

    $("#contest-date").val("");
    $("#contest-content").val("");
    $("#contest-link").val("");

    //db로 전송하는 함수
    postToDB(content, date, link, id);
}

//테이블에서 제거
function tableDelete(obj, id) {
    let tr = $(obj).parent().parent();
    tr.remove();
    let contentIndex = arr.findIndex(x => x["id"] == id);
    deleteContestElement(id);
    arr.splice(contentIndex, 1);
}

//db에서 제거.
//차후에는 db에 id필드값을 추가하든 방법을 찾아야 할 듯
async function deleteContestElement(id) {
  console.log(id);
  try {
    await axios
      .delete(USER_ENDPOINT, {
        data: {
          "id": id,
        }
      })
      .then(response => console.log(response));
  } catch(err) {
    console.log(err);
  }
}

//aws endpoint
//contest info
//https://tdwcyrlp8g.execute-api.ap-northeast-2.amazonaws.com/noticeDB
async function postToDB(infoName, date, link, id) {
  try {
    await axios
      .post(USER_ENDPOINT, {
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

async function getAllNotice() {
  try {
    await axios
      .get(`${USER_ENDPOINT}?func=getAllNotice`, {})
      .then(res => {
        setContestTable(res.data);
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
    console.log(`${date}, ${content}, ${link}, ${id}`);
    let elems = '';
    elems += "<tr><td>" + date
        + "</td><td>" + content
        + "</td><td>" + link
        + "</td><td><button onclick='tableDelete(this,"+ `"${id}"` +")'>X</button></td></tr>";
    $("#contest-table").append(elems);
    arr.push(obj);
  }
}