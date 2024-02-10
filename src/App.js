import {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);
  useEffect(()=>{
    getTransactions().then(setTransactions);
  },[]);

  async function getTransactions(){
    const url = process.env.REACT_APP_API_URL+'/transactions';
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(ev){
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL+'/transaction';
    const price = name.split(' ')[0];
    fetch(url, {
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({
        price,
        name : name.substring(price.length+1), 
        description, 
        datetime
      })
    }).then(response => {
      response.json().then(json => {
        setName('');
        setDatetime('');
        setDescription('');
        console.log('result', json);
      });
    }).catch((e)=>{console.warn(e)});
    console.log(url);
  }
  let balance = 0;
  console.log(transactions);
  for(const transaction of transactions){
    if(transaction.price)
    balance = balance + Number(transaction.price);
  }
  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];
  return (
    <main>
      <h1>${balance}<span>{fraction}</span></h1> {/*balance*/}
      <form onSubmit={addNewTransaction}>
        <div className='basic'> {/*for the 1st 2 inputs to be in the same line */}
          <input type="text"   
                 value={name}
                 onChange={ev => setName(ev.target.value)}
                 placeholder='+200 new samsung tv' />
          <input type="datetime-local" 
                 value={datetime} 
                 onChange={ev => setDatetime(ev.target.value)} />
        </div>
        <div className='description'> {/*for the 3rd input to be in other line */}
          <input type="text" 
                 placeholder='description' 
                 value={description}
                 onChange={ev => setDescription(ev.target.value)} />
        </div>
        <button type='submit'>Add new transaction</button>
      </form>
      <div className='transactions'>
        {transactions.length > 0 && transactions.map(transaction => (
          <div className='transaction'>
            <div className='left'>
              <div className='name'>{transaction.name}</div>
              <div className='description'>{transaction.description}</div>
            </div>
            <div className='right'>
              <div className={'price ' +((transaction.price<0)?'red':'green')}>
                {transaction.price}
                </div>
              <div className='datetime'>{transaction.datetime}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
