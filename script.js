
const url = process.env.MYMAN;
const result = fetch(`${url}`, { method: 'get' })
  .then(response => response.json()) 
  .then(res => {

    
            function getRowPositions(element) {
            var rowJavascript = element.parentNode.parentNode;
            var rowjQuery = $(element).closest("tr");
            let a = rowJavascript.rowIndex -1;
            indexPos.push(a);
            localStorage.setItem('ID', a);
            localStorage.ID = a;
        }

        var xhReq = new XMLHttpRequest();
        xhReq.open("GET",`${url}`, false,);
        xhReq.send(null);

        const data1 = JSON.parse(xhReq.responseText); 
        const data = JSON.stringify(data1);
        // initialization
        var cryptocurrencies;
        var timerId;
        var updateInterval = 2000000;

        let rowPos;
        let indexPos = [];
        let ids;
       

     
        function descending(a, b) { return a.percent_change_24h < b.percent_change_24h ? 1 : -1; }     



        function reposition() {
            var height = $("#cryptocurrencies .cryptocurrency").height();
            var y = height;
            for(var i = 0; i < cryptocurrencies.length; i++) {
                cryptocurrencies[i].$item.css("top", y + "px");
                y += height;			
            }
        }  
        function updateRanks(cryptocurrencies) {
            for(var i = 0; i < cryptocurrencies.length; i++) {
                cryptocurrencies[i].$item.find(".rank").text(i + 1);	
            }
        }

        function fetchNewData(data,attributeName,name){
            for(var x in data){
                if((data[x].name == name) == true) {
                    return data[x][attributeName];
                }
            }
            return null;
        }      
          

        function getNewData(){
            // get the new data for each coin and change to their new values
            var newReq = new XMLHttpRequest();
            newReq.open("GET", SUPABASE_DATABASE, false);
            newReq.send(null);
            var newData1 = JSON.parse(newReq.responseText); 
            var newData = JSON.stringify(newData1);


            updateRanks(cryptocurrencies);
            reposition();
            console.log('Finished retrieving new data');
            
        }

        function leaderboards(users) {
  return users.sort((a, b) => b.cash-a.cash);
}
leaderboards(data1);

    
        function resetBoard() {
            var $list = $("#cryptocurrencies");
            $list.find(".cryptocurrency").remove();
            if(timerId !== undefined) {
                clearInterval(timerId);
            }

           
            cryptocurrencies = [];
            for(let i = 0;i < 11;i++){
    //function for comparing dates from server as the old time and client as the new time
                function compareData(){
                    let parsed1 = data1[i].Date; 
                    let newTime = new Date();
                    let newTfact = newTime.getTime();
                    let diferenceTime = newTfact - parsed1;
                    let differenD = Math.floor(diferenceTime / (1000 * 3600 * 23));
                    return differenD + " days";
                }
                
                cryptocurrencies.push(
                    {
                        name : data1[i].name,
                        instagram: data1[i].instagram,
                        youtube: data1[i].youtube,
                        twitch: data1[i].twitch,
                        reddit: data1[i].reddit,
                        twitter: data1[i].twitter,
                        alive: data1[i].alive,
                        region: data1[i].region,
                        alive: compareData(),
                        percent_change_24h: data1[i].cash,

                    }
                )
            }
      
           
            
            for(var i = 0; i < cryptocurrencies.length; i++) {

                var $item = $(
                    "<tr class='cryptocurrency'>" + 
                        "<th class='rank'>" + (i + 1) + "</th>" + 
                        "<td class='name'>" + cryptocurrencies[i].name + "</td>" +
                        "<td class='instagram'>" + cryptocurrencies[i].instagram + "</td>" + 
                        "<td class='youtube'>" + cryptocurrencies[i].youtube + "</td>" + 
                        "<td class='twitch'>" + cryptocurrencies[i].twitch + "</td>" + 
                        "<td class='reddit'>" + cryptocurrencies[i].reddit + "</td>" + 
                        "<td class='twitter'>" + cryptocurrencies[i].twitter + "</td>" + 
                        "<td class='ailve'>" + cryptocurrencies[i].alive + "</td>" + 
                        "<td class='region'>" + cryptocurrencies[i].region + "</td>" +
                         

                    "</tr>"
                );

                cryptocurrencies[i].$item = $item;
                $list.append($item);

          
             
            }
            cryptocurrencies.sort(descending);
            updateRanks(cryptocurrencies);
            reposition();
            
            // fetch new data for the updateInterval
            timerId = setInterval("getNewData();", updateInterval);

        }	
        resetBoard();


})

