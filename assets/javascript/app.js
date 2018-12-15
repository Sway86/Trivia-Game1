var card = $("#test-space");

//Question time!

var questions = [{
    question: "Which family rules the North?",
    answers: ["House Stark", "House Targaryen", "House Lannister", "House Greyjoy", "House Baratheon"],
    correctAnswer: "House Stark"
},
{
    question: "How did Daenerys Targaryen hatch her dragon eggs?",
    answers: ["In a lightning storm", "In a funeral pyre", "In a fireplace", "In a frozen cave"],
    correctAnswer: "In a funeral pyre"
},
{
    question: "What does 'Valar Morghulis' mean?",
    answers: ["All men must die", "All men have been killed", "Everyone will die", "Live fast die young"],
    correctAnswer: "All men must die"
},
{
    question: "What is the only thing that can put out 'Wildfire'?",
    answers: ["Sand", "Water", "Dragon's blood", "Sunlight"],
    correctAnswer: "Sand"
},
{
    question: "Which of the following may kill a white walker?",
    answers: ["Weirwood", "Wildfire", "Valyrian Steel", "Snowballs"],
    correctAnswer: "Valyrian Steel"
},
{
    question: "How many times has Beric Dondarrion been brought back to life?",
    answers: [3, 4, 5, 6, 7],
    correctAnswer: 6
},
{
    question: "What is Arya's punishment for stealing from the Many-Face God?",
    answers: ["Death", "Memory Loss", "Blindness", "Depression"],
    correctAnswer: "Blindness"
}];

//Game logic
var timer;

var game = {
    correct: 0,
    incorreect: 0,
    counter: 120,

    countdown: function() {
        game.counter--;
        $("#counter-number").html(game.counter);
        if (game.counter === 0) {
            console.log("You must take the black");
            game.done();
        }
    },

    start: function() {
        timer = setInterval(game.countdown, 1000);

        $("#wrapper").prepend("<h2>Time Reaining: <span id='counter-number'>120</span> Seconds</h2>");

        $("#start").remove();

        for (var i = 0; i < question.length; i++) {
            card.append("<h2>" + questions[i].question + "</h2>");
            for (var j = 0; j < questions[i].answers.length; j++) {
                card.append("<input type='radio' name='question-" + i +
                "'value='" + question[i].answers[j] + "''>" + questions[i].answers[j]);
            }
        }

        card.append("<button id='done'>Done</button>");
    },
    done: function() {

        $.each($("input[name='question-0']:checked"), function() {
          if ($(this).val() === questions[0].correctAnswer) {
            game.correct++;
          }
          else {
            game.incorrect++;
          }
        });
    
        $.each($("input[name='question-1']:checked"), function() {
          if ($(this).val() === questions[1].correctAnswer) {
            game.correct++;
          }
          else {
            game.incorrect++;
          }
        });
    
        $.each($("input[name='question-2']:checked"), function() {
          if ($(this).val() === questions[2].correctAnswer) {
            game.correct++;
          }
          else {
            game.incorrect++;
          }
        });
    
        $.each($("input[name='question-3']:checked"), function() {
          if ($(this).val() === questions[3].correctAnswer) {
            game.correct++;
          }
          else {
            game.incorrect++;
          }
        });
        this.result();
    },

    result: function() {
        clearInterval(timer);

        $("#wrapper h2").remove();
        
        card.html("<h2>All Done!</h2>");
        card.append("<h3>Correct Answers: " + this.correct + "</h3>");
        card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
        card.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
    }
};

//on click event
$(document).on("click", "#start", function() {
game.start();
});

$(document).on("click", "#done", function() {
    game.done();
});