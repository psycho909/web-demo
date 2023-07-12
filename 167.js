var move = function (direction) {
    switch (direction) {
        case "left":
            console.log("left");
            break;
        case "right":
            console.log("right");
            break;
        default:
            console.log("up");
    }
};
var myDictionary = {
    a: "value1",
    b: "value2"
};
console.log(myDictionary["a"]);
var myArray = [1, 23];
