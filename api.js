const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


async function handleSignin(){

    const signupData = {
        username : document.getElementById("floatingInput").value,
        password : document.getElementById('floatingPassword').value,
        fullname : document.getElementById('floatingInputFullname').value,
    }
    
    const response = await fetch(`${backend_base_url}/user/`,{
        headers:{
            Accept:"application/json",
            'Content-type':'application/json'
        },
        method:'POST',
        body:JSON.stringify(signupData)
    }
    )

    response_json = await response.json()

    if (response.status ==200){
        window.location.replace(`${frontend_base_url}/login.html`);
    }else{
        alert(response.status)
    }
}




async function handleLogin(){
    console.log("handle login")

    const loginData = {
        username : document.getElementById("floatingInput").value,
        password : document.getElementById('floatingPassword').value
    }


    const response = await fetch(`${backend_base_url}/user/api/token/`,{
        headers:{
            Accept:"application/json",
            'Content-type':'application/json'
        },
        method:'POST',
        body:JSON.stringify(loginData)
    }
    )



    response_json = await response.json()
    console.log(response_json.access)

    
    if (response.status ==200){
        localStorage.setItem("access", response_json.access)
        localStorage.setItem("refresh", response_json.refresh)


        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);
        // window.location.replace(`${frontend_base_url}/`);
    }else{
        alert(response.status)
    }

}