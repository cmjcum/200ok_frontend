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
                        <div class="q-title">${cur_question['question']}</div>
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


function click_next_btn() {
    $('#first').hide();
    $('#second').show();
}

function click_submit_btn() {
    let counting_answers = [0, 0, 0, 0];

    for(let i=0; i<$('.question').length-1; i++) {
        let value = $(`input[type=radio][name=question${i}]:checked`).val();

        if(!value) {
            alert(`답하지 않은 항목이 있습니다!`);
            $('#first').show();
            $('#second').hide();
            return
        }

        counting_answers[value-1] += 1;
    }

    let value = $(`input[type=radio][name=question_dorm]:checked`).val();
    if(!value) {
        alert('가장 가고싶은 기숙사를 선택하세요!');
        return
    }
    value -= 1
    counting_answers[value] += 2;

    let max = Math.max(...counting_answers);

    if(counting_answers.indexOf(max) != counting_answers.lastIndexOf(max)) {
        let max_answers = [];

        for(let i=0; i<counting_answers.length; i++) {
            if(max == counting_answers[i]) {
                max_answers[i] = i;
            }
        }

        let rand = Math.floor(Math.random()*max_answers.length);
        let domr_id = max_answers[rand] + 1;
        post_dorm_and_birthday(domr_id)
        // console.log(max_answers[rand] + 1);
        return
    }

    let dorm_id = counting_answers.indexOf(max) + 1;
    post_dorm_and_birthday(dorm_id);

    // console.log(counting_answers.indexOf(max) + 1)
    return
}


async function post_dorm_and_birthday(domr_id) {
    let birthday = $('#birthday').val()

    const info_data = {
        'dormitory': domr_id,
        'birthday': birthday
    }

    const response = await fetch(`${backend_base_url}/user/info/`, {
        headers: {Authorization : "Bearer " + localStorage.getItem("access")},
        withCredentials: true,
        method: 'POST',
        body: JSON.stringify(info_data)
    }
    ).then(response => {
        if (response.status == 200) {
            alert('success')
        }
        if (response.status == 400) {
            alert(response.status)
        }
    });
}