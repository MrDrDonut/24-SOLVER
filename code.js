onEvent("solveButton", "click", function() {
  get_24([parseFloat(getText("Num1")), parseFloat(getText("Num2")), parseFloat(getText("Num3")), parseFloat(getText("Num4"))]);
});

var opsSymbol = ["+", "-","/", "*"];
var ops = [add,sub,div,mul];

var outcome =0;
var tries =0;

function get_24(num) {
  tries =0;
  outcome = 0;
  
  var i = 0;
  var j = 0;
  var k = 0;
  var l = 0;
  
  var val1 = 0;
  var val2 = 0;
  
  var flipped = false;
  var reversed = false;
  
  while(outcome != 24 && i < ops.length){
    j = 0;
    while(outcome != 24 && j < ops.length){
      k = 0;
      while(outcome != 24 && k < ops.length){
        l=0;
        flipped = false;
        reversed = false;
        while(outcome != 24 && l < num.length){
          num.unshift(num.pop());
          console.log("---------NEW-TRY----------");
          if(!reversed){
            val1 = ops[i](num[0], num[1]);
            val2 = ops[j](val1, num[2]);
            
            outcome = ops[k](val2, num[3]);
          }else{
            val1 = ops[i](num[3], num[2]);
            val2 = ops[j](val1, num[1]);
        
            outcome = ops[k](val2, num[0]);
          }

          tries++;
          l++;
          if(l == num.length && outcome != 24){ // I put my thing down, flip it and reverse it
            if(!reversed){
              reversed = true;
              l = 0;
            }else if(!flipped){
              flipped = true;
              var tempNumber = num[0];
              num[0] = num[1];
              num[1] = tempNumber;
              
              l=0;
              reversed = false;
            }
          }
        }
        k++;
      }
      j++;
    }
    i++;
  }
  
  if(outcome == 24){
    if(reversed){
      console.log("i" + i+ " j" + j+ " k" +k);
      setText("output", num[3] + opsSymbol[i-1] + num[2] + " = " + val1 + "\n" +
        val1 + opsSymbol[j-1] + num[1] + " = " + val2 + "\n"+
        val2 + opsSymbol[k-1] + num[0] + " = " + outcome
      );
      
    }else{
      console.log("i" + i+ " j" + j+ " k" +k);
      setText("output", num[0] + opsSymbol[i-1] + num[1] + " = " + val1 + "\n" +
        val1 + opsSymbol[j-1] + num[2] + " = " + val2 + "\n"+
        val2 + opsSymbol[k-1] + num[3] + " = " + outcome
      );
    }

  console.log("Found 24");
  }else{
    setText("output", "Have you tried turning it off and on again");
  }
}



function add(num1, num2){ //adds
  console.log("Checking | " + num1 + " + " + num2+ "=" + Math.round(num1 +num2) + " ADD| Try #" + tries);
  return num1 + num2
}
function div(num1, num2){ // divides
  console.log("Checking | " + num1 + " / " + num2+ "=" + Math.round(num1) / Math.round(num2) + " DIV | Try #" + tries);
  return num1 / num2;
}
function mul(num1, num2){ // multiply
  console.log("Checking | " + num1 + " * " + num2+ "=" + Math.round(num1) * Math.round(num2) + " MUL | Try #" + tries);
  return num1 * num2;
}
function sub(num1, num2){ // subtracts
  console.log("Checking | " + num1 + " - " + num2 + " SUB | Try #" + tries);
  return num1 - num2;
}
