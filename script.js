let A = [
  {
    question: "What is the correct way to declare a JavaScript variable?",
    props: ["let x;", "variable x;", "v x;"],
    answer: "let x;"
  },
  {
    question: "Which method converts a JSON string into a JavaScript object?",
    props: ["JSON.parse()", "JSON.stringify()", "JSON.objectify()"],
    answer: "JSON.parse()"
  },
  {
    question: "What will `typeof null` return in JavaScript?",
    props: ["'object'", "'null'", "'undefined'"],
    answer: "'object'"
  },
  {
    question: "Which keyword is used to define a constant in JavaScript?",
    props: ["let", "var", "const"],
    answer: "const"
  },
  {
    question: "How do you write an arrow function that returns x * y?",
    props: ["function(x, y) { return x * y }", "(x, y) => x * y", "(x, y) -> x * y"],
    answer: "(x, y) => x * y"
  },
  {
    question: "Which method adds one or more elements to the end of an array?",
    props: ["push()", "pop()", "concat()"],
    answer: "push()"
  },
  {
    question: "What does the `===` operator do in JavaScript?",
    props: ["Compares value only", "Compares value and type", "Assigns a value"],
    answer: "Compares value and type"
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    props: ["String", "Float", "Boolean"],
    answer: "Float"
  },
  {
    question: "How do you create a Promise in JavaScript?",
    props: ["new Promise((resolve, reject) => { })", "Promise.create()", "make Promise()"],
    answer: "new Promise((resolve, reject) => { })"
  },
  {
    question: "Which statement correctly handles asynchronous code in JavaScript?",
    props: ["setTimeout()", "await", "Both"],
    answer: "Both"
  }
];




let question_count = 1;
let score = 0;

function Navigation(){

    let next_btn = document.getElementById("next_btn");
    let prev_btn = document.getElementById("prev");
    let props = document.querySelectorAll(".prop");


    // if(question_count == 9){
    //     next_btn.setAttribute("disabled" , "true")
    //     next_btn.style.backgroundColor = "#9FB8B7"
    // }

    
    // props.forEach( p =>{
    //     if(p.style.backgroundColor == "green"){
    //        CheckAnswer(p.textContent) ;
    //     }    
    // })

    prev_btn.disabled = false
    prev_btn.style.backgroundColor = "oklch(62.3% 0.214 259.815)"

    question_count++;
    

    
    Question_change();
    StyleRemover();

    console.table(A)
    
    
    
}

function ShowQuiz(){

  showResult()

    let code = `
            <div class="container flex justify-between ">
                <h1 class="text-cyan-400 " id="count">1 / 10</h1>
                
            </div>
            
        <h1 class="text-white " id="ques_title">${A[0].question}</h1>
        <div class="container items-center flex justify-around gap-5 flex-col">
          <span
            class="bg-cyan-900 border w-[80%] p-2 transition-all border-blue-400 rounded-md text-white prop" 
            >${A[0].props[0]}</span
          >
          <span
            class="bg-cyan-900 border w-[80%] p-2 transition-all border-blue-400 rounded-md text-white prop" 
            >${A[0].props[1]}</span
          >
          <span
            class="bg-cyan-900 border w-[80%] p-2 transition-all border-blue-400 rounded-md text-white prop" 
            >${A[0].props[2]}</span
          >
        </div>
        <div class="container flex justify-between">
          <button
            disabled="true"
            class=" bg-[#9FB8B7] transition text-white font-bold py-2 px-4 rounded" id="prev"
            onclick="PreviousQuestion()"
          >
            previous
          </button>

          <button
            botona="true"
            disabled = "true"
            onclick="Navigation()"
            class=" bg-[#9FB8B7]  transition text-white font-bold py-2 px-4 rounded"
            id="next_btn">
            next
          </button>
        </div>
    `

    document.getElementById("begin_btn").hidden = 'true';
    document.getElementById("container_div").innerHTML += code ;


      let props = document.querySelectorAll(".prop");
      let next_btn = document.getElementById("next_btn");
   // console.log(props)
    props.forEach( p =>{
        p.addEventListener('click', function(){
            
              
            p.style.backgroundColor = "green";
            p.style.transform = "scale(1.1)" ;
            A[question_count-1].userAnswer = p.textContent;

            next_btn.disabled = false
            next_btn.style.backgroundColor = "oklch(62.3% 0.214 259.815)"
            StyleRemover()

        })
    })
       

}


