# Stora Enso Junction 2017

![logo stora enso](https://res.cloudinary.com/stora-enso-oyj/image/upload/w_150/v1509270350/2RMlMCWY_1_hw4eey.jpg)

Hi! This is the explanation of what devices we have at the Junction. The protocols and message formats and how to use the devices.

# Table of content

1. [Industrial RFID Reader (Impinj)](#ndustrial-rfid-reader-impinj)
    - [MQTT Broker and Test Application](#mqtt-broker-and-test-application)
    - [Locations, Tags and Topics](#locations-tags-and-topics)
    - [JavaScript example over WebSockets](#javascript-example-over-websocket)


# Industrial RFID Reader (Impinj)

At the Junction we provide you the Industrial RFID reader manufactured by Imping. We use Stora Enso Track and Trace backend to report the readings to our cloud and allow you to subscribe for the events over MQTT.

## MQTT Broker and Test Application 

The MQTT broker is hosted at the `mqtt.intelligentpackaging.online`. See the `mqtt` folder for an example React application that listens necessary topics.

> The MQTT accepts connections over TCP on the standard MQTT port `1883` or over WebSocket over port `9001`.

To start test application execute:

```
npm start
```
## Locations, Tags and Topics 

The industrial readers are usually used to track the item over place and time. It has up to four antennas and each of them can report to a one single location.

In our Junction case we defined four test locations:

1. Junction.2017.1
1. Junction.2017.2
1. Junction.2017.3
1. Junction.2017.4

Every time UHF tag is changing the location, the MQTT message is broadcasted under the following topics:

1. `location/:locationId/tagEntered` - fires every time tag has entered the location with `:locationId`;
2. `location/:locationId/tagLeft` - fires every time tag has left the location with `:locationId`

Payload of the message is only tag ID (aka EPC code) - a unique tag identifier written by the manufacturer - a HEX number with 12 bytes (96 bits).

![](https://res.cloudinary.com/stora-enso-oyj/image/upload/v1511201030/16814_1_n9ehhn.jpg)

Don't worry, you don't need to know what are the parts of the EPC, just know - they are unique and can act as identifiers.

For instance in our case if you subscribe for the topic `location/Junction.2017.3/tagLeft` you will receive EPC code of the tag each time it is appears there.

The reader you will get at Junction is configured so each antenna reports to each location according to antenna number.

Also you can use standard MQTT wildcard `+` or `#` to compose flexible subscriptions. [More info on wildcards](https://www.hivemq.com/blog/mqtt-essentials-part-5-mqtt-topics-best-practices)

## JavaScript example over WebSockets

Install mqtt package

```
npm install mqtt
```

Create client

```js
import mqtt from 'mqtt';

// notice, this example is running over web sockets
let client  = mqtt.connect({
    host: 'mqtt.intelligentpackaging.online',
    port: 9001
});
```

Subscribe for interested topics when client is connected

```js
client.on('connect', () => {
    client.subscribe('location/+/tagEntered');
    client.subscribe('location/+/tagLeft');
})
```

Receive message and do stuff

```js
client.on('message', (topic, message) => {
    // NOTE! message comes as an array of bytes.
    console.log(topic, message.toString());
    
    // do stuff here...
});
```