//2 table
const result2 = fetch(`${url}`, { method: 'get' })
  .then(response => response.json()) 
  .then(res => {

  


            function getRowPositions(element) {
            var rowJavascript = element.parentNode.parentNode;
            var rowjQuery = $(element).closest("tr");
            let a = rowJavascript.rowIndex -1;
            indexPos.push(a);
            localStorage.setItem('ID', a);
            localStorage.ID = a;
        }

        var xhReq = new XMLHttpRequest();
        xhReq.open("GET", `${url}`, false,);
        xhReq.send(null);

        const data1 = JSON.parse(xhReq.responseText); 
        const data = JSON.stringify(data1);
        // initialization
        var cryptocurrencies;
        var timerId;
        var updateInterval = 2000000;

        let rowPos;
        let indexPos = [];
        let ids;
       

     
        function descending(a, b) { return a.percent_change_24h < b.percent_change_24h ? 1 : -1; }     



        function reposition() {
            var height = $("#cryptocurrencies2 .cryptocurrency").height();
            var y = height;
            for(var i = 0; i < cryptocurrencies.length; i++) {
                cryptocurrencies[i].$item.css("top", y + "px");
                y += height;			
            }
        }  
        
        function updateRanks(cryptocurrencies) {
            for(var i = 0; i < cryptocurrencies.length; i++) {
                cryptocurrencies[i].$item.find(".rank").text(i + 12);	
            }
        }

        function fetchNewData(data,attributeName,name){
            for(var x in data){
                if((data[x].name == name) == true) {
                    return data[x][attributeName];
                }
            }
            return null;
        }      
          

        function getNewData(){
            // get the new data for each coin and change to their new values
            var newReq = new XMLHttpRequest();
            newReq.open("GET", SUPABASE_DATABASE, false);
            newReq.send(null);
            var newData1 = JSON.parse(newReq.responseText); 
            var newData = JSON.stringify(newData1);


            updateRanks(cryptocurrencies);
            reposition();
            console.log('Finished retrieving new data');
            
        }

        function leaderboards(users) {
  return users.sort((a, b) => b.cash-a.cash);
}
leaderboards(data1);

    
        function resetBoard() {
            var $list = $("#cryptocurrencies2");
            $list.find(".cryptocurrency").remove();
            if(timerId !== undefined) {
                clearInterval(timerId);
            }

           
            cryptocurrencies = [];
            for(let i = 12;i < 31;i++){
    //function for comparing dates from server as the old time and client as the new time
                function compareData(){
                    let parsed1 = data1[i].Date; 
                    let newTime = new Date();
                    let newTfact = newTime.getTime();
                    let diferenceTime = newTfact - parsed1;
                    let differenD = Math.floor(diferenceTime / (1000 * 3600 * 24));
                    return differenD + " days";
                }
                
                cryptocurrencies.push(
                    {
                        name : data1[i].name,
                        instagram: data1[i].instagram,
                        youtube: data1[i].youtube,
                        twitch: data1[i].twitch,
                        reddit: data1[i].reddit,
                        twitter: data1[i].twitter,
                        alive: data1[i].alive,
                        region: data1[i].region,
                        alive: compareData(),
                        percent_change_24h: data1[i].cash,

                    }
                )
            }
      
           
            
            for(var i = 0; i < cryptocurrencies.length; i++) {

                var $item = $(
                    "<tr class='cryptocurrency'>" + 
                        "<th class='rank'>" + (i + 1) + "</th>" + 
                        "<td class='name'>" + cryptocurrencies[i].name + "</td>" + 
                        "<td class='instagram'>" + cryptocurrencies[i].instagram + "</td>" + 
                        "<td class='youtube'>" + cryptocurrencies[i].youtube + "</td>" + 
                        "<td class='twitch'>" + cryptocurrencies[i].twitch + "</td>" + 
                        "<td class='reddit'>" + cryptocurrencies[i].reddit + "</td>" + 
                        "<td class='twitter'>" + cryptocurrencies[i].twitter + "</td>" + 
                        "<td class='ailve'>" + cryptocurrencies[i].alive + "</td>" + 
                        "<td class='region'>" + cryptocurrencies[i].region + "</td>" +
                         

                    "</tr>"
                );

                cryptocurrencies[i].$item = $item;
                $list.append($item);

          
             
            }
            cryptocurrencies.sort(descending);
            updateRanks(cryptocurrencies);
            reposition();
            
            timerId = setInterval("getNewData();", updateInterval);

        }	
        resetBoard();


})


