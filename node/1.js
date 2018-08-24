const fs = require('fs');
console.log('beginning of the program');
const promise = new Promise(resolve => {
    // function, passed to the Promise constructor
    // is executed synchronously!
    console.log('I am in the promise function!');
    resolve('resolved message');
});
promise.then(() => {
    console.log('I am in the first resolved promise');
}).then(() => {
    console.log('I am in the second resolved promise');
});
process.nextTick(() => {
    console.log('I am in the process next tick now');
});
fs.readFile('index.html', () => {
    console.log('==================');
    setTimeout(() => {
        console.log('I am in the callback from setTimeout with 0ms delay');
    }, 0);
    setImmediate(() => {
        console.log('I am from setImmediate callback');
    });
});
setTimeout(() => {
    console.log('I am in the callback from setTimeout with 0ms delay');
}, 0);
setImmediate(() => {
    console.log('I am from setImmediate callback');
});