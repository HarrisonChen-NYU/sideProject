import React, {useState} from 'react';
import './App.css';
import Calendar from "react-calendar";
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';


let CurrentMonth = new Date();

function App() {

  return (
    
  <div>
  <div className="App">
      <Splash/>
      <Terms/>
    </div>
        </div>
  );

}

function Splash(){
  return(
  <div>
    <br></br>
      <h1>Cash Flow Application</h1>
      <img class= "image" src = "https://bit.ly/2E0671T" alt = "Opening Image"></img>
  </div>
  )
} 

function Terms() {

    const [click,setclicked] = useState(false);
      
      
    const handleClick = (event) => {
      setclicked(true);
    }

    return(
      <div>
        <div className="box">
          <Button class= "wechatBox" onClick={handleClick}>Link to WeChat/Alipay </Button>
          {
            (click) ? (<div><h5> You have Successfully Linked to Wechat/AliPay</h5><Onboarding/></div>) : null
          }
        </div>
      </div>
    );

}

function getDaysInMonth() {
  
}
    

function Onboarding(){
  const [day, setDay] = useState(new Date());

  const onDayChange = (date) => {

    console.log(date);

    setDay(date);
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    localStorage.setItem('budget', data.get("budget"));
    console.log(localStorage.getItem('budget'));
  }

  
  const [tap,settap] = useState(false);
  const handleClick = (e) => {
    settap(true);
  }

  function onClickMonth(month) {
    CurrentMonth = month;
    // let date = new Date(month.getYear(), month.getMonth(), 0);
    // console.log(date.getDate());
  }

  return(
  <div>
    <h2> <link href="https://fonts.googleapis.com/css?family=Abel|Fjalla+One&display=swap" rel="stylesheet">
      </link>What is your budget for the month? </h2>
    <form onSubmit={handleSubmit}>
      <input 
      name="budget"
      className= "budgetInput"
      type="number" />
      <button type="submit" className="submitButton" onClick={handleClick} >SUBMIT</button>
      {
        // (click) ? (<div> Hi

        // </div>)
         (tap) ? (<div><h5>You have Successfully Set Up the App! </h5> 
         <Schedule onDayChange={onDayChange} onClickMonth={onClickMonth} />  <Balance day={day} /></div>) : null
      }
    </form>
  </div>
  )
}
  
 function Schedule(props) {
    return (<Calendar
      onChange={props.onDayChange}
      onClickMonth={props.onClickMonth}
    />);
 }


function Balance(props) {

  var Expenses = [
    [{name: "Daily Expense", price: 10}],
    [{name: "Daily Expense", price: 21}],
    [{name: "Daily Expense", price: 12}],
    [{name: "Daily Expense", price: 14}],
    [{name: "Daily Expense", price: 15}],
    [{name: "Daily Expense", price: 42}],
    [{name: "Daily Expense", price: 38}],
    [{name: "Daily Expense", price: 10}],
    [{name: "Daily Expense", price: 21}],
    [{name: "Daily Expense", price: 12}],
    [{name: "Daily Expense", price: 14}],
    [{name: "Daily Expense", price: 15}],
    [{name: "Daily Expense", price: 42}],
    [{name: "Daily Expense", price: 38}],
    [{name: "Daily Expense", price: 10}],
    [{name: "Daily Expense", price: 21}],
    [{name: "Daily Expense", price: 12}],
    [{name: "Daily Expense", price: 14}],
    [{name: "Daily Expense", price: 15}],
    [{name: "Daily Expense", price: 42}],
    [{name: "Daily Expense", price: 38}],
    [{name: "Daily Expense", price: 10}],
    [{name: "Daily Expense", price: 21}],
    [{name: "Daily Expense", price: 12}],
    [{name: "Daily Expense", price: 14}],
    [{name: "Daily Expense", price: 15}],
    [{name: "Daily Expense", price: 38}],
    [{name: "Daily Expense", price: 10}],
    [{name: "Daily Expense", price: 21}],
    [{name: "Daily Expense", price: 12}],
    [{name: "Daily Expense", price: 14}],
    [{name: "Daily Expense", price: 15}],
  ]


  const budget =  localStorage.getItem('budget')
  const balance = budget/30

  const dayOfMonth = props.day.getDate();
  const day = dayOfMonth.toString()
  const month = props.day.toLocaleString('default', {month: 'long'});

  const items = Expenses[day - 1]  

  let perDay = 0;

  const itemsMap = (items) ? items.map((item) => {


    perDay += item.price;

    return (
      <div>
      <p>Current {item.name}<br></br>Amount: ${item.price}</p> <br></br>
      </div>
    );
  }) : null


  return(
  <Box class = "flexBox">
    <label> <br></br> Today is {month + ' ' + day}</label>
    <h3> Your Remaining Balance today: ${Math.round(balance) - 
      Math.round(perDay)} </h3>
      <h4> Expenses</h4>  
    {(items) ? itemsMap : "You have no expenses yet"} 
    <br></br>
  </Box>
  )
}

export default App;