//3 table 


const result3 = fetch(`${url}`, { method: 'get' })
  .then(response => response.json()) 
  .then(res => {




            function getRowPositions(element) {
            var rowJavascript = element.parentNode.parentNode;
            var rowjQuery = $(element).closest("tr");
            let a = rowJavascript.rowIndex -1;
            indexPos.push(a);
            localStorage.setItem('ID', a);
            localStorage.ID = a;
        }

        var xhReq = new XMLHttpRequest();
        xhReq.open("GET", `${url}`, false,);
        xhReq.send(null);

        const data1 = JSON.parse(xhReq.responseText); 
        const data = JSON.stringify(data1);
        // initialization
        var cryptocurrencies;
        var timerId;
        var updateInterval = 2000000;

        let rowPos;
        let indexPos = [];
        let ids;
       

     
        function descending(a, b) { return a.percent_change_24h < b.percent_change_24h ? 1 : -1; }     



        function reposition() {
            var height = $("#cryptocurrencies3 .cryptocurrency").height();
            var y = height;
            for(var i = 0; i < cryptocurrencies.length; i++) {
                cryptocurrencies[i].$item.css("top", y + "px");
                y += height;			
            }
        }  
        
        function updateRanks(cryptocurrencies) {
            for(var i = 0; i < cryptocurrencies.length; i++) {
                cryptocurrencies[i].$item.find(".rank").text(i + 23);	
            }
        }

        function fetchNewData(data,attributeName,name){
            for(var x in data){
                if((data[x].name == name) == true) {
                    return data[x][attributeName];
                }
            }
            return null;
        }      
          

        function getNewData(){
            var newReq = new XMLHttpRequest();
            newReq.open("GET", SUPABASE_DATABASE, false);
            newReq.send(null);
            var newData1 = JSON.parse(newReq.responseText); 
            var newData = JSON.stringify(newData1);


            updateRanks(cryptocurrencies);
            reposition();
            console.log('Finished retrieving new data');
            
        }

        function leaderboards(users) {
  return users.sort((a, b) => b.cash-a.cash);
}
leaderboards(data1);

    
        function resetBoard() {
            var $list = $("#cryptocurrencies3");
            $list.find(".cryptocurrency").remove();
            if(timerId !== undefined) {
                clearInterval(timerId);
            }

           
            cryptocurrencies = [];
            for(let i = 32;i < 59;i++){
                function compareData(){
                    let parsed1 = data1[i].Date; 
                    let newTime = new Date();
                    let newTfact = newTime.getTime();
                    let diferenceTime = newTfact - parsed1;
                    let differenD = Math.floor(diferenceTime / (1000 * 3600 * 24));
                    return differenD + " days";
                }
                
                cryptocurrencies.push(
                    {
                        name : data1[i].name,
                        instagram: data1[i].instagram,
                        youtube: data1[i].youtube,
                        twitch: data1[i].twitch,
                        reddit: data1[i].reddit,
                        twitter: data1[i].twitter,
                        alive: data1[i].alive,
                        region: data1[i].region,
                        alive: compareData(),
                        percent_change_24h: data1[i].cash,

                    }
                )
            }
      
           
            
            for(var i = 0; i < cryptocurrencies.length; i++) {

                var $item = $(
                    "<tr class='cryptocurrency'>" + 
                        "<th class='rank'>" + (i + 1) + "</th>" + 
                        "<td class='name'>" + cryptocurrencies[i].name + "</td>" + 
                        "<td class='instagram'>" + cryptocurrencies[i].instagram + "</td>" + 
                        "<td class='youtube'>" + cryptocurrencies[i].youtube + "</td>" + 
                        "<td class='twitch'>" + cryptocurrencies[i].twitch + "</td>" + 
                        "<td class='reddit'>" + cryptocurrencies[i].reddit + "</td>" + 
                        "<td class='twitter'>" + cryptocurrencies[i].twitter + "</td>" + 
                        "<td class='ailve'>" + cryptocurrencies[i].alive + "</td>" + 
                        "<td class='region'>" + cryptocurrencies[i].region + "</td>" +
                         

                    "</tr>"
                );

                cryptocurrencies[i].$item = $item;
                $list.append($item);

          
             
            }
            cryptocurrencies.sort(descending);
            updateRanks(cryptocurrencies);
            reposition();
            
            // fetch new data for the updateInterval
            timerId = setInterval("getNewData();", updateInterval);

        }	
        resetBoard();


})

