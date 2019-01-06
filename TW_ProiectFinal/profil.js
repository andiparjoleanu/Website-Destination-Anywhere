var me = JSON.parse(localStorage.getItem("myAccount"));
var userid, password;
fetch('http://localhost:3000/users').then(
        function (response) 
        {
            if (response.status !== 200) 
            {
                console.log('Problema ' + response.status);
            }
    
            response.json().then(function (data) { 
                for(let i = 0; i < data.length; i ++)
                {
                    if(data[i].nume == me.nume && data[i].prenume == me.prenume)
                    {
                        userid = data[i].id;
                        password = data[i].parola;
                        break;
                    }
                }
            });
    
        }
).catch(function (err) {
    console.log('Eroare ', err);
});

var details = document.getElementById("details");
var namePar = document.createElement("p");
namePar.innerHTML = me.prenume + " " + me.nume;
namePar.style.fontSize = "2rem";
var otherInfo = document.createElement("div");
otherInfo.style.margin = "2rem";
otherInfo.style.display = "grid";
otherInfo.style.gridRowGap = otherInfo.style.gridColumnGap = "2vw";
otherInfo.style.gridTemplateRows = otherInfo.style.gridTemplateColumns = "1fr 1fr";

var usernamePar = document.createElement("p");
usernamePar.innerHTML = "nume de utilizator:";
usernamePar.style.fontSize = "1.2rem";
usernamePar.style.gridRow = "1";
usernamePar.style.gridColumn = "1";
otherInfo.appendChild(usernamePar);

var usernameVal = document.createElement("input");
usernameVal.readOnly = "true";
usernameVal.value = me.utilizator;
usernameVal.style.fontSize = "1.2rem";
usernameVal.style.gridRow = "1";
usernameVal.style.gridColumn = "2";
usernameVal.style.minWidth = "0";
otherInfo.appendChild(usernameVal);

var emailPar = document.createElement("p");
emailPar.innerHTML = "Email:";
emailPar.style.fontSize = "1.2rem";
emailPar.style.gridRow = "2";
emailPar.style.gridColumn = "1";
otherInfo.appendChild(emailPar);

var emailVal = document.createElement("input");
emailVal.readOnly = "true";
emailVal.value = me.email;
emailVal.style.fontSize = "1.2rem";
emailVal.style.gridRow = "2";
emailVal.style.gridColumn = "2";
emailVal.style.minWidth = "0";
otherInfo.appendChild(emailVal);

details.appendChild(namePar);
details.appendChild(otherInfo);

var form = document.getElementById("profileForm");
form.classList.add("cityDetails");
form.style.padding = "8%";

var photoName = document.getElementById("photoName");
photoName.style.display = "none";
photoName.addEventListener("change", () => {
    photo.style.backgroundImage = "url(" + './data/' + photoName.value.substring(12) + ")";
});

var photo = document.getElementById("photo");
if(me.poza != "")
{
    photo.style.backgroundImage = "url('" + me.poza + "')";
}
else photo.style.backgroundImage = "url('./data/profilePhoto.jpg')";

function clickPhoto()
{
    photoName.click();
}

var submitButton = document.getElementById("submitButton");
submitButton.classList.add("editButton");
submitButton.style.display = "none";
var edit = document.getElementById("edit");
edit.classList.add("editButton");

edit.addEventListener("click", () => {
    emailVal.readOnly = false;
    usernameVal.readOnly = false;
    photo.style.cursor = "pointer";
    photo.addEventListener("click", clickPhoto);
    edit.style.display = "none";
    submitButton.style.display = "block";
});

function styleSubmitButton()
{
    submitButton.style.backgroundColor = "green";
    submitButton.style.borderColor = "green";
    submitButton.style.color = "white";
}

styleSubmitButton();

submitButton.addEventListener("mouseout", () => {
    styleSubmitButton();
});

