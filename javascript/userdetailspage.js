var params = new URLSearchParams(window.location.search);
var userName = params.get('username');
var randomUserData = {};


document.getElementsByTagName("title")[0].innerText = userName

function randomsuer() {
    var randomData = new XMLHttpRequest();
    randomData.onreadystatechange = function () {
        if (randomData.readyState === 4 && randomData.status === 200) {

            temp = JSON.parse(randomData.responseText);

            randomUserData = temp.results;

            //Filter
            var filteredData = randomUserData.filter(function (val, i) {
                if (val.login.username === userName) {
                    return val
                }
            });

            finalFilteredData = filteredData[0];

            content = `
            <div class="usersnapbio">
            <div class="userimage">
                <img class="card-img" src="${finalFilteredData.picture.large}" alt="Card image cap">
            </div>
            <div id="usersnapbio1">
                <h2 class="card-title">${finalFilteredData.name.title} ${finalFilteredData.name.first} ${finalFilteredData.name.last}</h2>
                <p class="card-text">Email: <span>${finalFilteredData.email}</span></p>
                <p class="card-text">Gender: <span>${finalFilteredData.gender}</span></p>
                <p class="card-text">Age: <span>${finalFilteredData.dob.age}</span></p>
            </div>
            <div id="contact">
                <p>Phone: ${finalFilteredData.phone}</p>
                <p>Cell: ${finalFilteredData.cell}</p>
            </div>
            <div id="address">
                <p>Address</p>
                <p>${finalFilteredData.location.street} ${finalFilteredData.location.city} ${finalFilteredData.location.state} PostCode: ${finalFilteredData.location.postcode}</p>
            </div>
        </div>`;
            document.getElementById("userDetailsContainer").innerHTML = content;
        }
    }
    randomData.open("GET", "../jsonData/randomuser100.json", true);
    randomData.send();
};

randomsuer();