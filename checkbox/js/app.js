'use strict';

//new Set 可把arry轉成json
//new Set 有add clear delete has size
var arr = ['chen', 'ching', 'yang'];
var setArr = new Set(arr);
setArr.add('good');
//console.log(setArr)


//可靈活使用數據  new Map()
//map.set(key,value)
//add delete has size clear
var json = {
	name: 'Chen',
	skill: 'sleep'
};
var map = new Map();
map.set('json', json);
console.log(map.get('json').name);

var jsonA = [{ "name": " 請在此輸入 " }, { "name": " A " }, { "name": " B " }, { "name": " C " }, { "name": " D " }, { "name": " E " }, { "name": " F " }, { "name": " G " }];
var jsona = new Map();
jsona.set('jsona', jsonA);
// console.log(jsona.get('jsona').length)
// for(var i=0;i<jsona.get('jsona').length;i++){
// 	console.log(jsona.get('jsona')[i].name)
// }
// for(let [k,v] of jsona.get('jsona').entries()){
// 	console.log(k+':'+jsona.get('jsona')[k].name)
// }

//ES6 新的賦值方式
var a = 'A',
    b = 'B',
    c = 'C';

console.log(a, b, c);
var d = 'D',
    e = 'E',
    f = 'F',
    g = 'G';

console.log(d, e);
var _foo$bar = { foo: 'Foo', bar: 'Bar' },
    foo = _foo$bar.foo,
    bar = _foo$bar.bar;

console.log(foo);
var arr1 = ['www', 'google', 'com'];
var arr2 = [].concat(arr1);
console.log(arr2);
arr2.push('.tw');
console.log(arr2);

var name = "chen";
var a = 1,
    b = 2;

var self = 'Hello ' + name + ' ' + (a + b);
console.log(self);
console.log(self.includes('chen'));

var arrfrom = Array.from({ length: 9 }, function (d, i) {
	return {
		id: i
	};
});
console.log(arrfrom[1].id);

var arrfill = [0, 1, 2, 3, 4, 5];
arrfill.fill('chen', 1, 3);
console.log(arrfill);

var add = function add(a, b) {
	'use strict';

	if (a == 0) {
		throw new Error('this is error');
	}
	return a + b;
};
console.log(add(1, 2));

var jsonc = {
	a: 'good',
	b: 'es6'
};
function fun(_ref) {
	var a = _ref.a,
	    _ref$b = _ref.b,
	    b = _ref$b === undefined ? 'es66' : _ref$b;

	console.log(a, b);
}
fun(jsonc);

var arr2 = [0, 3, 4, 5, 6];
var arr2filter = arr2.filter(function (v, i) {
	if (v > 3) {
		return v;
	}
});
console.log(arr2filter);
//console.log(arr2.join('|'))
console.log(arr2.toString());

var arr3 = [4, 4, 5, 5, 6, 99, 8, 4, 5, 1, 2, 9, 6, 99];
var arr3filter = arr3.filter(function (v, i, arr) {
	return arr.indexOf(v) == i;
});
console.log(arr3filter);

var a = { a: 'cc' };
var b = { b: 'ddd' };
var c = { c: 'web' };
var d = Object.assign(a, b, c);
console.log(d);