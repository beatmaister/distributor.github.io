
// chart text color
Chart.defaults.global.defaultFontColor = "black";

// verifying input.
const allowed = [',','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];

// locating all 5 separate graphs and toggle buttons.
const button = document.getElementById("apply");
const toggle1 = document.getElementById("toggle1");
const toggle2 = document.getElementById("toggle2");
const toggle3 = document.getElementById("toggle3");
const toggle4 = document.getElementById("toggle4");
const toggle5 = document.getElementById("toggle5");
const graph1 = document.getElementById("g1");
const gm1 = document.getElementById("gm1");
const graph2 = document.getElementById("g2");
const gm2 = document.getElementById("gm2");
const graph3 = document.getElementById("g3");
const gm3 = document.getElementById("gm3");
const graph4 = document.getElementById("g4");
const gm4 = document.getElementById("gm4");
const graph5 = document.getElementById("g5");
const gm5 = document.getElementById("gm5");

// search form, and input
const bar = document.getElementById("search");
var form = document.getElementById("search_box");


// upon search bar entry...
// check if each character is allowed, and there are  at most  5 entries.
// split by comma, and store into an array.
// store the array in local storage,
// iterate through names in array to do API calls.
button.onclick = function() {
    value = form.elements[0].value;
    checker = value.split('');
    checker.forEach(elem => {
        if(!allowed.includes(elem)){ alert("please only enter letters and commas"); return; }
    }); 

    split = value.split(",");
    if(value.endsWith(',')) split[split.length-1]=null;
    if(split.length>5){
        alert("Only 5 or less companies please");
        return;
    }
    
    localStorage.setItem('tickers', JSON.stringify(split));

    var page = 0;
    while(page<split.length){
        fillData(split[page], page+1);
        page++;
    }
}

// while typing in bar, only allow set characters.
bar.addEventListener('keydown', (e)=>{
    if(!allowed.includes(e.key) && e.key!='Shift' && e.key!='CapsLock' && e.key!='Backspace' && e.key!='Enter'){
        e.preventDefault();
        alert("enter letters and commas");
    }
})

// getting all data for each stock it is called for, in 3 requests.
function  fillData(ticker, number){
    // locating divs in which info will be displayed
    const name = document.getElementById("name"+number);
    const high = document.getElementById("high"+number);
    const low = document.getElementById("low"+number);
    const volume = document.getElementById("volume"+number);
    const current = document.getElementById("current"+number);
    const graph = 'graph'+number;
    const graphv = 'graphv'+number;
    const graphm = 'graphm'+number;
    const graphvm = 'graphvm'+number;
    const box = document.getElementById(graph);
    
    // graph data
    var xValues = []; var  xValuesm =[];
    var data1 = []; var data1m = [];
    var data2 = []; var data2m = [];
    var data3 = []; var data3m = [];
    
    // requesting intra-day prices, and printing data.
    var minute_url = 'https://cloud.iexapis.com/v1/stock/' + ticker.toUpperCase() + '/intraday-prices/?token=pk_49963f2da4de4a1280e096da997ad371';
    fetch(minute_url)
    .then(response => {
        return response.json()
    }).then(data => {
        name.innerHTML = ticker.toUpperCase();
        high.innerHTML = 'High: ' + data[data.length-1].high;
        low.innerHTML = 'Low: ' + data[data.length-1].low;
        volume.innerHTML = 'Volume: ' + data[data.length-1].volume;
        current.innerHTML = 'Current: ' + data[data.length-1].average;
    })
    
    // requesting past 2 weeks prices and creating graphs with data.
    var day_url = 'https://cloud.iexapis.com/v1/stock/'+ticker.toUpperCase()+'/chart/2w/?dateField=date&chartByDay=true&token=pk_49963f2da4de4a1280e096da997ad371';
    fetch(day_url)
    .then(response => {
        return response.json()     
    }).then(datas=>{
        for(i=0;i<datas.length;i++){
            xValues[i] = datas[i].priceDate;
            data1[i] = datas[i].high;
            data2[i] = datas[i].low;
            data3[i] = datas[i].volume / 100000;
        }
        const price_chart = new Chart(graph, {
            type: "line",
            data: {
              labels: xValues,
              datasets: [{
                borderWidth: 5,
                label: 'highs',
                data: data1,
                borderColor: "green",
                fill: false
              },{
                borderWidth: 5,
                label: 'lows',
                data: data2,
                borderColor: "red",
                fill: false
              }]
            },
            options: {
                responsive: true,
                plugins: {
                  tooltip: {
                    mode: 'index',
                    intersect: false
                  },
                  title: {
                    display: true,
                    text: 'Price chart'
                  },
                  datalabels: {
                    color:'black',
                    
                  }
                },
                hover: {
                  mode: 'index',
                  intersec: false
                },
                scales: {
                    x: {
                    ticks:{
                        color:"black",
                    },
                    title: {
                        display: true,
                        text: 'Date'
                    }
                    },
                    y: {
                    ticks:{
                        color:"black",
                    },
                    title: {
                        display: true,
                        text: 'Price'
                    },
                    min: 0,
                    max: 100,
                    ticks: {
                        // forces step size to be 50 units
                        stepSize: 50
                    }
                    }
                }
              },
        });
        const vol_chart = new Chart(graphv, {
            type: "line",
            data: {
              labels: xValues,
              datasets: [{
                borderWidth: 5,
                label: 'Volume(/100k)',
                data: data3,
                borderColor: "orange",
                fill: false
              }]
            },
            options: {
                responsive: true,
                plugins: {
                  tooltip: {
                    mode: 'index',
                    intersect: false
                  },
                  title: {
                    display: true,
                    text: 'Price chart'
                  },
                  datalabels: {
                    color:'black',
                    
                  }
                },
                hover: {
                  mode: 'index',
                  intersec: false
                },
                scales: {
                    x: {
                    ticks:{
                        color:"black",
                    },
                    title: {
                        display: true,
                        text: 'Date'
                    }
                    },
                    y: {
                    ticks:{
                        color:"black",
                    },
                    title: {
                        display: true,
                        text: 'Volume'
                    },
                    min: 0,
                    max: 100,
                    ticks: {
                        // forces step size to be 50 units
                        stepSize: 50
                    }
                    }
                }
              },
        });   

    })

    //requesting past month data, and creating graphs with data
    var month_url = 'https://cloud.iexapis.com/v1/stock/'+ticker.toUpperCase()+'/chart/1m/?dateField=date&chartByDay=true&token=pk_49963f2da4de4a1280e096da997ad371';
    fetch(month_url)
    .then(response => {
        return response.json()     
    }).then(datas=>{
        for(i=0;i<datas.length;i++){
            xValuesm[i] = datas[i].priceDate;
            data1m[i] = datas[i].high;
            data2m[i] = datas[i].low;
            data3m[i] = datas[i].volume / 100000;
        }

        const price_chartm = new Chart(graphm, {
            type: "line",
            data: {
              labels: xValuesm,
              datasets: [{
                borderWidth: 5,
                label: 'highs',
                data: data1m,
                borderColor: "green",
                fill: false
              },{
                borderWidth: 5,
                label: 'lows',
                data: data2m,
                borderColor: "red",
                fill: false
              }]
            },
            options: {
                responsive: true,
                plugins: {
                  tooltip: {
                    mode: 'index',
                    intersect: false
                  },
                  title: {
                    display: true,
                    text: 'Price chart'
                  },
                  datalabels: {
                    color:'black',
                    
                  }
                },
                hover: {
                  mode: 'index',
                  intersec: false
                },
                scales: {
                    x: {
                    ticks:{
                        color:"black",
                    },
                    title: {
                        display: true,
                        text: 'Date'
                    }
                    },
                    y: {
                    ticks:{
                        color:"black",
                    },
                    title: {
                        display: true,
                        text: 'Price'
                    },
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 50
                    }
                    }
                }
              },
        });
        const vol_chartm = new Chart(graphvm, {
            type: "line",
            data: {
              labels: xValuesm,
              datasets: [{
                borderWidth: 5,
                label: 'Volume(/100k)',
                data: data3m,
                borderColor: "orange",
                fill: false
              }]
            },
            options: {
                responsive: true,
                plugins: {
                  tooltip: {
                    mode: 'index',
                    intersect: false
                  },
                  title: {
                    display: true,
                    text: 'Price chart'
                  },
                  datalabels: {
                    color:'black',
                    
                  }
                },
                hover: {
                  mode: 'index',
                  intersec: false
                },
                scales: {
                    x: {
                    ticks:{
                        color:"black",
                    },
                    title: {
                        display: true,
                        text: 'Date'
                    }
                    },
                    y: {
                    ticks:{
                        color:"black",
                    },
                    title: {
                        display: true,
                        text: 'Volume'
                    },
                    min: 0,
                    max: 100,
                    ticks: {
                        // forces step size to be 50 units
                        stepSize: 50
                    }
                    }
                }
              },
        }); 
    })
              
}
window.addEventListener('load', ()=> {
    stored = JSON.parse(localStorage.getItem("tickers"));
    index=0;
    if(stored==null) return;
    while(index<stored.length){
        fillData(stored[index], index+1);
        index++;
    }
})

