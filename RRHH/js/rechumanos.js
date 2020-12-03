window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init(){
    if(localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadEmployee();
    }else{
        window.location.href = "index.html";
    }
}

function loadEmployee() {
    axios.get(url + "/recursos", headers)
    .then(function(res) {
        console.log(res);
        displayEmployee(res.data.message);
    }).catch(function(err) {
        console.log(err);
    })
}

function displayEmployee(recursos) {
    var body = document.querySelector("body");
    for(var i = 0; i <recursos.length; i++) {
        body.innerHTML += `<h3>${recursos[i].Nombre} ${recursos[i].Apellido}</h3>`;
    }
}