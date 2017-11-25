var socket = require('socket.io-client')('http://balabanovo.westeurope.cloudapp.azure.com');

// notify that connection was established.
socket.on('connect', function(){
    console.log('Connected');
});


// subscribe to the raw reader data.
socket.on('inventory', function(data){
    // each reader emits itw own inventory cycle
    // the reader at Junction 2017 is having mac address 00:16:25:12:16:4F 
    // we need to filter out all other messages
    // data format is {macAddress, inventoryRecords}
    if(data.macAddress !== '00:16:25:12:16:4F'){
        return;
    }
    // do stuff here
    console.log(data.orderedRecords);

    // if you see epc of the tag == '********' - dpo not panic, this is heardbit of the reader.
});

// what to do on disconnect
socket.on('disconnect', function(){
    console.log('Disconnected');
});