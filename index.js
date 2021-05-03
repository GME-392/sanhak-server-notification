//const axios = require('axios');

const { default: axios } = require("axios");


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

function createTable() {
    var a = document.getElementById('tb1').value;
    if (a == "") {
      alert("Please enter some numeric value");
    } else {
      var th = document.querySelectorAll('#table th');//To check whether `TD` is appended in table or not!
      if (!th.length) {
        //If not appended, then append TD in table
        var rows = "<th>Item Name</th><th>Quantity</th><th>QuantityType</th><th>Amount</th>";
        var table = document.createElement('table');
        table.innerHTML = rows;
        document.getElementById("table").appendChild(table.firstChild);
      }
  
      for (var i = 0; i < a; i++) {
        var elems = '';
        elems += "<tr><td><input type='text' name='" + "name".concat(i + 1) + "'></td><td><input type='text' name='" + "quantity".concat(i + 1) + "'></td><td><input type='text' name='" + "qtype".concat(i + 1) + "'></td><td id='amt'><input type='text' id='sum' onkeyup='myfunction(this.value);' name='" + "total".concat(i + 1) + "'></td></tr>";
        var table = document.createElement('table');
        table.innerHTML = elems;
        document.getElementById("table").appendChild(table.firstChild);
      }
    }
}

function createTable2() {
    var a = document.getElementById('tb1').value;
    if (a == "") {
      alert("Please enter some numeric value");
    } else {
      let th = document.querySelectorAll('#ta ble th');//To check whether `TD` is appended in table or not!
      if (!th.length) {
        //If not appended, then append TD in table
        let rows = "<th>일자</th><th>내용</th><th>링크</th><th>삭제</th>";
        let table = document.createElement('table');
        table.innerHTML = rows;
        document.getElementById("table").appendChild(table.firstChild);
      }
  
      for (let i = 0; i < arr.length; i++) {
        let elems = '';
        elems += "<tr><td><span>" + arr[i]["date"]
                + "</span></td><td><span>" + arr[i]["content"]
                + "</span></td><td><span>" + arr[i]["link"]
                + "</span></td><td id='amt'><input type='text' id='sum' onkeyup='myfunction(this.value);' name='"
                + "total".concat(i + 1) + "'></td></tr>";
        let table = document.createElement('table');
        table.innerHTML = elems;
        document.getElementById("table").appendChild(table.firstChild);
      }
    }
}

function createTable3() {
    var a = document.getElementById('tb1').value;
    if (a == "") {
      alert("Please enter some numeric value");
    } else {
      let th = document.querySelectorAll('#ta ble th');//To check whether `TD` is appended in table or not!
      if (!th.length) {
        //If not appended, then append TD in table
        let rows = "<th>일자</th><th>내용</th><th>링크</th><th>삭제</th>";
        let table = document.createElement('table');
        table.innerHTML = rows;
        document.getElementById("table").appendChild(table.firstChild);
      }
  
      for (let i = 0; i < arr.length; i++) {
        let elems = '';
        elems += "<tr><td>" + arr[i]["date"]
                + "</td><td>" + arr[i]["content"]
                + "</td><td>" + arr[i]["link"]
                + "</td><td><button id='tempid"+ i +"'>X</button>";
        let table = document.createElement('table');
        table.innerHTML = elems;
        document.getElementById("contest-table").appendChild(table.firstChild);
        
      }
    }
}

function createTable4() {
    for (let i = 0; i < arr.length; i++) {
        let elems = '';
        elems += "<tr><td>" + arr[i]["date"]
                + "</td><td>" + arr[i]["content"]
                + "</td><td>" + arr[i]["link"]
                + "</td><td><button onclick='tableDelete(this)'>X</button></td></tr>";
        let table = document.createElement('table');
        table.innerHTML = elems;
        document.getElementById("contest-table").appendChild(table.firstChild);
        
      }

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
    for(let i = 0; i < arr.length; ++i){
        if (arr[i]['id'] == parseInt(id)) {
            delete arr[i];
        }
    }
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
      //.catch(response => alert(response));
  } catch(err) {
    console.log(err);
  }
}

async function getAllNotice() {
  try {
    await axios
      .get(`${USER_ENDPOINT}?func=getAllNotice`, {})
      .then(res => {console.log(res)});
  } catch(err) {
    console.log(err);
  }
}

function setContestTable(res) {
  
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
*/