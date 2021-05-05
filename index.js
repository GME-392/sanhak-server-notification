let USER_ENDPOINT = "https://tdwcyrlp8g.execute-api.ap-northeast-2.amazonaws.com/noticeDB";
let arr = [];

function tableElement(elements, pageNum) {
    let table = document.getElementById('contest-table-body');
    for (let i = 0; i < elements.length; ++i) { 
        let tag = "<tr>";
        for (let k in elements[i]) {
            tag += "<td>"+k+"</td>";
        }
        tag += "</tr>";
    }
    table.innerHTML += tag;
}

function getMaxId() {
  let result = -1;
  for (let i = 0; i < arr.length; ++i) {
    if (result < arr[i]["id"]) result = arr[i]["id"];
  }
  return result + 1;
}

function pushInfo() {
    let date = document.getElementById("contest-date").value;
    let content = document.getElementById("contest-content").value;
    let link = document.getElementById("contest-link").value;
    let id = getMaxId();
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
        + "</td><td><button onclick='tableDelete(this,"+ id +")'>X</button></td></tr>";
    $("#contest-table").append(elems);
    arr.push(obj);

    $("#contest-date").val("");
    $("#contest-content").val("");
    $("#contest-link").val("");

    //db로 전송하는 함수
    postToDB(content, date, link);
}

function tableDelete(obj, id) {
    let tr = $(obj).parent().parent();
    tr.remove(); 
    arr = arr.filter(data => data["id"] != id);
}

//aws endpoint
//contest info
//https://tdwcyrlp8g.execute-api.ap-northeast-2.amazonaws.com/noticeDB
async function postToDB(infoName, date, link) {
  try {
    await axios
      .post(USER_ENDPOINT, {
        "infoName": infoName,
        "date": date,
        "link": link,
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
        console.log(res);
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
    let id = getMaxId();
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
        + "</td><td><button onclick='tableDelete(this,"+ id +")'>X</button></td></tr>";
    $("#contest-table").append(elems);
    arr.push(obj);
    //console.log(obj);
  }
}

/*
exports.handler = function(event, context, callback) {
    var infoName = event.queryStringParameters.infoName;
    var func = event.queryStringParameters.func;

    switch (func) {
        case 'getNotice':
            getNotice(infoName, callback);
            break;
        
        case 'getAllNotice':
            getAllNotice(callback);
            break;
        
    }
};



바디아래.
<script type="text/javascript">getAllNotice();</script>
<script type="module" src="app.js"></script>
*/