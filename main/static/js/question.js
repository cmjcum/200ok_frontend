const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


async function load_question_page() {
    const response = await fetch(`${backend_base_url}/dorm/question/`, {
        method: 'GET',
        // headers : { Authorization : "Bearer " + localStorage.getItem("access")},
        // withCredentials: true,  
    })
    .then(response => response.json())
    .then(data => {
        for(let i=0; i<data.questions.length; i++) {
            let cur_question = data.questions[i]
            temp_html = `
                    <div id="question${i}" class="question">
                        <div class="q-title">${cur_question['question']}<div>
                    </div>
            `;
            $('#questions').append(temp_html);
            for(let j=0; j<cur_question['answers'].length; j++) {
                let cur_answer = cur_question['answers'][j]
                
                let temp_html = `
                    <div class="answer">
                        <label>
                            <input type="radio" name="question${i}" value=${cur_answer['dormitory']}>${cur_answer['answer']}
                        </label>
                    </div>
                `
                $(`#question${i}`).append(temp_html)
            }
        }
    });
}

