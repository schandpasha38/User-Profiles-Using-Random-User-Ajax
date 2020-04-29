$(function () {
  ajaxCall();
});

function ajaxCall() {
  $.ajax({
    url: "../jsonData/randomuser100.json",
    method: "GET",
    success: function (data) {
      var users = Object.assign(data.results);
      domConstruct(users);
      snapdata(users);
    },
    error: function () {
      console.log("Error");
    }
  });
}

function snapdata(data) {
  function duplicatefilter() {
    var locations = data.map(function (item, index) {
      return item.location.city;
    });
    var locationFilter = "";
    var filteredLoc = [];
    for (var i = 0; i < locations.length; i++) {
      if (filteredLoc.indexOf(locations[i]) === -1) {
        filteredLoc.push(locations[i]);
      }
    }
    locationFilter = filteredLoc.length;
    document.getElementById("locationsCount").innerText = locationFilter;
  }

  (function () {

    var snapData = {
      totalUsers: 0,
      male: 0,
      female: 0,
      averageAge: 0
    };

    data.map(function (item, index) {
      snapData.totalUsers++
      if (item.gender === "male") {
        snapData.male++
      } else {
        snapData.female++
      }
      snapData.averageAge = Math.floor(data.reduce((prev, user) => prev + user.dob.age, 0) / data.length);
    });

    document.getElementById("totalUsers").innerText = snapData.totalUsers;
    document.getElementById("maleUsers").innerText = snapData.male;
    document.getElementById("femaleUsers").innerText = snapData.female;
    document.getElementById("averageAge").innerText = snapData.averageAge;
  })()

  duplicatefilter();
}

function domConstruct(data) {
  var content = "";
  for (var val in data) {
    content += `
        <div class="card">
        <div class="usersnapbio">
            <div class="usersnapbiowrap">
                ${
      data[val].picture.large
        ? `<img src=\"${data[val].picture.large}\" alt=\"\">`
        : '<img src="https://randomuser.me/api/portraits/women/2.jpg" alt="">'
      }
                <h2>${data[val].name.title ? data[val].name.title : ""} ${
      data[val].name.first ? data[val].name.first : ""
      } ${data[val].name.last ? data[val].name.last : ""}</h2>
                <p>Age: ${data[val].dob.age ? data[val].dob.age : "No DOB"}</p>
                <p>From: ${
      data[val].location.state
        ? data[val].location.state
        : "No Data"
      }</p>
            </div>
        </div>

        <div class="userdetailsbtn">
            <a href="userdetailspage.html?username=${
      data[val].login.username
      }">Know More</a>
        </div>
    </div>
        `;
    document.getElementById("mainContainer").innerHTML = content;
  }
}