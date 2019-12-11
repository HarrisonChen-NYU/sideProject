import React, {useState} from 'react';
import './App.css';
import Calendar from "react-calendar";
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';


function App() {

  const [state, setState] = useState({
    account_linked: false,
    balance: 0,
    month: new Date(),
  });


  return (
    <div className="App">
      <br></br>
      <h1>Cash Flow Application</h1>

      <Terms state={state} setState={setState}/>
    </div>
  );
}


function Terms(props) {
    const handleClick = (event) => {
      props.setState({
        ...props.state,
        account_linked: true
      });
    }

    return(
      <div>
        <div className="box">
          <button class= "wechatBox" onClick={handleClick}>Link to WeChat/Alipay</button>
          {
            (props.state.account_linked) ? (
              <div>
                <p>You have Successfully Linked to Wechat/AliPay</p>
                <Onboarding {...props} />
              </div>
            ) : null
          }
        </div>
      </div>
    );

}

function Onboarding(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const data = new FormData(event.target);
    // localStorage.setItem('budget', data.get("budget"));

    props.setState({
      ...props.state,
      balance: data.get("budget")
    });

    console.log(localStorage.getItem('budget'));
  }

  return(
    <div>
      <h3> What is your budget for the month?</h3>
      <form onSubmit={handleSubmit}>
        <input 
          name="budget"
          className= "budgetInput"
          type="number" />
          <button type="submit" className="submitButton">SUBMIT</button>
        {
          (props.state.balance > 0) ? (
            <div>
              <p>You have Successfully Set Up the App! </p> 
              <Schedule {...props} />
              <Balance {...props} />
            </div>) : null
        }
      </form>
    </div>
  );
}

function Schedule(props) {

  function handleDateChange(date) {
    props.setState({
      ...props.state,
      month: date,
    });
  }

  return (
    <Calendar
      onChange={handleDateChange}
      onClickMonth={handleDateChange}
    />
  );
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
  const balance = budget/month

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

