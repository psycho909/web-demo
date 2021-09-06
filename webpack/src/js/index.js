import "../css/index.css";
const func = () => {
	return [1, 2];
};
const [a, b] = func();
console.log(a, b);
console.log("123123a2sd1");
const p = (rs) => {
	return new Promise((resolve, reject) => {
		return resolve(rs);
	});
};
p(123).then((data) => console.log(data));
