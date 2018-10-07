import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0,0,0,0,0,0]
    }
  }

  arvoAnekdootti = () => {
    return () => {
      console.log('anekdoootti arvottu')
      const randomNumber = this.getRandomInt(anecdotes.length-1)
      this.setState({ selected: randomNumber })
    }
  }

  lisaaAani = () => {
    return () => {
      console.log('lisaa aani kutsuttu')
      const tempArray = [...this.state.votes]
      tempArray[[this.state.selected]] += 1
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
  const mostVotes = Math.max(...votesArray)
  const indeksi = votesArray.indexOf(mostVotes)
  return (
    <div>
      {anecdotes[indeksi]}
      <br></br>
      has {mostVotes} votes
    </div>
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