// url matching
const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

// get data - my room
async function change_myroom() {
    console.log("change myroom")

    const response = await fetch(`${backend_base_url}/dorm/myroom/`, {
        method: 'GET',
        headers : { Authorization : "Bearer " + localStorage.getItem("access")},
        withCredentials: true,  
    })
    .then(response => response.json())
    .then(data => {      
        dormitory = ["gd", "hf", "sth", "rc"]
        let room_id = data.dormitory_id - 1

        console.log(data)

        document.getElementById("mybg").classList.toggle(`${dormitory[room_id]}-bg`)
        document.getElementById("myroom").classList.toggle(`${dormitory[room_id]}-room`)
        document.getElementById("mybed").classList.toggle(`${dormitory[room_id]}-bed-name`)
        document.getElementById("mybed").innerText= `${data.fullname}`
        document.getElementById("mybag").classList.toggle(`${dormitory[room_id]}-bag`)
        document.getElementById("myic").classList.toggle(`${dormitory[room_id]}-id-card`)
        document.getElementById("myic2").classList.toggle(`${dormitory[room_id]}-id-card2`)
        document.getElementById("myiclogo").classList.toggle(`${dormitory[room_id]}-logo`)

        // student id card
        admission = getYmd10(data.join_date)
        student_id = admission.slice(2, 4) + String(data.dormitory_id).padStart(2,'0') + String(data.id).padStart(4,'0')
        image_url = `${data.portrait}`
        console.log(image_url)
        document.getElementById("myname").innerText= `${data.fullname}`
        document.getElementById("name").innerText= `${data.fullname}`
        document.getElementById("birthday").innerText= `${data.birthday}`
        document.getElementById("student_id").innerText= `${student_id}`
        document.getElementById("admission").innerText= `${admission}`
        // document.querySelector(".portrait").attr('style', 'background-image: url("' + image_url +'")')
    })
}


//yyyy-mm-dd format
function getYmd10() {    
    var d = new Date();
    return d.getFullYear() + "-" + ((d.getMonth() + 1) > 9 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1)) + "-" + (d.getDate() > 9 ? d.getDate().toString() : "0" + d.getDate().toString());
}


//  bag modal
function click_event() {
    setTimeout(modalOn, 3000)
}

const modal = document.getElementById("modal")

function modalOn() {
    modal.style.display = "flex"
}

function isModalOn() {
    return modal.style.display === "flex"
}

function modalOff() {
    modal.style.display = "none"
}

const btnModal = document.getElementById("mybag")
btnModal.addEventListener("click", e => {
    click_event()
})

const closeBtn = modal.querySelector(".close-area")
closeBtn.addEventListener("click", e => {
    modalOff()
})

modal.addEventListener("click", e => {
    const evTarget = e.target
    if (evTarget.classList.contains("modal-overlay")) {
        modalOff()
    }
})

window.addEventListener("keyup", e => {
    if (isModalOn() && e.key === "Escape") {
        modalOff()
    }
})


//  bag animation btn
element = document.getElementById("mybag");

element.addEventListener("click", function(e) {
    e.preventDefault;

  // -> removing the class
    element.classList.remove("bag_ani");

  // -> triggering reflow /* The actual magic */
  // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
    element.offsetWidth = element.offsetWidth;

  // -> and re-adding the class
    element.classList.add("bag_ani");
}, false);


function go_lounge() {
    window.location.replace(`${backend_base_url}/lounge/lounge.html`);
}


function logout() {
    window.localStorage.clear();
    window.location.replace(`${frontend_base_url}/login/signin_up.html`);
    alert('logout success')
}
