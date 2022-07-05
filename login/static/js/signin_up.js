const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"



async function handleSignup() {
    const signupData = {
        fullname: document.getElementById('floatingInputFullname').value,
        username: document.getElementById("floatingInput").value,
        password: document.getElementById('floatingPassword').value,
    }

    // const response = await fetch('url 작성')
    const response = await fetch(`${backend_base_url}/user/`, {
        headers: {
            Accept: "application/json",
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(signupData)
    }
    )
    // signupData 를 json화 해준다.
    response_json = await response.json()

    if (response.status == 200) {
        alert('회원 가입 성공')
        window.location.reload();
    } else {
        alert('다시 입력해 주세요')
    }
}


async function handleSignin() {
    const loginData = {
        username: document.getElementById("floatingInputSignIn").value,
        password: document.getElementById('floatingPasswordSignIn').value
    }
    const response = await fetch(`${backend_base_url}/user/api/token/`, {
        headers: {
            Accept: "application/json",
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(loginData)
    }
    )
    response_json = await response.json()

    if (response.status == 200) {
        // jwt token 의 access, refresh 값을 각각의 이름으로 저장한다.
        localStorage.setItem("access", response_json.access)
        localStorage.setItem("refresh", response_json.refresh)
        // access 값 파싱 작업
        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);
        alert("로그인 성공")
        window.location.replace(`${frontend_base_url}/`);
    } else {
        alert("일치하지 않는 아이디나 비밀번호입니다.")
    }
}


// html에서 업로드하는 file을 s3에 저장시키는 코드
// 이 코드 실행시 s3에 파일 저장
function save() {
    var form_data = new FormData($('#upload-file')[0]);
    $.ajax({
        type: 'POST',
        url: '/fileupload',
        data: form_data,
        processData: false,
        contentType: false,
        success: function (data) {
            alert("파일이 업로드 되었습니다!!");
        },
    });
}


// random background
function random_background() {
    var images = ['background1.jpg', 'background2.jpg', 'background3.jpg'];
    $('body').css({ 'background-image': 'url(images/' + images[Math.floor(Math.random() * images.length)] + ')' });
}


// modal open
function modal_default() {
    $('#popup1').hide()
    $('#popup2').hide()
    $('#popup3').hide()
    $('#popup4').hide()
}

function open1() { $('#popup1').show() }
function open2() { $('#popup2').show() }
function open3() { $('#popup3').show() }
function open4() { $('#popup4').show() }

function modal_open() {
    setTimeout(open1, 1000)
    setTimeout(open2, 1200)
    setTimeout(open3, 1400)
    setTimeout(open4, 1600)
}

function modalOff(obj) {
    $(obj).parent().hide()
}