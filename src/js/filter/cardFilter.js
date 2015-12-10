/**
 * Created by gujun on 15/5/19.
 */
"use strict"
angular.module('ZJSY_WeChat').filter('card', function() {
  return function(input, num) {
    num = parseInt(num);
    input = input.split("");
    var out = "";
    for(let i in input){
      if(i< input.length - num){
        out += "*";
      }else{
        out += input[i];
      }
    }
    return out;
  };
});
