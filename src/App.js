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
    <h1>Cash Flow</h1>
  )
} 

function Terms() {

    const [click,setclicked] = useState(false);
      
      
    const handleClick = (event) => {
      setclicked(true);
    }

    return(
      <div>
        <h1> Agreements</h1>
        <div className="box">
          <button onClick={handleClick}>Link to WeChat/Alipay</button>
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

  return(
  <div>
    <h3> What is your budget for the month?</h3>
    <form onSubmit={handleSubmit}>
      <input 
      name="budget"
      className= "Form-Control"
      type="number" />
      <button type="submit" className="input box">SUBMIT</button>
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
    ["Friends", "Purse", "Tree", "Airplane Toy"],
    ["Laptop", "Machine Gun", "Wallet", "Coding Software"],
    ["Water", "Stocks", "Company", "Ice Cream"],
    ["Cat", "Pop", "Hat", "Backpack"],

  ]

  const budget =  localStorage.getItem('budget')
  const balance = budget/30
  const dayOfMonth = props.day.getDate();
  const day = dayOfMonth.toString()
  const month = props.day.toLocaleString('default', {month: 'long'});

  const items = Expenses[day - 1]
  
  const itemsMap = (items) ? items.map((item) => {
    return (
      <p>{item}</p>
    );
  }) : null

  return(
  <div> 
    <label> Today is {month + ' ' + day}</label>
    <h2> Your Balance today: {balance} </h2>
    <h2> Expenses</h2>  
    {(items) ? itemsMap : "You have no expenses yet"}
  </div>
  )
}


export default App;
