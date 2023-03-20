const prompt = require("prompt");
  
// An utility function to add
// two numbers
function add() {
  // Start the prompt
  prompt.start();
  
  // Get two numbers/properties
  // from user num1 and num2
  prompt.get(["num1", "num2"], 
  function (err, res) {
    // To handle any error if occurred
    if (err) {
      console.log(err);
    } else {
        var num1 = parseInt(res.num1);
        var num2 = parseInt(res.num2);
        console.log(typeof(num1))
      
      var sum = num1 + num2;
      if(Number.isNaN(sum)) {
        console.log("Enter valid numbers")
        return
      }
      // Print the sum
      console.log("Sum of " + res.num1 
        + " and " + res.num2 + " is " + sum);
    }
  });
}
  
// Calling add function
add();