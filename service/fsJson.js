const fs = require('fs');
fs.readFile('./data_json/goods.json', 'utf8', (err, data) => {
    let newData = JSON.parse(data);
    let pushData = [];
    let i =0;
    console.log('newData', newData);
    newData.RECORDS.map((value, index) => {
        if (value.IMAGE1!== null) {
            i++;
            console.log('value.NAME',value.NAME);
            pushData.push(value)
        }
    })
    console.log(i)
    
    fs.writeFile('./newgoodss.json', JSON.stringify(pushData), (err) => {
        if(err) console.log('写入失败')
        else console.log('写入成功')
    })
})

