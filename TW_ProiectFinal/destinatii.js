var pageContent = document.getElementById("pageContent");
let selectedCountry = JSON.parse(localStorage.getItem("selectedCountry"));

if(selectedCountry != null)
{
    if(window.innerWidth > 768)
        document.body.style.backgroundImage = 'url(' + selectedCountry.fundal + ')';

    window.addEventListener("resize", ()=>{
        if(window.innerWidth <= 768)
            document.body.style.backgroundImage = "none";
        else document.body.style.backgroundImage = "url('" + selectedCountry.fundal + "')";
    });
    
    let article = document.createElement("article");
    let header = document.createElement("header");
    header.style.display = "grid";
    header.style.gridTemplateRows = "0.05fr 1fr 0.05fr";
    header.style.fontSize = "4rem";
    header.classList.add("responsiveBackground");
    var color = selectedCountry.culoareTitlu;

    function changeHeader()
    {
        if(window.innerWidth > 768)
        {
            header.style.backgroundColor = "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
            header.style.backgroundImage = "none";
            header.style.textShadow = "none";
            header.style.fontSize = "4rem";
        }
        else 
        {
            header.style.backgroundImage = "url('" + selectedCountry.fundal + "')";
            header.style.textShadow = "2px 2px darkslategray";
            header.style.fontSize = "3.2rem";
        }
    }

    changeHeader();

    window.addEventListener("resize", changeHeader);

    header.style.color = "white";
    let text = document.createElement("p");
    text.innerHTML = selectedCountry.denumire;
    text.style.textAlign = "center";
    text.style.gridRow = "2";
    header.appendChild(text);
    article.appendChild(header);

    let cities = document.createElement("section");
    cities.classList.add("destCity");

    let country = document.createElement("section");
    let countryMap = document.createElement("div");
    countryMap.style.position = "relative";
    
    let map = document.createElement("img");
    map.classList.add("responsiveImg");
    map.setAttribute("src", selectedCountry.map);
    map.setAttribute("alt", selectedCountry.denumire);
    countryMap.appendChild(map);

    let mapGrid = document.createElement("div");
    mapGrid.classList.add("mapGrid");
    mapGrid.style.gridTemplateColumns = "repeat(" + selectedCountry.gridRows + ", 1fr)";
    mapGrid.style.gridTemplateRows = "repeat(" + selectedCountry.gridColumns + ", 1fr)";
    countryMap.appendChild(mapGrid);

    for(let i = 0; i < selectedCountry.orase.length; i ++)
    {
        let newImg = document.createElement("img");
        newImg.src = "./data/location.png";
        newImg.alt = "position";
        newImg.className = "responsiveImg";

        let newDiv = document.createElement("div");
        newDiv.id = selectedCountry.orase[i].denumire;
        
        newDiv.className = "responsiveImg";
        newDiv.style.gridColumn = selectedCountry.orase[i].mapX;
        newDiv.style.gridRow = selectedCountry.orase[i].mapY;
        newDiv.style.cursor = "pointer";
        newDiv.appendChild(newImg);
        var auxp, cityName, nights, hotelPic, hotelName, stars, hotelLink;
        newDiv.addEventListener("mouseenter", () => {
            auxp = document.getElementById("info");
            details.removeChild(auxp);
            cityName = document.createElement("p");
            cityName.innerHTML = selectedCountry.orase[i].denumire;
            cityName.style.color = 'rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')';
            cityName.style.weight = "bold";
            cityName.style.fontSize = "2.5vw";
            details.appendChild(cityName);
            nights = document.createElement("p");
            nights.innerHTML = "Numărul de nopți de cazare: " + parseFloat(selectedCountry.orase[i].zileCazare);
            nights.style.fontSize = "1.5vw";
            details.appendChild(nights);
            hotelPic = document.createElement("div");
            hotelPic.style.backgroundImage = "url('" + selectedCountry.orase[i].hotel.foto + "')";
            hotelPic.style.backgroundRepeat = "no-repeat";
            hotelPic.style.backgroundSize = "cover";
            hotelPic.style.backgroundPosition = "center center";
            hotelPic.style.height = "30%";
            hotelPic.style.width = "30%";
            details.appendChild(hotelPic);
            hotelName = document.createElement("p");
            hotelName.innerHTML = selectedCountry.orase[i].hotel.denumire;
            hotelName.style.fontSize = "1.5vw";
            details.appendChild(hotelName);
            stars = document.createElement("div");
            stars.style.display = "flex";
            stars.style.flexWrap = "nowrap";
            stars.style.justifyContent = "center";
            stars.style.height = "10%";
            stars.style.width = "10%";
            for(let k = 0; k < selectedCountry.orase[i].hotel.stele; k ++)
            {
                let star = document.createElement("img");
                star.src = "./data/star.jpg";
                star.classList.add("responsiveImg");
                stars.appendChild(star);
            }
            details.appendChild(stars);
        });
        newDiv.addEventListener("mouseout", () => {
            while(details.firstChild)
                details.removeChild(details.firstChild);
            details.appendChild(auxp);
        });
        mapGrid.appendChild(newDiv);
    }

    
    country.appendChild(countryMap);
    country.style.gridColumn = "1";
    cities.appendChild(country);

    var details = document.createElement("aside");
    let info = document.createElement("p");
    info.id = "info";
    info.innerHTML = "Pentru detalii despre călătorie, atingeți una dintre locațiile marcate pe hartă";
    info.style.fontSize = "1.5vw";
    info.style.textAlign = "center";
    info.style.fontStyle = "Italic";
    details.appendChild(info);
    cities.appendChild(details);
    article.appendChild(cities);
    
    let newSection = document.createElement("section");
    newSection.style.padding = "10%";
    for(let i = 0; i < selectedCountry.orase.length; i ++)
    {
        let detailsElement = document.createElement("details");
        detailsElement.style.marginBottom = "2rem";
        let summary = document.createElement("summary");
        summary.style.color = 'rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')';
        summary.style.weight = "bold";
        summary.innerHTML = selectedCountry.orase[i].denumire;
        summary.style.cursor = "pointer";
        summary.style.fontSize = "1.5rem";
        detailsElement.appendChild(summary);

        let content = document.createElement("div");
        content.style.width = "100%";
        content.classList.add("cityDetails");
        let nights = document.createElement("p");
        nights.innerHTML = "Numărul de nopți de cazare: " + parseFloat(selectedCountry.orase[i].zileCazare);
        nights.style.fontSize = "1rem";
        nights.style.textAlign = "center";
        content.appendChild(nights);
        let hotelPic = document.createElement("div");
        hotelPic.style.backgroundImage = "url('" + selectedCountry.orase[i].hotel.foto + "')";
        hotelPic.style.backgroundRepeat = "no-repeat";
        hotelPic.style.backgroundSize = "cover";
        hotelPic.style.backgroundPosition = "center center";
        hotelPic.style.height = "10rem";
        hotelPic.style.width = "10rem";
        content.appendChild(hotelPic);
        let hotelName = document.createElement("p");
        hotelName.innerHTML = selectedCountry.orase[i].hotel.denumire;
        hotelName.style.fontSize = "1rem";
        content.appendChild(hotelName);
        let stars = document.createElement("div");
        stars.style.display = "flex";
        stars.style.flexWrap = "nowrap";
        stars.style.justifyContent = "center";
        stars.style.height = "2rem";
        stars.style.width = "5rem";
        for(let k = 0; k < selectedCountry.orase[i].hotel.stele; k ++)
        {
            let star = document.createElement("img");
            star.src = "./data/star.jpg";
            star.classList.add("responsiveImg");
            stars.appendChild(star);
        }
        content.appendChild(stars);
        detailsElement.appendChild(content);
        newSection.appendChild(detailsElement);
    }
    article.appendChild(newSection);

    function changePageContent()
    {
        if(window.innerWidth > 768)
        {
            newSection.style.display = "none";
            cities.style.display = "grid";
        }
        else
        {
            newSection.style.display = "block";
            cities.style.display = "none";
        }
    }

    changePageContent();

    window.addEventListener("resize", changePageContent);

    var reserveDiv = document.createElement("div");
    reserveDiv.classList.add("reserveDiv");
    var reserve = document.createElement("button");
    reserve.classList.add("reserveButton");
    reserve.style.backgroundColor = reserve.style.borderColor = "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
    reserve.innerHTML = "Rezervați acum";
    reserve.addEventListener("mouseenter", () => {
        reserve.style.color = reserve.style.backgroundColor;
        reserve.style.backgroundColor = "white";
    });

    reserve.addEventListener("mouseout", () => {
        reserve.style.backgroundColor = reserve.style.color;
        reserve.style.color = "white";
    });
    
    reserve.addEventListener("click", () => {
        let userid, password;
        let me = JSON.parse(localStorage.getItem("myAccount"));
        if(selectedCountry.locuriDisponibile != 0)
        {
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

                        let arrayRez = Array.from(me.rezervari);
                        arrayRez.push(selectedCountry.id);

                        var updatedObj = {
                            id: userid,
                            nume: me.nume,
                            prenume: me.prenume,
                            utilizator: me.utilizator,
                            parola: password,
                            email: me.email,
                            rezervari: arrayRez,
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
                                delete updatedObj.parola;
                                delete updatedObj.id;
                                localStorage.setItem("myAccount", JSON.stringify(updatedObj));

                                selectedCountry.locuriDisponibile --;
                                
                                fetch(`http://localhost:3000/destinatii/${selectedCountry.id}`, 
                                {
                                    method: 'PUT',
                                    headers: {
                                        "Content-type": "application/json"
                                    },
                                    body: JSON.stringify(selectedCountry)
                                }).then(function () 
                                    {
                                        localStorage.setItem("selectedCountry", JSON.stringify(selectedCountry));
                                    }
                                );
                                
                            });
                    });
                    
                }).catch(function (err) {
                        console.log('Eroare ', err);
                });
        }
        else alert('Nu mai exista locuri pentru aceasta cursa');
    });
    reserveDiv.appendChild(reserve);
    article.appendChild(reserveDiv);

    pageContent.appendChild(article);
}
else
{
    if(window.innerWidth >= 768)
        document.body.style.backgroundImage = "url('./data/destinatiiWall.jpg')";
    else document.body.style.backgroundImage = "none";
    
    window.addEventListener("resize", ()=>{
        if(window.innerWidth < 768)
            document.body.style.backgroundImage = "none";
        else document.body.style.backgroundImage = "url('./data/destinatiiWall.jpg')";
    });


    var dbdata;

    fetch('http://localhost:3000/destinatii').then(
        function (response) 
        {
            if (response.status !== 200) 
            {
                console.log('Problema ' + response.status);
            }
    
            response.json().then(function (data) { 
                dbdata = data;
                let section2 = document.createElement("section");
                section2.style.padding = "5%";
                section2.style.backgroundColor = "rgb(50, 20, 70)";
                section2.style.color = "white";
                let title = document.createElement("p");
                title.innerHTML = "Cele mai populare destinații";
                title.classList.add("centerOnMedia");
                section2.appendChild(title);
                section2.style.fontSize = "2rem";
                for(let i = 0; i < dbdata.length - 1; i ++)
                {
                    for(let j = i + 1; j < dbdata.length; j ++)
                    {
                        if(parseFloat(dbdata[i].locuriDisponibile) > parseFloat(dbdata[j].locuriDisponibile))
                        {
                            let aux = dbdata[i];
                            dbdata[i] = dbdata[j];
                            dbdata[j] = aux;
                        }
                    }
                }

                let noDest = (dbdata.length < 3) ? dbdata.length : 3;
                let dest = document.createElement("div");
                dest.classList.add("topVisitedContainer");

                for(let i = 0; i < noDest; i ++)
                {
                    let container = document.createElement("div");
                    container.classList.add("topVisited");
                    let countryName = document.createElement("p");
                    countryName.innerHTML = dbdata[i].denumire;
                    countryName.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                    countryName.style.width = "100%";
                    container.appendChild(countryName);
                    container.style.backgroundImage = "url('" + dbdata[i].fundal + "')";
                    container.addEventListener("click", () => {
                        localStorage.setItem("selectedCountry", JSON.stringify(dbdata[i]));
                        location.href = "destinatii.html";
                    });
                    dest.appendChild(container);
                }

                section2.appendChild(dest);
                pageContent.appendChild(section2);
            });
    
        }
    ).catch(function (err) {
        console.log('Eroare ', err);
    });

    var section1 = document.createElement("section");
    section1.style.display = "flex";
    section1.style.flexDirection = "column";
    section1.style.justifyContent = "space-evenly";
    section1.style.alignItems = "center";
    section1.style.padding = "5%";
    var textSection = document.createElement("div");
    var searchSection = document.createElement("p");
    searchSection.innerHTML = "Căutare...";
    searchSection.style.fontWeight = "bold";
    textSection.appendChild(searchSection);
    var details = document.createElement("p");
    details.innerHTML = "Introduceți numele unei țări, unui oraș sau al unui hotel";
    textSection.appendChild(details);
    textSection.style.marginBottom = "2em";
    section1.appendChild(textSection);
    pageContent.appendChild(section1);

    function redimFont()
    {
        if(window.innerWidth >= 1280)
        {
            searchSection.style.fontSize = "3em";
            details.style.fontSize = "2em";
        }
        else if(window.innerWidth > 768 && window.innerWidth < 1280)
        {
            searchSection.style.fontSize = "2.7em";
            details.style.fontSize = "1.7em";
        }
        else
        {
            searchSection.style.fontSize = "2.5em";
            details.style.fontSize = "1.5em";
        }
    }

    redimFont();
    window.addEventListener("resize", redimFont);

    var searchForm = document.createElement("form");
    searchForm.style.display = "flex";
    searchForm.style.width = "70%";
    var search = document.createElement("input");
    search.type = "text";
    search.id = "searchBar";
    search.style.marginLeft = "2vw";
    search.classList.add("searchBar");
    var label = document.createElement("label");
    label.setAttribute("for", "searchBar");
    var searchIcon = document.createElement("img");
    searchIcon.src = "./data/searchIcon.jpg";
    searchIcon.style.width = "2rem";
    searchIcon.style.height = "2rem";
    searchIcon.classList.add("responsiveImg");
    label.appendChild(searchIcon);
    searchForm.appendChild(label);
    searchForm.appendChild(search);
    section1.appendChild(searchForm);
    var result = document.createElement("div");
    result.classList.add("searchResult");
    section1.appendChild(result);
    search.addEventListener("keyup", ()=>{
        while(result.firstChild != null)
        {
            result.removeChild(result.firstChild);
        }

        if(search.value != "")
            for(let i = 0; i < dbdata.length; i ++)
            {
                if(dbdata[i].denumire.toLowerCase().includes(search.value.toLowerCase()))
                {
                    let auxdiv = document.createElement("div");
                    let auxp = document.createElement("p");
                    auxp.innerHTML = dbdata[i].denumire;
                    auxdiv.appendChild(auxp);
                    auxdiv.style.cursor = "pointer";
                    auxdiv.style.borderBottom = "1px solid darkgray";
                    auxdiv.addEventListener("click", ()=>{
                        localStorage.setItem("selectedCountry", JSON.stringify(dbdata[i]));
                        location.href = "destinatii.html";
                    });
                    result.appendChild(auxdiv);
                }
                
                for(let j = 0; j < dbdata[i].orase.length; j ++)
                {
                    if(dbdata[i].orase[j].denumire.toLowerCase().includes(search.value.toLowerCase()))
                    {
                        let auxdiv = document.createElement("div");
                        let auxp1 = document.createElement("p");
                        auxp1.innerHTML = dbdata[i].orase[j].denumire;
                        let auxp2 = document.createElement("p");
                        auxp2.innerHTML = dbdata[i].denumire;
                        auxp2.style.color = "gray";
                        auxdiv.style.cursor = "pointer";
                        auxdiv.style.borderBottom = "1px solid darkgray";
                        auxdiv.appendChild(auxp1);
                        auxdiv.appendChild(auxp2);
                        auxdiv.addEventListener("click", ()=>{
                            localStorage.setItem("selectedCountry", JSON.stringify(dbdata[i]));
                            location.href = "destinatii.html";
                        });
                        result.appendChild(auxdiv);
                    }
                    else if(dbdata[i].orase[j].hotel.denumire.toLowerCase().includes(search.value.toLowerCase()))
                        {
                            let auxdiv = document.createElement("div");
                            let auxp1 = document.createElement("p");
                            auxp1.innerHTML = dbdata[i].orase[j].hotel.denumire;
                            let auxp2 = document.createElement("p");
                            auxp2.innerHTML = dbdata[i].orase[j].denumire + ", " + dbdata[i].denumire;
                            auxp2.style.color = "gray";
                            auxdiv.style.cursor = "pointer";
                            auxdiv.style.borderBottom = "1px solid darkgray";
                            auxdiv.appendChild(auxp1);
                            auxdiv.appendChild(auxp2);
                            auxdiv.addEventListener("click", ()=>{
                                localStorage.setItem("selectedCountry", JSON.stringify(dbdata[i]));
                                location.href = "destinatii.html";
                            });
                            result.appendChild(auxdiv);
                        }
                }
            
            }
    });
        
}

document.getElementById("pgDestinatii").addEventListener("click", ()=>{
    localStorage.setItem("selectedCountry", null);
});