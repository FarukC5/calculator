import { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [inputNumber, setInputNumber] = useState([]);
  const [alertMsg, setAlertMsg] = useState("");

  let stack = [];
  let newArray = [];

  const computeHandler = () => {
    if (inputNumber.length === 0) {
      return setAlertMsg("You did not enter anything!");
    } else {
      newArray = inputNumber.split(",");
    }

    for (var i = 0; i < newArray.length; i++) {
      stack.push(parseFloat(newArray[i]));
      stack = stack.filter((value) => !Number.isNaN(value));
    }
    const validElement = (element) => {
      if (["+", "-", "*", "/"].includes(element)) {
        return true;
      }
      return !Number.isNaN(Number(element));
    };

    if (newArray.some((element) => !validElement(element))) {
      setAlertMsg("Only numbers and arithmetic operators are valid");
    } else {
      if (stack.length * 2 === newArray.length + 1) {
        for (let j = 0; j < newArray.length; j++) {
          if (
            newArray[j] === "+" ||
            newArray[j] === "-" ||
            newArray[j] === "/" ||
            newArray[j] === "*"
          ) {
            const x = stack.pop();
            const y = stack.pop();
            const operators = newArray[j];
            switch (operators) {
              case "+":
                stack.push(x + y);
                break;
              case "-":
                stack.push(x - y);
                break;
              case "/":
                stack.push(x / y);
                break;
              case "*":
                stack.push(x * y);
                break;
              default:
            }
          }

          setInputNumber(`${inputNumber} = ${stack[0].toFixed(2)}`);
          setAlertMsg("");
        }
      } else if (stack.length * 2 > newArray.length + 1) {
        setAlertMsg("something went wrong! Check the number of OPERANDS !");
      } else {
        setAlertMsg("Something went wrong! Check the number of OPERATORS !");
      }
    }
  };

  const clearInput = () => {
    setInputNumber("");
    setAlertMsg("");
  };

 // console.log([...inputNumber])
 
  return (
    <div className="App">
      <header className="App-header">
        <div className="Container-1">
          <p>Reverse Polish Notation Calculator</p>
        </div>
        <div className="Container-2">
          <input
            placeholder="Enter the operand and operator: 2,6,5.5,4,*,-,+"
            value={inputNumber}
            onInput={(e) => {
              setInputNumber(e.target.value.trim());
            }}
          ></input>
          &nbsp;
          <button onClick={clearInput}>Clear</button>&nbsp;
          <button onClick={computeHandler}>Compute</button>
          <div className="error-message">
            {" "}
            <span style={{ color: "red" }}>{alertMsg}</span>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Calculator;
