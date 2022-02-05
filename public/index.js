
function getColor(stock){
    if(stock === 'GME'){
        return 'rgba(61, 161, 61, .7)'
    }
    if(stock === 'MSFT'){
        return 'rgba(209, 4, 25, .7)'
    }
    if(stock === 'DIS'){
        return 'rgba(18, 4, 209, .7)'
    }
    if(stock === 'BNTX'){
        return 'rgba(166, 43, 158, .7)'
    }
}


async function main() {

    const timeChartCanvas = document.querySelector('#time-chart').getContext('2d');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart').getContext('2d');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    const response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=d5602cf43d9d4f9bac2e9030d410a448')

    //d5602cf43d9d4f9bac2e9030d410a448 apikey

    let jsonString = await response.text()
    let resultObject = JSON.parse(jsonString)
    //console.log('object')
    //console.log(resultObject)

    const { GME, MSFT, DIS, BNTX } = resultObject
    const stocks = [GME, MSFT, DIS, BNTX]
    console.log('array')
    console.log(stocks[0])
    console.log('chart')
    console.log(stocks[0].values)
    console.log('values')
    //console.log(stocks[0].value.values)
    console.log(stocks[0].meta.symbol)
    /*
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    */
    stocks.forEach(stock => stock.values.reverse())

    var myChart = new Chart(timeChartCanvas, {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({

                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),

            }))
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });



    // highest stock price
    /*
    let objectStock2 = highestStockValue(stocks[0])
    let objectStock2_1 = highestStockValue(stocks[1])
    let objectStock2_2 = highestStockValue(stocks[2])
    let objectStock2_3 = highestStockValue(stocks[3])
    */
    console.log('stocks[0].value')
    console.log(stocks[0].values)
    console.log(stocks[0].values[0])
    //const {high} = stocks.values.high



    //let highestVarray = [objectStock2, objectStock2_1, objectStock2_2, objectStock2_3]
    //let nameArray = [objectStock, objectStock2_1, objectStock2_2, objectStock2_3]
    var myChart2 = new Chart(highestPriceChartCanvas, {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: stocks.map(stock => ({

                label: 'Highest',
                data: stocks.map(stock => (findHighest(stock.values))),
                backgroundColor: stocks.map(stock => (getColor(stock.meta.symbol)
                    )),
                borderColor: stocks.map(stock => (getColor(stock.meta.symbol)
                    )),

            }))
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    //highestVarray.map(value => value.highestV)

      
      
}






function getColor(stock) {
    if (stock === "GME") {
        return 'rgba(61, 161, 61, 0.7)'
    }
    if (stock === "MSFT") {
        return 'rgba(209, 4, 25, 0.7)'
    }
    if (stock === "DIS") {
        return 'rgba(18, 4, 209, 0.7)'
    }
    if (stock === "BNTX") {
        return 'rgba(166, 43, 158, 0.7)'
    }
}

/*
function highestStockValue(stocks) {

    let highestValue = 0
    let stockName
    console.log('stocksforeach')
    console.log(stocks)
    stocks.forEach(stock => {
        if(parseFloat(stock.high) > highestValue) {
            highestValue = stock.high
        }
        stockName = stock.meta.symbol
        
    })
    return highestValue

}

*/

function findHighest(values) {
    console.log(values)
    let highest = 0
    values.forEach(value => {
        if (parseFloat(value.high) > highest) {
            highest = value.high
        }

    })
    return highest
}


main()