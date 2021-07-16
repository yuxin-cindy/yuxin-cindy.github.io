/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}



/**********************************************
 * YOUR CODE BELOW
 **********************************************/


var fruits =['apple','banana','kiwi','grape','watermelon','peach','grapefruit','cherry','strawberry','blueberry','coconut','pear']

var fruit = fruits[round]
fruits = shuffle (fruits)
var round = 0
console.log(fruits.length)

const app = Vue.createApp({
  data: function (){
    return {
      title:'Welcome to Scramble',
      maxGuesses: 3,

      game: {
        active: false,
        word: fruits[round],
        shuffleWord: shuffle(fruits[round]),
        guesses: '',
        points: 0,
        strikes: 0,
        guess: '',
        message: '',
        pass:3,
        length: fruits.length
      }
    }
  },

  created: function () {
    const game = localStorage.getItem('scramble')
    if (game) {
      this.game = JSON.parse(game)
    }
  },

  methods:{
    playGame: function(){
      this.game.active = true
      this.game.guesses = 0
    },

    verifyGuess:function (){
      this.game.guesses++
      if (this.game.guess === this.game.word) {
        if(this.game.points < fruits.length - 1) {
          this.game.active = true
          this.game.message = 'Correct, next word!'
          round++
          console.log(round)
          this.game.word = fruits[round]
          this.game.shuffleWord = shuffle(this.game.word)
          this.game.points++
          this.game.guess = ''
        } else if (this.game.points = fruits.length - 1) {
          this.game.message = 'Congratulation, you finsh the game!' 
          this.game.points++
          this.game.active = true
          this.game.guess = ''
        } else {
          this.game.message = 'Congratulation, you finsh the game!'
          this.game.active = true
        }
        
      } else {
          if((this.game.guess != this.game.word)){
            if (this.game.strikes < this.maxGuesses){
              this.game.strikes++
            }
            
            if(this.game.strikes < this.maxGuesses) {
              this.game.active = true
              this.game.message = 'Wrong, try again.'
              this.game.guess = ''
              
            } else {
              this.game.message = 'You lost.' 
              this.game.active = true
          }  
        } 
          
      }
    },
    
    resetGame: function () {  
      this.game.active = false
      this.game.word = fruits[round],
      this.game.shuffleWord = shuffle(fruits[round]),
      this.game.guesses = '',
      this.game.points= 0,
      this.game.strikes= 0,
      this.game.guess = '',
      this.game.message = '',
      this.game.pass = 3,
      round=0
    },

    shuffleWord: function(){
      return shuffle(game.word)
    },
  
    passGame:function() {
      if(this.game.pass > 0){
        this.game.pass-- 
        this.game.message = 'You passed, next word.'
        round++
        this.game.word = fruits[round]
        this.game.shuffleWord = shuffle(this.game.word)
      }
      
    }


  }, 
  computed:{
    remainingGuesses: function () {
        return this.maxGuesses - this.game.guesses
    }
  },

  watch: {
    game: {
      deep: true,
      handler: function (game) {
        localStorage.setItem('scramble', JSON.stringify(game))
      }
    }
  }

})

const vm = app.mount('#app')