function Question_change(){
    console.log(question_count)
    let next_btn = document.getElementById("next_btn");
    let question_title = document.getElementById("ques_title");
    let count = document.getElementById("count");
    let props = document.querySelectorAll(".prop")

    
    question_title.innerText = A[question_count-1].question;
    

    props.forEach((p,i)=>{
        p.innerText = A[question_count-1].props[i]
    })


    count.innerHTML = `${question_count} / 10`;
    
    

    if (question_count==10){
      next_btn.style.backgroundColor = "green"
      next_btn.innerText = 'show results';
      next_btn.onclick = showResult;
      
    }
    else{
      next_btn.innerText = 'next';
      next_btn.onclick = Navigation;
    }

    
    
        next_btn.setAttribute("disabled" , "true")
        next_btn.style.backgroundColor = "#9FB8B7"

        

}

function StyleRemover(){


    let props = document.querySelectorAll(".prop");
    
    props.forEach( p =>{
            p.style.backgroundColor = "#104e64";
            p.style.transform = "scale(1)" ;
    })

    checkIfAlreadyAnswered(props)
}







function PreviousQuestion(){
    let prev_btn = document.querySelector("#prev")
    let next_btn = document.getElementById("next_btn");
    let props = document.querySelectorAll(".prop");

    question_count--
    if(question_count == 1){
        prev_btn.setAttribute("disabled" , "true")
        prev_btn.style.backgroundColor = "#9FB8B7"
    }

    
    
    Question_change()
    StyleRemover()

    
}


function showResult(){
    let result_div = document.getElementById("result_div");
    let container_div = document.getElementById("container_div");
    let score_title = document.getElementById("score_title");
    let score_number = 0
    result_div.hidden = false;
    container_div.hidden = true

    // score calculation

    A.map((a)=>{
       score_number+= (a.answer == a.userAnswer) ? 100 : 0
    })

    score_title.textContent = score_number

    

    A.forEach((a) =>{
      if ( a.answer !== a.userAnswer ) {

        const res = `
        <div>
          <h1 class="text-white" >${a.question}</h1>

          
          <span
          class="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700 dark:bg-emerald-700 dark:text-emerald-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="-ms-1 me-1.5 size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>

          <p class="text-sm whitespace-nowrap">${a.answer}</p>
        </span>

        


        <span
          class="inline-flex items-center justify-between rounded-full bg-red-100 px-2.5 py-0.5 text-red-700 dark:bg-red-700 dark:text-red-100">
          <svg  class="-ms-1 me-1.5 size-4"  width="13px" height="13px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="1.5"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cross-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-568.000000, -1087.000000)" fill="#ffffff"> <path d="M584,1117 C576.268,1117 570,1110.73 570,1103 C570,1095.27 576.268,1089 584,1089 C591.732,1089 598,1095.27 598,1103 C598,1110.73 591.732,1117 584,1117 L584,1117 Z M584,1087 C575.163,1087 568,1094.16 568,1103 C568,1111.84 575.163,1119 584,1119 C592.837,1119 600,1111.84 600,1103 C600,1094.16 592.837,1087 584,1087 L584,1087 Z M589.717,1097.28 C589.323,1096.89 588.686,1096.89 588.292,1097.28 L583.994,1101.58 L579.758,1097.34 C579.367,1096.95 578.733,1096.95 578.344,1097.34 C577.953,1097.73 577.953,1098.37 578.344,1098.76 L582.58,1102.99 L578.314,1107.26 C577.921,1107.65 577.921,1108.29 578.314,1108.69 C578.708,1109.08 579.346,1109.08 579.74,1108.69 L584.006,1104.42 L588.242,1108.66 C588.633,1109.05 589.267,1109.05 589.657,1108.66 C590.048,1108.27 590.048,1107.63 589.657,1107.24 L585.42,1103.01 L589.717,1098.71 C590.11,1098.31 590.11,1097.68 589.717,1097.28 L589.717,1097.28 Z" id="cross-circle" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>

          <p class="text-sm whitespace-nowrap">${a.userAnswer}</p>
        </span>
        </div>
        
        `
        result_div.innerHTML += res
      }
    })

} 


function checkIfAlreadyAnswered(props){
  props.forEach(p => {
      console.log(p.textContent + '______' + A[question_count-1].userAnswer);
      
      if(p.textContent == A[question_count-1].userAnswer){
            p.style.backgroundColor = "green";
            p.style.transform = "scale(1.1)" ;

            next_btn.disabled = false
    next_btn.style.backgroundColor = "oklch(62.3% 0.214 259.815)"
      }
    })

    
}
