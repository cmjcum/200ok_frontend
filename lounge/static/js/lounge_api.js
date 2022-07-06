// url matching
const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"



// method GET
async function load_lounge() {
  console.log("load lounge")

  const response = await fetch(`${backend_base_url}/lounge/`, {
    method: 'GET',
    headers: { Authorization: "Bearer " + localStorage.getItem("access") },
    withCredentials: true,
  })
    .then(response => response.json())
    .then(data => {

      // dormitory information in  header
      dormitory_logo = {
        "Gryffindor": "gr-logo",
        "Hufflepuff": "hf-logo",
        "Slytherin": "sl-logo",
        "Ravenclaw": "rc-logo"
      }
      my_dormitory = `${dormitory_logo[data.house[0].name]}`

      document.getElementById("house-logo").classList.add(my_dormitory);
      document.getElementById("house-name").innerText = `${data.house[0].name}`
      document.getElementById("house-desc").innerText = `${data.house[0].desc}`

      // my dormitory's students
      console.log("load lounge")
      let users_len = data.house[0].users.length
      temp_list = [data.user[0].portrait];

      for (var i = 0; i < users_len; i++) {
        portrait = data.house[0].users[i].portrait
        temp_list.push(portrait);
      }
      console.log(temp_list)
      users_len += 1
      for (var i = 0; i < users_len; i++) {
        url = temp_list[i]
        portrait_temp = `
        <div class="content">
          <img src="${url}">
        </div>`
        $("#portraits-box").append(portrait_temp)
      }

      // board data
      board_len = data.board.length
      user_id = data.user[0].id

      for (var i = 0; i < board_len; i++) {
        author_id = data.board[i].author
        comment = data.board[i]
        if (user_id == author_id) {
          board_temp = `
<tr>
    <td><img class="name-icon" src="${comment.icon}"></td>
    <td>${comment.author_name}</td>
    <td>${comment.content}
        <span class="edit-icon">
            <i class="bi bi-x-circle" onclick="delete_comment(${comment.id})"></i>
        </span>
    </td>
    <td>${comment.created}</td>
</tr>`
          $("#comments-box").append(board_temp)
        } else {
          board_temp = `
<tr>
    <td><img class="name-icon" src="${comment.icon}"></td>
    <td>${comment.author_name}</td>
    <td>${comment.content}</td>
    <td>${comment.created}</td>
</tr>`
          $("#comments-box").append(board_temp)
        }
      }

      // chart print (기숙사 별 학생 수)
      new Chart(document.getElementById("pie-chart-students"), {
        type: 'pie',
        data: {
          labels: ['Gryffindor', 'Hufflepuff', 'Slytherin', 'Ravenclaw'],
          datasets: [{
            label: "학생수 (명)",
            backgroundColor: ["#c45850", "#8e5ea2", "#3cba9f", "#e8c3b9"],
                data: data.users_count,
            }]
        },
        options: {
          title: {
                display: true,
                text: '기숙사 배치 현황'
              }
        },
      });
      
      
      // chart print (기숙사 별 게시글 수)
      new Chart(document.getElementById("pie-chart-board"), {
        type: 'bar',
        data: {
            labels: ['Gryffindor', 'Hufflepuff', 'Slytherin', 'Ravenclaw'],
            datasets: [{
                label: "게시글 수 (개)",
                backgroundColor: ["#c45850", "#8e5ea2", "#3cba9f", "#e8c3b9"],
                data: data.comments_count,
            }]
        },
        options: {
            title: {
                display: true,
                text: '가장 말이 많은 기숙사!'
            },
            scales: {
              yAxes: [{
                  ticks: {                      
                      min: 0,
                      stepSize: 1
                  }
              }]
          }
        },
      });

    })
}

// method POST
async function post_comment() {
  console.log("post comment in lounge")
  const postData = {
    content: document.getElementById("input-comment").value
  }

  const response = await fetch(`${backend_base_url}/lounge/`, {
    method: 'POST',
    headers: { Authorization: "Bearer " + localStorage.getItem("access"), "Content-Type": "application/json", },
    body: JSON.stringify(postData)
  })
  response_json = await response.json()
  document.getElementById("input-comment").value = ''

  if (response.status == 200) {
    location.reload();

  } else {
    alert("등록 실패!")
  }
}


// method DELETE
async function delete_comment(comment_id) {
  console.log("del comment in llounge")
  
  const response = await fetch(`${backend_base_url}/lounge/delete/${comment_id}/`, {
    method: 'DELETE',
    headers: { Authorization: "Bearer " + localStorage.getItem("access"), }
  })

  alert("삭제 완료!")
  location.reload();
}


// method PUT
// async function put_comment(comment_id) {
//     console.log("put comment in llounge")
//     const postData = {
//         content: document.getElementById("edit-comment").value
//     }

//     const response = await fetch(`${backend_base_url}/lounge/edit/${comment_id}/`, {
//         method: 'PUT',
//         headers: {Authorization: "Bearer " + localStorage.getItem("access"), "Content-Type": "application/json",},
//         body: JSON.stringify(postData)
//     })
//     response_json = await response.json()
//     document.getElementById("edit-comment").value = ''

//     if (response.status == 200) {
//         alert("등록 완료!")
//         // window.location.reroad()
//     } else {
//         alert("등록 실패!")
//     }

// }

// method DELETE
async function delete_comment(comment_id) {
  console.log("del comment in llounge")

  const response = await fetch(`${backend_base_url}/lounge/delete/${comment_id}/`, {
    method: 'DELETE',
    headers: { Authorization: "Bearer " + localStorage.getItem("access"), }
  })

  alert("삭제 완료!")
  location.reload();

}


// function openClose() {
//   if ($('#edit-input').css('display') == 'block') {
//     $('#edit-input').hide();
//   } else {
//     $('#edit-input').show();
//   }
// }


// const BagOpen = document.getElementById("bag_open")
// fetch("https://baconipsum.com/api/?type=all-meat&paras=200&format=html")
//     .then(response => response.text())
//     .then(result => BagOpen.innerHTML = result)