// toggling graph between month, and twoo week data
// depending on stock clicked.
toggle1.addEventListener('click', ()=>{
    if(gm1.style.display == 'none'){
        gm1.style.display = 'flex';
        graph1.style.display = 'none';
    }else{
        gm1.style.display = 'none';
        graph1.style.display = 'flex';
    }  
})
toggle2.addEventListener('click', ()=>{
    if(gm2.style.display == 'none'){
        gm2.style.display = 'flex';
        graph2.style.display = 'none';
    }else{
        gm2.style.display = 'none';
        graph2.style.display = 'flex';
    }
      
})
toggle3.addEventListener('click', ()=>{
    if(gm3.style.display == 'none'){
        gm3.style.display = 'flex';
        graph3.style.display = 'none';
    }else{
        gm3.style.display = 'none';
        graph3.style.display = 'flex';
    }
      
})
toggle4.addEventListener('click', ()=>{
    if(gm4.style.display == 'none'){
        gm4.style.display = 'flex';
        graph4.style.display = 'none';
    }else{
        gm4.style.display = 'none';
        graph4.style.display = 'flex';
    }
      
})
toggle5.addEventListener('click', ()=>{
    if(gm5.style.display == 'none'){
        gm5.style.display = 'flex';
        graph5.style.display = 'none';
    }else{
        gm5.style.display = 'none';
        graph5.style.display = 'flex';
    }
      
})















