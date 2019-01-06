var pageContent = document.getElementById("pageContent");
var pageContentContainer = document.getElementsByClassName("pageContentContainer")[0];


fetch('http://localhost:3000/login').then(
    function (response) 
    {
        if (response.status !== 200) 
        {
            console.log('Problema ' + response.status);
        }

        response.json().then(function (data) {
            let dim = data.length;
            let idPhoto = Math.floor(Math.random() * dim); 
            document.body.style.backgroundImage = "url('" + data[idPhoto].fundal + "')";
        });

    }
).catch(function (err) {
    console.log('Eroare ', err);
});

function resizeWindow()
{
    if(window.innerWidth >= 768)
    {
        document.body.style.gridTemplateColumns = "1fr 2fr 1fr";
        document.body.style.gridTemplateRows = "10rem 1fr 10rem";
        pageContentContainer.style.gridRow = "2";
        pageContentContainer.style.gridColumn = "2";
    }
    else 
    {
        document.body.style.gridTemplateColumns = "1fr";
        document.body.style.gridTemplateRows = "1fr";
        pageContentContainer.style.gridRow = "1";
        pageContentContainer.style.gridColumn = "1";
    }
}

resizeWindow();


window.addEventListener("resize", () => {
    resizeWindow();
});

pageContent.style.backgroundColor = "rgba(0, 0, 0, 0)";

var title = document.createElement("header");
title.style.backgroundColor = 'rgba(200, 200, 200, 0.85)';
title.style.display = "flex";
title.style.justifyContent = "center";
title.style.alignItems = "center";
title.style.padding = "1rem";
title.style.borderRadius = "1rem 1rem 0 0";
title.style.boxShadow = "0 0.2rem 0.2rem black";
var logo = document.createElement("img");
logo.src = "./data/logo.png";
logo.classList.add("responsiveImg");
logo.style.width = "11rem";
logo.style.height = "7rem";
title.appendChild(logo);
pageContent.appendChild(title);

var formContainer = document.createElement("div");
formContainer.style.padding = "5%";
formContainer.style.display = "flex";
formContainer.style.flexDirection = "column";
formContainer.style.justifyContent = "space-between";
formContainer.style.alignItems = "center";
formContainer.style.backgroundColor = "rgba(0, 0, 0, 0.6)";


var myForm = document.createElement("form");
myForm.style.display = "flex";
myForm.style.flexDirection = "column";
myForm.style.justifyContent = "space-between";
myForm.style.alignItems = "flex-start";
myForm.style.color = "white";
myForm.style.width = "50%";

