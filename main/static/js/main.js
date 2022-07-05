const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


async function select_picture() {

    let pic = document.getElementById('input_file').files[0]

    let form_data = new FormData();

    form_data.append("pic", pic);

    const response = await fetch(`${backend_base_url}/user/main/`, {
        headers: {Authorization : "Bearer " + localStorage.getItem("access")},
        withCredentials: true,
        method: 'POST',
        body: form_data
    }
    ).then(response => {
        console.log(response)
        if (response.status == 200) {
            window.location.replace(`${frontend_base_url}/main/question.html`);
        }
        if (response.status == 400) {
            alert(response.status)
        }
    });
}