import './App.css';
import {useState, useEffect} from 'react'
import Die from './components/Die';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {
    
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [rolls, setRolls] = useState(0) // for counting number of rolls
    
    // let timer //     function to use timer in the app 

    
    
    useEffect(()=>{
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const checkAll = dice.every(die => firstValue === die.value)
        if(allHeld && checkAll){
            setTenzies(true)
        }
    },[dice])
    
    
    function generateDice(){
        return {
            value: Math.ceil(Math.random() * 6 ),
            isHeld: false, 
            id: nanoid()
        }
    }
    
    function allNewDice(){
        const newArray = []
        for (let i = 0; i < 10; i++){
            newArray.push(generateDice())
        }
        return newArray
    }

    function rollDice(){
        
        if(!tenzies){
            setRolls(prevRoll => prevRoll += 1)
            
            setDice(oldDice => oldDice.map(die => {    
                return die.isHeld ?
                die :
                generateDice()
    
            }))
            
        }else{
            setTenzies(false)
            setDice(allNewDice())
            setRolls(0)
        }
        
    }

    function holdDice(id){
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
            {...die, isHeld: !die.isHeld} : 
            die
        }))
    }

    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)} 
        />
    ))


    return (
        <main>
            {tenzies && <Confetti />}
            <div className='number-of-rolls'>
                <h3 className='h3-text'>Number of Rolls: {rolls}</h3>
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className='dice-container'>
                {diceElements}
            </div>
            <button 
            className='roll-btn'
            onClick={rollDice}
            >{tenzies ? "New Game" : "Roll"}</button>
        </main>
    );



}

export default App;
