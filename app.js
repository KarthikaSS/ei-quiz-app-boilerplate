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
      correctAnswer: 'B.',
      shownCorrectAnswer: 'B. Insecure'
    },
    {
      question: '2. In which of the following situations does cortisol have a reduced effect in lowering inflammation?',
      answers: [
        'A. During acute stress',
        'B. During chronic stress',
        'C. During exercise',
        'D. None of the above'
      ],
      correctAnswer: 'B.',
      shownCorrectAnswer: 'B. During chronic stress'
    },
    {
      question: '3. Sometimes while doing a repetitive task like driving, people rely on their executive function, more commonly known as “auto-pilot.” Which part of the brain is responsible for executive function?',
      answers: [
        'A. Parietal lobe',
        'B. Medulla',
        'C. Temporal lobe',
        'D. Frontal lobe'
      ],
      correctAnswer: 'D.',
      shownCorrectAnswer: 'D. Frontal lobe'
    },
    {
      question: '4. What has been found to be the most effective form of therapy?',
      answers: [
        'A. EMDR',
        'B. Group therapy',
        'C. Cognitive Behavioral Therapy',
        'D. Counseling'
      ],
      correctAnswer: 'C.',
      shownCorrectAnswer: 'C. Cognitive Behavioral Therapy'
    },
   {
      question: '5. Which disorder is lithium used to treat?',
      answers: [
        'A. Bipolar Disorder',
        'B. Depression',
        'C. Obsessive Compulsive Disorder',
        'D. Generalized Anxiety Disorder'
      ],
      correctAnswer: 'A.',
      shownCorrectAnswer: 'A. Bipolar Disorder'
    }
  ],
  quizStarted: false,
};

function generateCurrentQuestion(){
    currentQuestion = store.questions[counter].question;
    return currentQuestion; 
}


/*function generateCurrentQuestion(number){
    currentQuestion = store.questions[number].question;
    return currentQuestion;
}
*/



function renderQuestion(){
  const displayedQuestion = generateCurrentQuestion(store);

  $('.js-quiz-question').html(displayedQuestion);
}

function generateChoiceA(){
    answerA = store.questions[counter].answers[0];
    return answerA;
}

function generateChoiceB(){
    answerB = store.questions[counter].answers[1];
    return answerB;
}

function generateChoiceC(){
    answerC = store.questions[counter].answers[2];
    return answerC;
}

function generateChoiceD(){
    answerD = store.questions[counter].answers[3];
    return answerD;
}

function renderAllChoices(){
 const displayedChoiceA = generateChoiceA(store);
  $('.js-quiz-choice-a').html(`<input type = "radio" value = ${displayedChoiceA}" id = "" name = "answers">${displayedChoiceA}`);
  const displayedChoiceB = generateChoiceB(store);
  $('.js-quiz-choice-b').html(`<input type = "radio" value = ${displayedChoiceB}" id = "" name = "answers">${displayedChoiceB}`);
  const displayedChoiceC = generateChoiceC(store);
  $('.js-quiz-choice-c').html(`<input type = "radio" value = ${displayedChoiceC}" id = "" name = "answers">${displayedChoiceC}`);
  const displayedChoiceD = generateChoiceD(store);
  $('.js-quiz-choice-d').html(`<input type = "radio" value = ${displayedChoiceD}" id = "" name = "answers">${displayedChoiceD}`);
}

function generateCorrectAnswer(){
    correctAnswer = store.questions[counter].correctAnswer;
    return correctAnswer;
}
function generateShownCorrectAnswer(){
    shownCorrectAnswer = store.questions[counter].shownCorrectAnswer;
    return shownCorrectAnswer;
}

function startQuiz()
{
  $('.next').hide();
  $('.submit').hide();
  $('.options').hide();
  $(".start").on("click", function(){
    console.log("Started");
    renderQuestion();
    renderAllChoices();
    generateCorrectAnswer();
    generateShownCorrectAnswer();
    currentQuestion++;
    $('.start').hide();
    $('.submit').show();
    $('.options').show();
  });
     
}

 function submitAnswer(){
$('.submit').click(function(event) {
  event.preventDefault();
  console.log('`submitAnswer` ran');
   var chosenAnswer = $("input[name=answers]:checked").val();
   console.log(chosenAnswer);
   if(!chosenAnswer){
     alert ("Please choose an answer.");
   }else 
   {if(chosenAnswer === correctAnswer){
    score++;
    $result.html("<span class='right'>That is correct!</span> The answer is " + shownCorrectAnswer + ".");
    console.log('correct');

  } else{
    $result.html("<span class='wrong'>That is wrong.</span> The correct answer is " + shownCorrectAnswer + ".");
  }
  questionNumber++;
  counter++
  $progress.html("Your score is " + score + "/" + questionNumber);
  $('.submit').hide();
  $('.next').show();
  }
})
} 

function nextQuestion(){
  $(".next").on("click", function(){
    if(counter < 5){
    $('.submit').show()
    $(renderQuestion);
    $(renderAllChoices);
    $(generateCorrectAnswer);
    $(generateShownCorrectAnswer);
    }
    else{
      console.log("Done")
      $('.next').hide();
      $('.options').hide();
      $('.js-quiz-question').hide();
      $('.results').hide();
      $('.finished').show();
    }
  });
}

function runQuiz(){
  startQuiz();
  submitAnswer();
  nextQuestion();
}

$(runQuiz);