var uname = document.createElement("input");
uname.type = "text";
uname.classList.add("searchBar");
var labeluname = document.createElement("label");
labeluname.innerHTML = "nume de utilizator:";
labeluname.setAttribute("for", "uname");
labeluname.style.alignSelf = "flex-start";
var psd = document.createElement("input");
psd.type = "password";
psd.classList.add("searchBar");
var labelpsd = document.createElement("label");
labelpsd.innerHTML = "parola:";
labelpsd.setAttribute("for", "psd");
labelpsd.style.alignSelf = "flex-start";
var submit = document.createElement("button");
submit.type = "submit";
submit.innerHTML = "Autentifică-te!";
submit.style.display = "block";
submit.classList.add("submitButton");
submit.style.marginTop = "2rem";
submit.style.marginBottom = "1rem";
submit.style.alignSelf = "flex-start";
var subscribe = document.createElement("button");
subscribe.type = "button";
subscribe.innerHTML = "Înregistrează-te!";
subscribe.style.display = "block";
subscribe.classList.add("submitButton");
subscribe.style.alignSelf = "flex-start";
subscribe.addEventListener("click", ()=>{
    while(myForm.firstChild)
    {
        myForm.removeChild(myForm.firstChild);
    }
    let label = document.createElement("label");
    label.innerHTML = "prenume:";
    label.style.alignSelf = "flex-start";
    myForm.appendChild(label);
    var firstName = document.createElement("input");
    firstName.type = "text";
    firstName.required = true;
    firstName.classList.add("searchBar");
    myForm.appendChild(firstName);

    label = document.createElement("label");
    label.innerHTML = "nume:";
    label.style.alignSelf = "flex-start";
    myForm.appendChild(label);
    var lastName = document.createElement("input");
    lastName.type = "text";
    lastName.required = true;
    lastName.classList.add("searchBar");
    myForm.appendChild(lastName);

    label = document.createElement("label");
    label.innerHTML = "nume de utilizator:";
    label.style.alignSelf = "flex-start";
    myForm.appendChild(label);
    var userName = document.createElement("input");
    userName.type = "text";
    userName.required = true;
    userName.classList.add("searchBar");
    myForm.appendChild(userName);

    label = document.createElement("label");
    label.innerHTML = "parola:";
    label.style.alignSelf = "flex-start";
    myForm.appendChild(label);
    var password = document.createElement("input");
    password.type = "password";
    password.required = true;
    password.classList.add("searchBar");
    myForm.appendChild(password);

    label = document.createElement("label");
    label.style.alignSelf = "flex-start";
    label.innerHTML = "email:";
    myForm.appendChild(label);
    var email = document.createElement("input");
    email.type = "text";
    email.required = true;
    email.classList.add("searchBar");
    myForm.appendChild(email);

    label = document.createElement("label");
    label.innerHTML = "Fotografie de profil:";
    label.style.alignSelf = "flex-start";
    myForm.appendChild(label);
    var photo = document.createElement("input");
    photo.type = "file";
    photo.style.width = "100%";
    photo.classList.add("submitButton");
    photo.style.marginBottom = "1rem";
    myForm.appendChild(photo);

    styleInputs();
    styleLabels();

    var newSubmit = document.createElement("button");
    newSubmit.type = "submit";
    newSubmit.innerHTML = "Trimite datele!";
    newSubmit.style.marginTop = "2rem";
    newSubmit.style.alignSelf = "flex-start";
    newSubmit.classList.add("submitButton");
    myForm.appendChild(newSubmit);
    myForm.removeEventListener("submit", submitEvent);
    myForm.addEventListener("submit", (event)=>{
        event.preventDefault();
        const newUser = {
            nume: lastName.value,
            prenume: firstName.value,
            utilizator: userName.value,
            parola: password.value,
            email: email.value,
            rezervari: [],
            poza: photo.value.substring(12)
        }

        fetch('http://localhost:3000/users', 
        {
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newUser)

        }).then(function () {
            delete newUser.parola;
            localStorage.setItem("myAccount", JSON.stringify(newUser));
            location.href = "home.html";
        });
    });

});

function submitEvent(event)
{
    event.preventDefault();
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
                    if(data[i].utilizator == uname.value && data[i].parola == psd.value)
                    {
                        let newObj = {
                            nume: data[i].nume,
                            prenume: data[i].prenume,
                            utilizator: data[i].utilizator,
                            email: data[i].email,
                            rezervari: data[i].rezervari,
                            poza: data[i].poza
                        };

                        localStorage.setItem("myAccount", JSON.stringify(newObj));
                        location.href = "home.html";
                        break;
                    }
                }

                let inputs = document.getElementsByTagName("input");
                for(let j = 0; j < inputs.length; j ++)
                {
                    inputs[j].style.backgroundColor = "rgb(255, 200, 200)";
                    inputs[j].addEventListener("click", () => {
                        for(let k = 0; k < inputs.length; k ++) 
                            inputs[k].style.backgroundColor = "white";
                    });
                }
            });
    
        }
    ).catch(function (err) {
        console.log('Eroare ', err);
    });
}


myForm.addEventListener("submit", submitEvent);
myForm.appendChild(labeluname);
myForm.appendChild(uname);
myForm.appendChild(labelpsd);
myForm.appendChild(psd);
myForm.appendChild(submit);
myForm.appendChild(subscribe);
formContainer.appendChild(myForm);
pageContent.appendChild(formContainer);

function styleLabels() 
{
    let labels = document.getElementsByTagName("label");
    for(let i = 0; i < labels.length; i ++)
    {
        labels[i].style.fontSize = "1rem";
    }
}

function styleInputs()
{
    let inputs = document.getElementsByTagName("input");
    for(let i = 0; i < inputs.length; i ++)
    {
        inputs[i].style.marginBottom = "1rem";
    }
}

styleInputs();
styleLabels();
