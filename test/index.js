
var calculate = function(s) {
    var strArr=[...s];
    var strNum=0;
    var strNumsymbols='';
    var symbols=[')','+','-','*','/','(',' '];
    var strArrNum=[];
    for(var i=0;i<strArr.length;i++){
        if(symbols.indexOf(strArr[i]) > -1){
            if(strArr[i] === ')'){
                strNumsymbols=')';
                strArrNum.push(strNum)
                if(strArr[i+1] !== undefined){
                    strArrNum.push(strArr[i+1])
                }
                strNum=0;
            }else if(strArr[i] === '+'){ 
                strNumsymbols='+';
            }else if(strArr[i] === '-'){
                strNumsymbols='-';
            }else if(strArr[i] === '('){ 
                strNumsymbols='(';
            }
        }else{
            if(strNumsymbols == '' || strNumsymbols == '+' || strNumsymbols == '('){
                strNum=strNum+parseFloat(strArr[i]);
            }else if(strNumsymbols == '-'){
                strNum=strNum-parseFloat(strArr[i]);
            }
        }
    }
    for(var j=0;j<strArrNum.length;j++){
        if(symbols.indexOf(strArrNum[j]) > -1){
            if(strArrNum[j] === '+'){ 
                strNumsymbols='+';
            }else if(strArrNum[j] === '-'){
                strNumsymbols='-';
            }
        }else{
            if(strNumsymbols == '' || strNumsymbols == '+'){
                strNum=strNum+parseFloat(strArrNum[j]);
            }else if(strNumsymbols == '-'){
                strNum=strNum-parseFloat(strArrNum[j]);
            }
        }
    }
    return strNum;
};
var str="(1+(4+5+2)-3)+(6+8)";

console.log(calculate(str))