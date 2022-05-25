let users = [];
        const addUser = (ev)=>{
            event.preventDefault();  
            let user = {
                name: document.getElementById('name').value,
                instagram: document.getElementById('instagram').value,
                youtube: document.getElementById('youtube').value,
                twitch: document.getElementById('twitch').value,
                reddit: document.getElementById('reddit').value,
                twitter: document.getElementById('twitter').value,
                // alive: document.getElementById('alive').value, //change this to new func
                region: document.getElementById('region').value,
            }
            users.push(user);
            document.forms[0].reset(); 

            localStorage.setItem('User', JSON.stringify(users) );
        }
        document.addEventListener('DOMContentLoaded', ()=>{
            document.getElementById('btn').addEventListener('click', addUser);
        });

    
        

