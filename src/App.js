import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'
import Confetti from 'react-confetti'

const cardImages=[
  {src:"/img/helmet-1.png",matched:false},
  {src:"/img/potion-1.png",matched:false},
  {src:"/img/ring-1.png",matched:false},
  {src:"/img/scroll-1.png",matched:false},
  {src:"/img/shield-1.png",matched:false},
  {src:"/img/sword-1.png",matched:false}
]

function App() {

  const [cards,setCards] = useState(null)
  const [turns,setTurns] = useState(0)
  const [choiceOne,setChoiceOne] = useState(null)
  const [choiceTwo,setChoiceTwo] = useState(null)
  const [disabled,setDisabled] = useState(false)
  const [victory,setVictory] = useState(false)

  const shuffleCards = ()=>{
    const shuffledCards = [...cardImages,...cardImages]
      .sort(()=>Math.random() - 0.5)
      .map((card)=>({...card,id:Math.random()}))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
      setVictory(false)
  }

  const handleChoice = (card)=>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(()=>{
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevState=>{
          return prevState.map((card)=>{
            if(card.src === choiceTwo.src){
              return {...card,matched:true}
            }else{
              return card
            }
          })
        })
        setTimeout(()=>resetTurn(),1000)
      }else{
        setTimeout(()=>resetTurn(),1000)
      }
    }
  },[choiceTwo])

  const resetTurn = ()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn=>prevTurn+1) 
    setDisabled(false)
  }

  useEffect(()=>{
    shuffleCards()
  },[])

  useEffect(()=>{
    if(cards && cards.every(card=>card.matched === true))
      setVictory(true)
  })

  return (
    <div className="App">
      {victory &&<Confetti/>}
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="cards">{cards && cards.map((card)=>(
        <Card 
        key={card.id} 
        card={card} 
        handleChoice={handleChoice}
        flipped={card === choiceOne || card === choiceTwo || card.matched}
        disabled={disabled}
        />
      ))}</div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App