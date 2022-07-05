// url matching
const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


// get data - sorting dormitory
async function change_mydormitory() {
    console.log("change mydormitory")

    const response = await fetch(`${backend_base_url}/dorm/sorting/`, {
        method: 'GET',
        headers : { Authorization : "Bearer " + localStorage.getItem("access")},
        withCredentials: true,
    })
    .then(response => response.json())
    .then(data => {      
        dormitory = ["gd", "hf", "sth", "rc"]
        let room_id = data.dormitory_id - 1
        
        console.log(data)
        // dorm element
        document.getElementById("mybg").classList.toggle(`${dormitory[room_id]}-bg`)
        document.getElementById("mydormlogo").classList.toggle(`${dormitory[room_id]}-logo`)
        document.getElementById("mydorm1").innerText = `${data.dormitory}`
        document.getElementById("mydorm2").innerText= `${data.dormitory}`
        document.getElementById("myic").classList.toggle(`${dormitory[room_id]}-id-card`)
        document.getElementById("myic2").classList.toggle(`${dormitory[room_id]}-id-card2`)
        document.getElementById("myiclogo").classList.toggle(`${dormitory[room_id]}-logo`)

        // student id card
        admission = getYmd10(data.join_date)
        student_id = admission.slice(2, 4) + String(data.dormitory_id).padStart(2,'0') + String(data.id).padStart(4,'0')

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


// SNS share
function share_facebook() {
    var sendUrl = "devpad.tistory.com/"; // 전달할 URL
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);}


function share_kakao() {

    // 사용할 앱의 JavaScript 키 설정
    Kakao.init('8adc2cfed61d408c49b6df7068aef576');

    // 카카오링크 버튼 생성
    Kakao.Link.createDefaultButton({
        container: '#btn_Kakao', // 카카오공유버튼ID
        objectType: 'feed',
        content: {
            title: "200ok", // 보여질 제목
            description: "[당일입학] 당신도 호그와트에 입학할 수 있다!", // 보여질 설명
            imageUrl: "devpad.tistory.com/", // 콘텐츠 URL
            link: {
        mobileWebUrl: "devpad.tistory.com/",
        webUrl: "devpad.tistory.com/"
            }
        }
    });
}


function clipboard_share() {
    // 1. 새로운 element 생성
    var tmpTextarea = document.createElement('textarea');

    // 2. 해당 element에 복사하고자 하는 value 저장
    tmpTextarea.value = "http://127.0.0.1:5500/dormitory/dormitory.htm";

    // 3. 해당 element를 화면에 안보이는 곳에 위치
    tmpTextarea.setAttribute('readonly', '');
    tmpTextarea.style.position = 'absolute';
    tmpTextarea.style.left = '-9999px';
    document.body.appendChild(tmpTextarea);

    // 4. 해당 element의 value를 시스템 함수를 호출하여 복사
    tmpTextarea.select();
    tmpTextarea.setSelectionRange(0, 9999);  // 셀렉트 범위 설정
    var successChk = document.execCommand('copy');

    // 5. 해당 element 삭제
    document.body.removeChild(tmpTextarea);

    // 클립보드 성공여부 확인
    if (!successChk) {
        alert("클립보드 복사 실패");
    } else {
        alert("클립보드에 복사 완료");
    }
}


// save image
function save_image() {
        html2canvas($("#student-id"), {
            onrendered: function (canvas) {
                canvas.toBlob(function (blob) {
                    saveAs(blob, 'myidcard.png')
            })
        }
    })
}


function go_room() {
    window.location.href = "myroom.html";
}
