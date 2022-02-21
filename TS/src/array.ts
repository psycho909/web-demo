let foo1: string[];
let foo2: string[] = [];
let foo3: string[] = new Array();
let foo4: string[] = Array();
let foo5: Array<string> = ["Hello", "World"];
let foo6: (string | number)[] = ["Hello", 123];

let tuple1: [number, string, boolean] = [10, "Chen", true];

const enum HttpPort {
	Http = 80,
	Https = 443
}

const scheme = HttpPort.Http;
