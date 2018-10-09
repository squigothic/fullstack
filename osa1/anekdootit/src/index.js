import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [
        {ind: 0, count: 0},
        {ind: 1, count: 0},
        {ind: 2, count: 0},
        {ind: 3, count: 0},
        {ind: 4, count: 0},
        {ind: 5, count: 0},
      ]
    }
  }

  arvoAnekdootti = () => {
    return () => {
      const randomNumber = this.getRandomInt(anecdotes.length-1)
      this.setState({ selected: randomNumber })
    }
  }

  lisaaAani = () => {
    return () => {
      const tempArray = [...this.state.votes]
      tempArray[this.state.selected].count += 1
      this.setState({ votes: tempArray })
    }
  }

  getRandomInt = (max) => {
    max = Math.floor(max)
    return Math.floor(Math.random() * (max + 1))
  }

  render() {
    return (
      <div>
        "{this.props.anecdotes[this.state.selected]}"
        <br></br><br></br>
        <Button onClick={this.arvoAnekdootti()} text='Uusi anekdootti'/>
        <Button onClick={this.lisaaAani()} text='Anna ääni' />
        <Title text='Anecdotes with most votes:' />
        <Statistic votesArray={this.state.votes} anecdotes={this.props.anecdotes} />
      </div>
    )
  }
}

const Button = ({ onClick, text }) => {
  return (
    <button type='button' onClick={onClick}>{text}</button>
  )
}

const Title = ({ text, anecdotes }) => <h2>{text}</h2>

const Statistic = ({ votesArray }) => {
  const biggestNumber = Math.max(...votesArray.map(x => x.count))
  const anecdotesWithMostVotes = votesArray.filter(x => x.count === biggestNumber)
  if(biggestNumber === 0) {
    return (
      <div>
      No votes given yet
      </div>
    )
  }
  return (
    <div>
      <AnecdoteList list={anecdotesWithMostVotes} />
      <br></br>
      has {biggestNumber} votes
    </div>
  )
}

const AnecdoteList = ({ list }) => {
  return (
    <>
      {list.map(anekdooti => <div key={anekdooti.ind}>{anecdotes[anekdooti.ind]}</div>)}
    </>  
  )
 }


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)