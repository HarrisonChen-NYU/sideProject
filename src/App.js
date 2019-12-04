import React, {useState} from 'react';
import './App.css';
import Calendar from "react-calendar";



function App() {

  const [day, setDay] = useState(new Date());

  const onDayChange = (date) => {

    console.log(date);

    setDay(date);
  }

  return (
    <div className="App">
      <Splash/>
      <Terms/>
      <Schedule onDayChange={onDayChange}/>
      <Balance day={day}/>
    </div>
  );

}

function Splash(){
  return(
  <div>
    <br></br>
      <h1>Cash Flow Application</h1>
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
          <button class= "wechatBox" onClick={handleClick}>Link to WeChat/Alipay </button>
          {
            (click) ? (<div><p>You have Successfully Linked to Wechat/AliPay</p><Onboarding/></div>) : null
          }
        </div>
      </div>
    );

}
    

function Onboarding(){

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
  function hideContent(){
    const hideTerms =Terms.isHidden
    return(
      hideContent()
    )
  }

  return(
  <div>
    <h3> What is your budget for the month?</h3>
    <form onSubmit={handleSubmit}>
      <input 
      name="budget"
      className= "Form-Control"
      type="number" />
      <button type="submit" onClick={handleClick} className="input box">SUBMIT</button>
      {
         (tap) ? (<div><p>You have Successfully Set Up the App! </p> 
         <hideContent/>
         </div>) : null
      }
    </form>
  </div>
  )
}
  
 function Schedule(props) {
    return (<Calendar
      onChange={props.onDayChange}
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
    [{name: "Daily Expense", price: 42}],
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
      <p>Item Name: {item.name}<br></br>Item Price: ${item.price}</p> <br></br>
      </div>
    );
  }) : null


  return(
  <div> 
    <label> <br></br> Today is {month + ' ' + day}</label>
    <h2> Your Remaining Balance today: ${Math.round(balance) - 
      Math.round(perDay)} </h2>
      <h3> Expenses</h3>  
    {(items) ? itemsMap : "You have no expenses yet"} 
    <br></br>
  </div>
  )
}


export default App;
