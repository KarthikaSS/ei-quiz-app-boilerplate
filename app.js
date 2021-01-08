var score = 0
var questionNumber = 0
var counter = 0

var $result = $('.results');
var $progress = $('.progress');
var $question = $('.question');
var $finished = $('.finished');

$finished.hide();


var store = {
  questions: [
    {
      question: '1. Which one of the following is NOT an attachment style?',
      answers: [
        'A. Secure',
        'B. Insecure',
        'C. Anxious',
        'D. Avoidant'
      ],
      correctAnswer: "1"
    },
    {
      question: '2. In which of the following situations does cortisol have a reduced effect in lowering inflammation?',
      answers: [
        'A. During acute stress',
        'B. During chronic stress',
        'C. During exercise',
        'D. None of the above'
      ],
      correctAnswer: "1"
    },
    {
      question: '3. Sometimes while doing a repetitive task like driving, people rely on their executive function, more commonly known as “auto-pilot.” Which part of the brain is responsible for executive function?',
      answers: [
        'A. Parietal lobe',
        'B. Medulla',
        'C. Temporal lobe',
        'D. Frontal lobe'
      ],
      correctAnswer: "3"
    },
    {
      question: '4. What has been found to be the most effective form of therapy?',
      answers: [
        'A. EMDR',
        'B. Group therapy',
        'C. Cognitive Behavioral Therapy',
        'D. Counseling'
      ],
      correctAnswer: "2"
    },
   {
      question: '5. Which disorder is lithium used to treat?',
      answers: [
        'A. Bipolar Disorder',
        'B. Depression',
        'C. Obsessive Compulsive Disorder',
        'D. Generalized Anxiety Disorder'
      ],
      correctAnswer: "0"
    }
  ],
  quizStarted: false,
};

function renderQuestion(){
  $("h3").html("");
  $("h3").append(`
 	<section class="questionScreen">
		<form class="questionForm">
			<fieldset class="radio">
		<div>${store.questions[counter].question}</div>`);
  for (let i = 0; i < store.questions[counter].answers.length; i++){
   $(".radio").append(`
   <input type="radio" name="answers" value="${i}" required>${store.questions[counter].answers[i]}<br>`);
  }
  $("main").append(`
	</fieldset></form></section`);
  
}

function generateCorrectAnswer(){
    correctAnswer = store.questions[counter].correctAnswer;
    return correctAnswer;
}
function generateShownCorrectAnswer(){
    shownCorrectAnswer = store.questions[counter].answers[correctAnswer];
    return shownCorrectAnswer;
}

function startQuiz(){
  $('.next').hide();
  $('.submit').hide();
  $('.restart').hide();
  $('.start').on('click', function(){
    console.log("Started");
    renderQuestion();
    generateCorrectAnswer();
    generateShownCorrectAnswer();
    $('.start').hide();
    $('.submit').show();
  }); 
}

 function submitAnswer(){
$('.submit').click(function(event) {
  event.preventDefault();
  console.log('`submitAnswer` ran');
   var chosenAnswer = $("input[name=answers]:checked").val();
   console.log(chosenAnswer);
   console.log(correctAnswer)
   if(!chosenAnswer){
     alert ("Please choose an answer.");
   }else 
   {if(chosenAnswer === store.questions[counter].correctAnswer){
    score++;
    $('.results').html("<span class='right'>That is correct!</span> The answer is " + shownCorrectAnswer + ".");
    $('.results').show();
    console.log('correct');
    $('.next').show();

  } else{
    $('.results').html("<span class='wrong'>That is wrong.</span> The correct answer is " + shownCorrectAnswer + ".");
    $('.results').show();
    $('.next').show();
  }
  questionNumber++;
  counter++
  $('.progress').html("Your score is " + score + "/" + questionNumber);
  $('.submit').hide();
  $('.next').show();
  }
})
} 

function nextQuestion(){
  $(".next").on("click", function(){
    if(counter < store.questions.length){
    $('.submit').show()
    $(renderQuestion());
    $(generateCorrectAnswer());
    $(generateShownCorrectAnswer());
    $('.results').hide();
    }
    else{
      console.log("Done")
      $('.next').hide();
      $('.options').hide();
      $('.js-quiz-question').hide();
      $('.results').hide();
      $('.finished').show();
      $('.restart').show();
    }
  });
}

function restartQuiz()
{
  $(".restart").on("click", function(){
    location.reload();
  });
}

function runQuiz(){
  startQuiz();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(runQuiz);