//4 table 


const result4 = fetch(`${url}`, { method: 'get' })
  .then(response => response.json()) 
  .then(res => {

    
            function getRowPositions(element) {
            var rowJavascript = element.parentNode.parentNode;
            var rowjQuery = $(element).closest("tr");
            let a = rowJavascript.rowIndex -1;
            indexPos.push(a);
            localStorage.setItem('ID', a);
            localStorage.ID = a;
        }

        var xhReq = new XMLHttpRequest();
        xhReq.open("GET", `${url}`, false,);
        xhReq.send(null);

        const data1 = JSON.parse(xhReq.responseText); 
        const data = JSON.stringify(data1);
        // initialization
        var cryptocurrencies;
        var timerId;
        var updateInterval = 2000000;

        let rowPos;
        let indexPos = [];
        let ids;
       

     
        function descending(a, b) { return a.percent_change_24h < b.percent_change_24h ? 1 : -1; }     



        function reposition() {
            var height = $("#cryptocurrencies4 .cryptocurrency").height();
            var y = height;
            for(var i = 0; i < cryptocurrencies.length; i++) {
                cryptocurrencies[i].$item.css("top", y + "px");
                y += height;			
            }
        }  
        
        function updateRanks(cryptocurrencies) {
            for(var i = 0; i < cryptocurrencies.length; i++) {
                cryptocurrencies[i].$item.find(".rank").text(i + 32);	
            }
        }

        function fetchNewData(data,attributeName,name){
            for(var x in data){
                if((data[x].name == name) == true) {
                    return data[x][attributeName];
                }
            }
            return null;
        }      
          

        function getNewData(){
            var newReq = new XMLHttpRequest();
            newReq.open("GET", SUPABASE_DATABASE, false);
            newReq.send(null);
            var newData1 = JSON.parse(newReq.responseText); 
            var newData = JSON.stringify(newData1);


            updateRanks(cryptocurrencies);
            reposition();
            console.log('Finished retrieving new data');
            
        }

        function leaderboards(users) {
  return users.sort((a, b) => b.cash-a.cash);
}
leaderboards(data1);

    
        function resetBoard() {
            var $list = $("#cryptocurrencies4");
            $list.find(".cryptocurrency").remove();
            if(timerId !== undefined) {
                clearInterval(timerId);
            }

           
            cryptocurrencies = [];
            for(let i = 60;i < 87;i++){
                function compareData(){
                    let parsed1 = data1[i].Date; 
                    let newTime = new Date();
                    let newTfact = newTime.getTime();
                    let diferenceTime = newTfact - parsed1;
                    let differenD = Math.floor(diferenceTime / (1000 * 3600 * 24));
                    return differenD + " days";
                }
                
                cryptocurrencies.push(
                    {
                        name : data1[i].name,
                        instagram: data1[i].instagram,
                        youtube: data1[i].youtube,
                        twitch: data1[i].twitch,
                        reddit: data1[i].reddit,
                        twitter: data1[i].twitter,
                        alive: data1[i].alive,
                        region: data1[i].region,
                        alive: compareData(),
                        percent_change_24h: data1[i].cash,

                    }
                )
            }
      
           
            
            for(var i = 0; i < cryptocurrencies.length; i++) {

                var $item = $(
                    "<tr class='cryptocurrency'>" + 
                        "<th class='rank'>" + (i + 1) + "</th>" + 
                        "<td class='name'>" + cryptocurrencies[i].name + "</td>" + 
                        "<td class='instagram'>" + cryptocurrencies[i].instagram + "</td>" + 
                        "<td class='youtube'>" + cryptocurrencies[i].youtube + "</td>" + 
                        "<td class='twitch'>" + cryptocurrencies[i].twitch + "</td>" + 
                        "<td class='reddit'>" + cryptocurrencies[i].reddit + "</td>" + 
                        "<td class='twitter'>" + cryptocurrencies[i].twitter + "</td>" + 
                        "<td class='ailve'>" + cryptocurrencies[i].alive + "</td>" + 
                        "<td class='region'>" + cryptocurrencies[i].region + "</td>" +
                         

                    "</tr>"
                );

                cryptocurrencies[i].$item = $item;
                $list.append($item);

          
             
            }
            cryptocurrencies.sort(descending);
            updateRanks(cryptocurrencies);
            reposition();
            
            timerId = setInterval("getNewData();", updateInterval);

        }	
        resetBoard();


})

