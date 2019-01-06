
fetch('http://localhost:3000/destinatii').then(
        function (response) 
        {
            if (response.status !== 200) 
            {
                console.log('Problema ' + response.status);
            }
    
            response.json().then(function (data) { 
                let now = new Date();
                let countries = [];
                for(let i = 0; i < data.length; i ++)
                {
                    let tripDate = new Date(data[i].data);
                    if(now.getTime() > tripDate.getTime())
                    {
                        countries.push(data[i].id);
                    }
                }

                if(countries.length > 0)
                {
                    fetch('http://localhost:3000/users').then(
                        function (resp) 
                        {
                            if (resp.status !== 200) 
                            {
                                console.log('Problema ' + resp.status);
                            }
                    
                            resp.json().then(function (newdata) {
                                var newArray = JSON.parse(JSON.stringify(newdata));
                                for(let i = 0; i < newArray.length; i ++)
                                {
                                    let auxRezervari = [];
                                    for(let j = 0; j < newArray[i].rezervari.length; j ++)
                                    {
                                        let item = newArray[i].rezervari[j];
                                        if(countries.indexOf(item) == -1)
                                        {
                                            auxRezervari.push(item);                                           
                                        }
                                    }

                                    newArray[i].rezervari = auxRezervari;
                                }


                                let del = function(t){
                                    fetch(`http://localhost:3000/destinatii/${countries[t]}`, {
                                                method: 'DELETE',
                                    }).then(function(){
                                        if(t < countries.length - 1)
                                        {
                                            t ++;
                                            del(t);
                                        }
                                        else
                                        {
                                            localStorage.setItem("myAccount", null);
                                            location.href = "login.html";
                                        }
                                    });
                                };

                                let update = function(t){
                                    let poz;
                                    for(let z = 0; z < data.length; z ++)
                                    {
                                        if(data[z].id == countries[t])
                                        {
                                            poz = z;
                                            break;
                                        }
                                    }
                                    fetch('http://localhost:3000/destinatiiRezerva/', 
                                    {
                                        method: 'POST',
                                        headers: {
                                            "Content-type": "application/json"
                                        },
                                        body: JSON.stringify(data[poz])
                                    }).then(function(){
                                        if(t < countries.length - 1)
                                        {
                                            t ++;
                                            update(t);
                                        }
                                        else
                                        {
                                            del(0);
                                        }
                                    })
                                }

                                let func = function(i){
                                    fetch(`http://localhost:3000/users/${newArray[i].id}`, 
                                    {
                                        method: 'PUT',
                                        headers: {
                                            "Content-type": "application/json"
                                        },
                                        body: JSON.stringify(newArray[i])
                                    }).then(function(){
                                        if(i < newArray.length - 1)
                                        {
                                            i = i + 1;
                                            func(i);
                                        }
                                        else
                                        {
                                            update(0);
                                        }
                                    });
                                };

                                func(0);
                            });
                        });
                }
            });
        }
);