submitButton.addEventListener("mouseenter", () => {
    submitButton.style.backgroundColor = "white";
    submitButton.style.borderColor = "green";
    submitButton.style.color = "green";
});

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    emailVal.readOnly = true;
    usernameVal.readOnly = true;
    edit.style.display = "block";
    photo.style.cursor = "default";
    submitButton.style.display = "none";
    photo.removeEventListener("click", clickPhoto);
    
    let photoPath = ((photoName.value.substring(12) == "") ? me.poza : './data/' + photoName.value.substring(12));

    var updatedObj = {
        id: userid,
        nume: me.nume,
        prenume: me.prenume,
        utilizator: usernameVal.value,
        parola: password,
        email: emailVal.value,
        rezervari: me.rezervari,
        poza: photoPath
    };

    fetch(`http://localhost:3000/users/${userid}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(updatedObj)
    }).then(function () {
        delete updatedObj.parola;
        delete updatedObj.id;
        localStorage.setItem("myAccount", JSON.stringify(updatedObj));
    });
});

function showMyTrips(reserved, reservedElements, data)
{
    let distinctElements = reservedElements.filter((value, index, self) => self.indexOf(value) === index);
    let occurances = [];
    for(let i = 0; i < distinctElements.length; i ++)
    {
        let nr = 0;
        for(let j = 0; j < reservedElements.length; j ++)
        {
            if(reservedElements[j] == distinctElements[i])
                nr++;
        }

        occurances.push({"country": distinctElements[i], "freq": nr});
    }

    for(let i = 0; i < occurances.length; i ++)
    {
        let poz;
        for(let k = 0; k < data.length; k ++)
            if(data[k].id == occurances[i].country)
            {
                poz = k;
                break;
            }
        let reservedTrip = document.createElement("div");
        reservedTrip.style.borderBottom = "1px solid white";
        let countryName = document.createElement("p");
        countryName.style.fontSize = "1.3rem";
        countryName.innerHTML = data[poz].denumire + ((occurances[i].freq > 1) ? (" x " + occurances[i].freq.toString()) : "");
        let time = document.createElement("p");
        time.innerHTML = "Data călătoriei: " + data[poz].data;
        let price = document.createElement("p");
        let dbprice = data[poz].pret;
        price.innerHTML = "Preț pentru un singur loc: " + dbprice;
        let totalPrice = document.createElement("p");
        totalPrice.innerHTML = "Preț total: " + (parseFloat(dbprice.substring(0, dbprice.length - 1)) * occurances[i].freq).toString() + "$";
        let cancel = document.createElement("button");
        cancel.classList.add("submitButton");
        cancel.addEventListener("click", () => {
            while(reserved.firstChild)
            {
                reserved.removeChild(reserved.firstChild);
            }

            occurances[i].freq --;
            let newArray = [];
            for(let k = 0; k < occurances.length; k ++)
            {
                for(let l = 0; l < occurances[k].freq; l ++)
                    newArray.push(occurances[k].country);
            }

            let updatedObj = {
                id: userid,
                nume: me.nume,
                prenume: me.prenume,
                utilizator: me.utilizator,
                parola: password,
                email: me.email,
                rezervari: newArray,
                poza: me.poza
            };

            fetch(`http://localhost:3000/users/${userid}`, 
            {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(updatedObj)
            }).then(function () 
                {
                    localStorage.setItem("myAccount", JSON.stringify(updatedObj));
                    data[poz].locuriDisponibile ++;
                    fetch(`http://localhost:3000/destinatii/${occurances[i].country}`, 
                    {
                        method: 'PUT',
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify(data[poz])
                    }).then(function () 
                        {
                            fetch('http://localhost:3000/destinatii').then(
                                function (response) 
                                {
                                    if (response.status !== 200) 
                                    {
                                        console.log('Problema ' + response.status);
                                    }

                                    response.json().then(function (newdata) { 
                                        showMyTrips(reserved, newArray, newdata);
                                    });

                                }
                            ).catch(function (err) {
                                console.log('Eroare ', err);
                            });   
                        }
                    );
                }
            );
        });
        cancel.style.marginBottom = "1rem";
        cancel.innerHTML = "Anulează rezervarea";
        reservedTrip.appendChild(countryName);
        reservedTrip.appendChild(time);
        reservedTrip.appendChild(price);
        reservedTrip.appendChild(totalPrice);
        reservedTrip.appendChild(cancel);
        reserved.appendChild(reservedTrip); 
    }
}

fetch('http://localhost:3000/destinatii').then(
    function (response) 
    {
        if (response.status !== 200) 
        {
            console.log('Problema ' + response.status);
        }

        response.json().then(function (data) { 
            var myTrips = document.getElementById("myTrips");
            while(myTrips.firstChild)
            {
                myTrips.removeChild(myTrips.firstChild);
            }
            myTrips.style.padding = "0% 8% 8% 8%";
            myTrips.classList.add("cityDetails");
            var reserved = document.createElement("div");
            reserved.classList.add("searchResult");
            reserved.style.backgroundColor = "rgb(200, 50, 50)";
            reserved.style.color = "white";
            reserved.style.boxShadow = "inset 0 0 1rem dimgray";
            myTrips.appendChild(reserved);
            showMyTrips(reserved, me.rezervari, data);
        });

    }
).catch(function (err) {
    console.log('Eroare ', err);
});

var logoutButton = document.getElementById("logout");
logoutButton.classList.add("editButton");
logoutButton.style.backgroundColor = "black";
logoutButton.style.borderColor = "black";
logoutButton.addEventListener("click", () => {
    localStorage.setItem("myAccount", null);
    location.href = "login.html";
});
logoutButton.addEventListener("mouseenter", () => {
    logoutButton.style.color = "white";
});
var controlPanel = document.getElementById("controlPanel");
controlPanel.style.width = "30%";

document.getElementById("pgDestinatii").addEventListener("click", () => {
    localStorage.setItem("selectedCountry", null);
});

function addBackground()
{
    if(window.innerWidth <= 768)
    {
        document.body.style.backgroundImage = "none";
    }
    else
    {
        document.body.style.backgroundImage = "url('./data/profilWall.jpg')";
    }
}

addBackground();

window.addEventListener("resize", addBackground);