//5 table 


const result5 = fetch(`${url}`, { method: 'get' })
  .then(response => response.json()) 
  .then(res => {

    
    

            function getRowPositions(element) {
            var rowJavascript = element.parentNode.parentNode;
            var rowjQuery = $(element).closest("tr");
            let a = rowJavascript.rowIndex -1;
            indexPos.push(a);
            localStorage.setItem('ID', a);
            localStorage.ID = a;
        }

        var xhReq = new XMLHttpRequest();
        xhReq.open("GET", `${url}`, false,);
        xhReq.send(null);

        const data1 = JSON.parse(xhReq.responseText); 
        const data = JSON.stringify(data1);
        // initialization
        var cryptocurrencies;
        var timerId;
        var updateInterval = 2000000;

        let rowPos;
        let indexPos = [];
        let ids;
       

     
        function descending(a, b) { return a.percent_change_24h < b.percent_change_24h ? 1 : -1; }     



        function reposition() {
            var height = $("#cryptocurrencies5 .cryptocurrency").height();
            var y = height;
            for(var i = 0; i < cryptocurrencies.length; i++) {
                cryptocurrencies[i].$item.css("top", y + "px");
                y += height;			
            }
        }  
        
        function updateRanks(cryptocurrencies) {
            for(var i = 0; i < cryptocurrencies.length; i++) {
                cryptocurrencies[i].$item.find(".rank").text(i + 43);	
            }
        }

        function fetchNewData(data,attributeName,name){
            for(var x in data){
                if((data[x].name == name) == true) {
                    return data[x][attributeName];
                }
            }
            return null;
        }      
          

        function getNewData(){
            var newReq = new XMLHttpRequest();
            newReq.open("GET", SUPABASE_DATABASE, false);
            newReq.send(null);
            var newData1 = JSON.parse(newReq.responseText); 
            var newData = JSON.stringify(newData1);


            updateRanks(cryptocurrencies);
            reposition();
            console.log('Finished retrieving new data');
            
        }

        function leaderboards(users) {
  return users.sort((a, b) => b.cash-a.cash);
}
leaderboards(data1);

    
        function resetBoard() {
            var $list = $("#cryptocurrencies5");
            $list.find(".cryptocurrency").remove();
            if(timerId !== undefined) {
                clearInterval(timerId);
            }

           
            cryptocurrencies = [];
            for(let i = 88;i < 115;i++){
                function compareData(){
                    let parsed1 = data1[i].Date; 
                    let newTime = new Date();
                    let newTfact = newTime.getTime();
                    let diferenceTime = newTfact - parsed1;
                    let differenD = Math.floor(diferenceTime / (1000 * 3600 * 24));
                    return differenD + " days";
                }
                
                cryptocurrencies.push(
                    {
                        name : data1[i].name,
                        instagram: data1[i].instagram,
                        youtube: data1[i].youtube,
                        twitch: data1[i].twitch,
                        reddit: data1[i].reddit,
                        twitter: data1[i].twitter,
                        alive: data1[i].alive,
                        region: data1[i].region,
                        alive: compareData(),
                        percent_change_24h: data1[i].cash,

                    }
                )
            }
      
           
            
            for(var i = 0; i < cryptocurrencies.length; i++) {

                var $item = $(
                    "<tr class='cryptocurrency'>" + 
                        "<th class='rank'>" + (i + 1) + "</th>" + 
                        "<td class='name'>" + cryptocurrencies[i].name + "</td>" + 
                        "<td class='instagram'>" + cryptocurrencies[i].instagram + "</td>" + 
                        "<td class='youtube'>" + cryptocurrencies[i].youtube + "</td>" + 
                        "<td class='twitch'>" + cryptocurrencies[i].twitch + "</td>" + 
                        "<td class='reddit'>" + cryptocurrencies[i].reddit + "</td>" + 
                        "<td class='twitter'>" + cryptocurrencies[i].twitter + "</td>" + 
                        "<td class='ailve'>" + cryptocurrencies[i].alive + "</td>" + 
                        "<td class='region'>" + cryptocurrencies[i].region + "</td>" +
                         

                    "</tr>"
                );

                cryptocurrencies[i].$item = $item;
                $list.append($item);

          
             
            }
            cryptocurrencies.sort(descending);
            updateRanks(cryptocurrencies);
            reposition();
            
            timerId = setInterval("getNewData();", updateInterval);

        }	
        resetBoard();


})

