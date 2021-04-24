const RussianAlphabetApp = {
    data() {
      return {
        questions_pool: {},
        question_sets: [],
        questions: [],
        score: '0',
        question: '',
        guess: '',
        solution: ''
      }
    },
    created() {
        fetch('./questions.json')
            .then(response => response.json())
            .then(obj => {
                this.questions_pool = obj['questions']
                this.question_sets = Object.keys(obj['questions'])

                this.questions = this.questions_pool['characters']
                this.question = _.sample(this.questions)
                }
            )
        
        if (localStorage.score) {
            this.score = localStorage.score;
        }
    },
    watch: {
        guess: function() {
            if (this.guess == this.question['transl']) {
                this.score++
                localStorage.score = this.score
                this.question = _.sample(this.questions)
                this.guess = ''
                this.solution = ''
            }
        }
    },
    methods: {
        showSolution: function () {
            this.solution = this.question['transl']
        },
        changeSet: function (event) {
            this.questions = this.questions_pool[event.target.id]
            this.question = _.sample(this.questions) 
        }
      }
  }
  
Vue.createApp(RussianAlphabetApp).mount('#app')