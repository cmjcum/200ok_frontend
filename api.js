const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


async function handleSignin() {
    const signupData = {
        username: document.getElementById("floatingInput").value,
        password: document.getElementById('floatingPassword').value,
        fullname: document.getElementById('floatingInputFullname').value,
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
        window.location.replace(`${frontend_base_url}/login.html`);
    } else {
        alert(response.status)
    }
}


async function handleLogin() {
    const loginData = {
        username: document.getElementById("floatingInput").value,
        password: document.getElementById('floatingPassword').value
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
    // //
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
        // window.location.replace(`${frontend_base_url}/`);
    } else {
        alert(response.status)
    }
}


function logout() {
    window.localStorage.clear();
    window.location.replace(`${frontend_base_url}/login.html`);
    alert( '로그아웃' )
}