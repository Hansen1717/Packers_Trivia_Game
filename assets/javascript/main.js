$(document).ready(function() {
    var gameSection = $("#game-section")
    var playClock = 10;
    var questionsAnswers = [
        {question: "How many Superbowls have the Green Bay Packers WON?",
        selections: ["1","3","4","7"],
        answer: "4"},
        {question: "What is the name of the Packers Stadium?",
        selections: ["Packer Stadium","Lambeau Field", "Lombardi Stadium", "Citi Bank Center"],
        answer: "Lambeau Field"},
        {question: "What team did the Packers beat to win the VERY FIRST Suberbowl?",
        selections: ["Kansas City Chiefs","Dallas Cowboys","Oakland Raiders","New York Jets"],
        answer: "Kansas City Chiefs"},
        {question: "The 'Minister of Defense' was a key signing in building success for the Packers in the late 90's. Who was the 'Minister of Defense'?",
        selections: ["Charles Woodson","Brett Favre","Ray Nitschke","Reggie White"],
        answer: "Reggie White"},
        {question: "Speaking of 90's success or lack thereof, what team traded Brett Favre to the Packers for a 1st round draft pick in 1992?",
        selections: ["New York Jets","Philidelphia Eagles","Minnesota Vikings","Atlanta Falcons"],
        answer: "Atlanta Falcons"},
        {question: "Potentially the most widely known celebration in professional sports, the Packers are known for this action after scoring a Touchdown.",
        selections: ["Superbowl Shuffle","The Lambeau Leap","Discount Double Check","The Dancing Bear"],
        answer: "The Lambeau Leap"},
        {question: "If you guessed 'The Lambeau Leap' you know your Pack celebrations. Do you know them well enough to answer who did the FIRST Lambeau Leap?",
        selections: ["Brett Favre","Sterling Sharpe","Leroy Butler","Donald Driver"],
        answer: "Leroy Butler"},
        {question: "The Packers have one of the most loyal fan bases in the NFL, what is their MOST WELL known nickname?",
        selections: ["Packer Backers","Cheeseheads","Green and Gold Wave","Curd Hurlers"],
        answer: "Cheeseheads"},
        {question: "What head coach had the longest tenure in Green Bay?",
        selections: ["Mike Holmgren","Curly Lambeau","Vince Lombardi","Mike McCarthy"],
        answer: "Curly Lambeau"},
        {question: "The Packers official colors are green and gold. What color is known as the unofficial THIRD color at Lambeau Field?",
        selections: ["White","Tie Dye","Camo","Blaze Orange"],
        answer: "Blaze Orange"},
        {question: "Which Packers quarterback has won the MOST Superbowls?",
        selections: ["Bart Starr","Aaron Rodgers","Jim McMahon","Brett Favre"],
        answer: "Bart Starr"},

    ];
    var startGame = function() {
        $("#timer").text("Play Clock: " + playClock);
        gameStarted.askQuestion(); 
    };

    var countDown;

    var gameStarted = {
        gameSection: gameSection,
        questionsAnswers: questionsAnswers,
        currentQuestion: 0,
        timer: playClock,
        correct: 0,
        incorrect: 0,
        
        askQuestion: function() {
            var questionsFormat = 
            "<h2 id='timer'>Play Clock: " + gameStarted.timer + "</h2>" +
            "<h2 id='question'></h2>" +
            "<ul class='list-group'>" +
                "<li id='selection0' class='list-group-item user-selection'></li>" +
                "<li id='selection1' class='list-group-item user-selection'></li>" +
                "<li id='selection2' class='list-group-item user-selection'></li>" +
                "<li id='selection3' class='list-group-item user-selection'></li>" +
            "</ul>"
            gameStarted.gameSection.empty();
            gameStarted.gameSection.append(questionsFormat);
            $("#question").text(questionsAnswers[this.currentQuestion].question);
            for(i = 0;i < questionsAnswers[this.currentQuestion].selections.length; i++) {
                var currentSelection = "#selection" + i;
                $(currentSelection).text(questionsAnswers[this.currentQuestion].selections[i]);
                $(currentSelection).attr("data-value", questionsAnswers[this.currentQuestion].selections[i])
            };
            countDown = setInterval(this.startPlayClock,1000)
        },

        startPlayClock: function() {
            gameStarted.timer--;
            $("#timer").text("Play Clock: " + gameStarted.timer);
            if (gameStarted.timer === 0) {
                gameStarted.outOfTime();
            }
        },

        outOfTime: function() {
            clearInterval(countDown);
            gameStarted.timer = 10;
            this.answeredIncorrectly();
        },

        nextQuestion: function() {
            gameStarted.currentQuestion++;
            gameStarted.askQuestion();
        },

        results: function() {
            var yourScore = gameStarted.correct * 7;
            var oppScore = gameStarted.incorrect * 7;
            var youWin = 
            "<h2>You Win!!</h2>" +
            "<h2>Final score, Packers: " + yourScore + " Opponent: " + oppScore + "</h2>" +
            "<button id='reset-game' type='button' class='btn-lg btn-warning'>Play Again</button>";
            var youLose = 
            "<h2>Tough Break</h2>" +
            "<h2>You've Lost, " + oppScore + " to " + yourScore + "</h2>" +
            "<button id='reset-game' type='button' class='btn-lg btn-warning'>Play Again</button>";
            gameStarted.gameSection.empty()
            if (yourScore > oppScore) {
                gameStarted.gameSection.html(youWin);
            }
            else {
                gameStarted.gameSection.html(youLose);
            }
        },

        resetGame: function() {
            gameStarted.currentQuestion = 0;
            timer = playClock;
            gameStarted.correct = 0;
            gameStarted.incorrect = 0;
            var instructionPage = 
            "<h2>Instructions:</h2>" + 
            "<p>" +
                "This is the Packers Trivia Game. There are 11 plays to test your knowledge of the Green Bay Packers. " + 
                "Each play has 4 reads make the right one and throw a touchdown. Wrong reads result in a pic 6 so play smart. " + 
                "You'll have just 10 seconds on the play clock to get off the snap. " + 
                "In common english: There are 10 questions each with 4 multiple choice answers. For each question you'll be given" + 
                "10 seconds to answer correctly. Running out of time will result in a wrong answer." + 
            "</p>" + 
            "<button id='game-start' type='button' class='btn-lg btn-warning'>Ready, Break!</button>";
            gameStarted.gameSection.empty();
            gameStarted.gameSection.html(instructionPage);                
        },
        
        selectionMade : function (userPick) {
            clearInterval(countDown);
            gameStarted.timer = 10;
            if ($(userPick.target).attr("data-value") === questionsAnswers[this.currentQuestion].answer) {
                this.answeredCorrectly();
            }
            else {
                this.answeredIncorrectly();
            }
        },

        answeredCorrectly: function() {
            gameStarted.correct++;
            gameStarted.gameSection.empty();
            gameStarted.gameSection.html("<h2>Touchdown!!!</h2>" + 
                                        "<img src='assets/images/touchdown.gif' alt='Touchdown!!!'>"
                                        );
            if (this.currentQuestion === questionsAnswers.length - 1) {
                setTimeout(gameStarted.results,3000);
            }
            else {
                setTimeout(gameStarted.nextQuestion,3000);
            }
        },

        answeredIncorrectly: function() {
            gameStarted.incorrect++;
            gameStarted.gameSection.empty();
            gameStarted.gameSection.html("<h2>Interception...</h2>" + 
                                        "<img src='assets/images/int.gif' alt='Touchdown!!!'>"
                                        );
            if (this.currentQuestion === questionsAnswers.length - 1) {
                setTimeout(gameStarted.results,4000);
            }
            else {
                setTimeout(gameStarted.nextQuestion,4000);
            }
        }

        
    }








    $(document).on("click", "#game-start", startGame);
    $(document).on("click", ".user-selection", function(userPick) {
        gameStarted.selectionMade(userPick);
    });
    $(document).on("click", "#reset-game", function(userPick) {
        gameStarted.resetGame();
    
    });
})