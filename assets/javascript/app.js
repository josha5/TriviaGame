$(document).ready(function() {

const results = [
    {
    category: "Sports",
    difficulty: "medium",
    question: "Which of these teams isn't a member of the NHL's 'Original Six' era?",
    correct_answer: "Philadelphia Flyers",
    incorrect_answers: [
    "New York Rangers",
    "Toronto Maple Leafs",
    "Boston Bruins"
    ]
    },
    {
    category: "Sports",
    difficulty: "medium",
    question: "Who was the British professional wrestler Shirley Crabtree better known as?",
    correct_answer: "Big Daddy",
    incorrect_answers: [
    "Giant Haystacks",
    "Kendo Nagasaki",
    "Masambula"
    ]
    },
    {
    category: "Sports",
    difficulty: "medium",
    question: "In a game of snooker, what colour ball is worth 3 points?",
    correct_answer: "Green",
    incorrect_answers: [
    "Yellow",
    "Brown",
    "Blue"
    ]
    },
    {
    category: "Sports",
    difficulty: "medium",
    question: "The F1 season of 1994 is remembered for what tragic event?",
    correct_answer: "Death of Ayrton Senna (San Marino)",
    incorrect_answers: [
    "The Showdown (Australia)",
    "Verstappen on Fire (Germany)",
    "Schumacher&#039;s Ban (Britain)"
    ]
    },
    {
    category: "Sports",
    difficulty: "medium",
    question: "What is the highest belt you can get in Taekwondo?",
    correct_answer: "Black",
    incorrect_answers: [
    "White",
    "Red",
    "Green"
    ]
    },
    {
    category: "Sports",
    difficulty: "medium",
    question: "Which team was the 2015-2016 NBA Champions?",
    correct_answer: "Cleveland Cavaliers",
    incorrect_answers: [
    "Golden State Warriors",
    "Toronto Raptors",
    "Oklahoma City Thunders"
    ]
    },
    {
    category: "Sports",
    difficulty: "medium",
    question: "Josh Mansour is part of what NRL team?",
    correct_answer: "Penrith Panthers",
    incorrect_answers: [
    "Melbourne Storm",
    "Sydney Roosters",
    "North Queensland Cowboys"
    ]
    },
    {
    category: "Sports",
    difficulty: "medium",
    question: "Which car manufacturer won the 2016 24 Hours of Le Mans?",
    correct_answer: "Porsche",
    incorrect_answers: [
    "Toyota",
    "Audi",
    "Ferrari"
    ]
    },
    {
    category: "Sports",
    difficulty: "medium",
    question: "Which soccer team won the Copa Am&eacute;rica Centenario 2016?",
    correct_answer: "Chile",
    incorrect_answers: [
    "Argentina",
    "Brazil",
    "Colombia"
    ]
    },
    {
    category: "Sports",
    difficulty: "medium",
    question: "In Formula 1, the Virtual Safety Car was introduced following the fatal crash of which driver?",
    correct_answer: "Jules Bianchi",
    incorrect_answers: [
    "Ayrton Senna",
    "Ronald Ratzenberger",
    "Gilles Villeneuve"
    ]
    }
    ]

    let incrementer = 0;
    let incorrectIncrementer = 0;
    let clockRunning = false;
    let time = 30;
    let intervalId;
    let smallQuestionNumber = 1;
    let correct = 0;
    let incorrect = 0;
    let answered = false;
    $("#mainQuestion").append(results[incrementer].question);
    $("#answer1").html(results[incrementer].incorrect_answers[0]);
    $("#answer2").html(results[incrementer].incorrect_answers[1]);
    $("#answer3").html(results[incrementer].incorrect_answers[2]);
    $("#answer4").html(results[incrementer].correct_answer);
    $("#timer").html(time);

    const runTimer = function() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    const stopTimer = function() {
        clearInterval(intervalId);
    }

    const decrement = function() {
        time--;
        $("#timer").html(time);
        if(time === 0) {
            stopTimer();
        } 

        if(time === 0 && answered === false) {
            incorrect++;
            timesUpModal();
            runTimer();
        }
    }
    
    $(".answer").on("click", function() {
        if($(this).text() === results[incrementer].correct_answer && smallQuestionNumber !== 10) {
            correct++;
            answered = true;
            correctModal();
        } else if($(this).text() !== results[incrementer].correct_answer && smallQuestionNumber !== 10) {
            incorrect++;
            answered = true;
            incorrectModal();
        } else if(smallQuestionNumber => 10) {
            stopTimer();
            finalScore();
        }
    });

    const nextQuestion = function() {
        answered = false;
        incrementer++;
        smallQuestionNumber++;
        time = 30;
        $("#mainQuestion").html(results[incrementer].question);
        $("#answer1").html(results[incrementer].incorrect_answers[0]);
        $("#answer2").html(results[incrementer].incorrect_answers[1]);
        $("#answer3").html(results[incrementer].incorrect_answers[2]);
        $("#answer4").html(results[incrementer].correct_answer);
        $("#smallQuestionNumber").html("<p>Question " + smallQuestionNumber + " of 10</p>");
    }

    const correctModal = function() {
        $("#correctModal").show();
        setTimeout(function() {
            $("#correctModal").hide();
            nextQuestion();
        }, 1500);
    }

    const incorrectModal = function() {
        $("#incorrectModal").show();
        $("#incorrectAnswerModal").html("Correct Answer: " +results[incrementer].correct_answer);
        setTimeout(function() {
            $("#incorrectModal").hide();
            nextQuestion();
        }, 3500);
    }

    const timesUpModal = function() {
        $("#timesUpModal").show();
        $("#timeAnswerModal").html("Correct Answer: " +results[incrementer].correct_answer);
        setTimeout(function() {
            $("#timesUpModal").hide();
            nextQuestion();
        }, 3500);
    }

    $("#start").on("click", function() {
        $("#modal").hide();
        runTimer();
    });

    const finalScore = function() {
        $("#finalScoreModal").show();
        $("#finalScore").html("Your final score is " + correct + " out of 10");
        $("#newGame").on("click", function() {
            $("#finalScoreModal").hide();
            reset();
            $("#mainQuestion").html(results[incrementer].question);
            $("#answer1").html(results[incrementer].incorrect_answers[0]);
            $("#answer2").html(results[incrementer].incorrect_answers[1]);
            $("#answer3").html(results[incrementer].incorrect_answers[2]);
            $("#answer4").html(results[incrementer].correct_answer);
            $("#smallQuestionNumber").html("<p>Question " + smallQuestionNumber + " of 10</p>");
            $("#timer").html(time);
            runTimer();
        });
    }

    const reset = function() {
        incrementer = 0;
        smallQuestionNumber = 1;
        correct = 0;
        incorrect = 0;
    }
});