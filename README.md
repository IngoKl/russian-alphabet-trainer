# Russian Alphabet Trainer

This is an incredibly basic [Vue.js](https://vuejs.org/) app for training transliterating the Russian alphabet into the Latin one.

Under the hood, this is nothing more than a Q/A system that 'awards' you a point for each question you answered correctly. 

Please note that the bundled transliterations (`questions.json`) are not very sophisticated.

Also, but this is quite obvious; from an educational standpoint, this is quite horrible. I just needed something like this and wasn't able to find an easy enough solution.

If for any reason you want to run this your own, clone the repository, change the `questions.json` file to your liking, and run a webserver to serve the application.

For example:

```
npm install --global http-server
git clone https://github.com/IngoKl/russian-alphabet-trainer
http-server
```
