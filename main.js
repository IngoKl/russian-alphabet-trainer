const RussianAlphabetApp = {
    data() {
      return {
        questions_pool: {},
        question_sets: [],
        questions: [],
        score: '0',
        question: '',
        guess: '',
        solution: '',
        last_question: '',
        theme: ''
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

        console.log(window.matchMedia('(prefers-color-scheme: dark)'));
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.theme = 'darkMode'
            document.documentElement.setAttribute('data-theme', this.theme);
        } else {
            this.theme = 'lightMode'
            document.documentElement.setAttribute('data-theme', this.theme);
        }

        if (localStorage.theme) {
            this.theme = localStorage.theme;
            document.documentElement.setAttribute('data-theme', this.theme);
        }
    },
    watch: {
        guess: function() {
            if (this.guess.toLowerCase() == this.question['transl'].toLowerCase()) {
                this.score++
                localStorage.score = this.score

                this.last_question = this.question

                // This ensures a 'new' question every time
                while (this.last_question == this.question) {
                    this.question = _.sample(this.questions)
                }

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
        },
        changeTheme: function() {
            this.theme = this.theme == 'darkMode' ? 'lightMode' : 'darkMode';
            localStorage.theme = this.theme;
            document.documentElement.setAttribute('data-theme', this.theme);
        },
      }
  }
  
Vue.createApp(RussianAlphabetApp).mount('#app')