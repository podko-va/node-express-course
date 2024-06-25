const EventEmitter = require("events");

const emitter = new EventEmitter(); 

setInterval(() => {  
  emitter.emit("timer", "Are you here?");  
}, 300000);  
emitter.on("timer", (msg) => console.log(msg));

const emitter1 = new EventEmitter();  
const waitForEvent = () => {  
  return new Promise((resolve) => {  
    emitter1.on("happens", (msg) => resolve(msg));  
  });  
};  
const doWait = async () => {  
  const msg = await waitForEvent();  
  console.log("We got an event! Here it is: ", msg);  
};  

doWait(); 

setTimeout(() => {
  emitter1.emit("happens", "Time to do homework!!");
}, 300000);  