const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


async function handleSignup() {

    let pic = document.getElementById('input_file')[0].files[0];

    let form_data = new FormData();

    form_data.append("pic", pic);

    const response = await fetch(`${backend_base_url}/user/main/`, {
        headers: {
            Accept: "application/json",
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.FormData(form_data)
    }
    )
    response_json = await response.json()

    if (response.status == 200) {
        // window.location.replace(`${frontend_base_url}/question.html`);
    } else {
        alert(response.status)
    }
}