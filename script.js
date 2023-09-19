window.onload = function () {


  
    var questionArea               = document.getElementsByClassName('questions')[0],
        answerArea                 = document.getElementsByClassName('answers')[0],
        checker                    = document.getElementsByClassName('checker')[0],
        current                    = 0,
    
       // An object that holds all the questions + possible answers.
       // In the array --> last digit gives the right answer position
        allQuestions = {
          'What type of tortilla is served with the De Casa tacos?' : ['Corn', 'Flour', 'Hard Corn', 1 , "false"],

          'How are De Casa tacos garnished?' : ['Lettuce', 'Pico de Gallo', 'Cilantro', 'Pickled Jalapenos', 'Cotija Cheese', 'Pickled Red Onions', ['Cilantro', 'Cotija Cheese','Pickled Red Onions', 'Pico de Gallo'], "true"],     

          
          
          'What type of tortilla is served with the De Calle tacos?' : ['Hard Corn', 'Corn', 'Flour', 1 , "false"],



          // '' : ['', '', '', null, "true"],                      <-------------- Question Template
          // 'What\'s my mother fuckin\' name?' : ['Steve', 'Ian', 'Joe', ["Ian", "Steve"], "true"],       <---------MSA Example
        };
        
    function loadQuestion(curr) {
    // This function loads all the question into the questionArea
    // It grabs the current question based on the 'current'-variable
    
      var question = Object.keys(allQuestions)[curr];
      
      questionArea.innerHTML = '';
      questionArea.innerHTML = question;    
    }

    
    function loadAnswers(curr) {
    // This function loads all the possible answers of the given question
    // It grabs the needed answer-array with the help of the current-variable
    // Every answer is added with an 'onclick'-function
    
      var answers = allQuestions[Object.keys(allQuestions)[curr]];
      var answersMC = answers.slice()[7]; //                    <------------------------------this number may change so i need to make it standard.

      answerArea.innerHTML = '';
      

      for (var i = 0; i < answers.length -2; i += 1) {



        if(answersMC == "true"){
          for (var i = 0; i < answers.length -2; i += 1) {
          
            var createDiv = document.createElement('div');
            var createInput = document.createElement("INPUT");
            var label = document.createElement("label");
            var answerTextNode = document.createTextNode(answers[i]);
            var createSubBtnDiv = document.createElement('div');
            var selectedAnswers = [];
            


            createDiv.setAttribute("id", "answerDiv");
            createDiv.appendChild(label);


            createInput.setAttribute("type", "checkbox");
            createInput.setAttribute("class", "multiSelectionAnswers");
            createInput.setAttribute("name", answers[i]);
            createInput.setAttribute("id", answers[i]);
            createInput.setAttribute("value", answers[i]);
            createInput.setAttribute("onchange", "");
            createInput.onchange = function isCheckedFunction(){
              var query = this.id
              var uniqueId = document.getElementById(query);

              //console.log(uniqueId.checked)

              if(uniqueId.checked == true){
                  selectedAnswers.push(this.value);
                  //console.log(selectedAnswers);    
              } else{ 
                  var index = selectedAnswers.indexOf(this.value)
                  selectedAnswers.splice(index, 1);
                  //console.log(selectedAnswers)
              }
              
              console.log(selectedAnswers.sort());
            };
            

            createDiv.appendChild(createInput);
            

            label.setAttribute("for", answers[i]);
            label.appendChild(answerTextNode);
            

            answerArea.appendChild(createDiv);
          };

          var submitButton = document.createElement('button');
          var subBtnText = document.createTextNode('Submit');


          submitButton.setAttribute("onclick", "");
          submitButton.onclick = function msaFunction(a, b){
            var a = selectedAnswers.sort();
            var b = Object.values(allQuestions)[curr][6];//      <------------------------------this number may change so i need to make it standard.
            b.sort();

            if(_.isEqual(a, b) === true){
              addChecker(true);      
              console.log("Correct!")
            } else {
              addChecker(false);  
              console.log("Inncorrect.")
            }


            if (current < Object.keys(allQuestions).length -1) {
              current += 1;
              
              loadQuestion(current);
              loadAnswers(current);
            } else {
              questionArea.innerHTML = 'Done';
              answerArea.innerHTML = '';
            }
            

            console.log(current < Object.keys(allQuestions).length -1)
            console.log("Your Answer: " + a);
            console.log("Correct Answer: " + b);
            console.log("Submitted!!!")
          }


          submitButton.appendChild(subBtnText);

          answerArea.appendChild(createSubBtnDiv);
          createSubBtnDiv.appendChild(submitButton);

// --------------------------------------- not MSA
        } else {
            var createDiv = document.createElement('div'),
                text = document.createTextNode(answers[i]);

            createDiv.appendChild(text);
            createDiv.addEventListener("click", checkAnswer(i, answers));

            answerArea.appendChild(createDiv);
            }  
            
        }
    
    }

    



    
    function checkAnswer(i, arr) {
      // This is the function that will run, when clicked on one of the answers
      // Check if givenAnswer is sams as the correct one
      // After this, check if it's the last question:
      // If it is: empty the answerArea and let them know it's done.
      
      return function () {
        var givenAnswer = i,
            correctAnswer = arr[arr.length-2];


        if (givenAnswer === correctAnswer) {
          addChecker(true);          
        } else {
          addChecker(false);                    
        }
        
        if (current < Object.keys(allQuestions).length -1) {
          current += 1;
          
          loadQuestion(current);
          loadAnswers(current);

        } else {
          questionArea.innerHTML = 'Done';
          answerArea.innerHTML = '';
        }
                                
      };
    }
    
    function addChecker(bool) {
    // This function adds a div element to the page
    // Used to see if it was correct or false
    
      var createDiv = document.createElement('div'),
          txt       = document.createTextNode(current + 1);
      
      createDiv.appendChild(txt);
      
      if (bool) {
        
        createDiv.className += 'correct';
        checker.appendChild(createDiv);
      } else {
        createDiv.className += 'false';
        checker.appendChild(createDiv);
      }
    }
    
    
    // Start the quiz right away
    loadQuestion(current);
    loadAnswers(current);
    
  };