// 서버 요청 함수 라이브러리
const server = process.env.REACT_APP_SERVER // 환경변수에 선언한 서버 주소

/* USER */

// 1. 유저 생성
export async function createUser (newUser) {
  
  // fetch(요청주소, 옵션) -> 서버에 요청하는 함수
  const res = await fetch(`${server}/users`, { // 요청할 서버 주소
    method: "POST", // 요청 방식 ( 요청 주소 )
    headers: { 'Content-Type' : 'application/json'}, // 헤더로 전송 될 데이터 타입 명시
    body: JSON.stringify(newUser) // BODY에 작성되는 데이터를 JSON 으로 변환 ( 전송할 데이터)
  })

  // 요청 실패
  if (!res.ok) {
    throw new Error (`${res.status} ${res.statusText}`)
  }
  // 요청 성공 -> 응답 객체 리턴
  return await res.json() 
}

// 2. 정보 수정

export async function updateUser (formData) {
  const res = await fetch(`${server}/user`, {
    method: "PUT",
    // 로컬스토리지에 저장된 토큰을 추출하여 헤더에 담는다
    headers: { 'Authorization': 'Bearer' + JSON.parse(localStorage.getItem("user")).token },
    body: formData
  })

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return await res.json()
}

// 3. 로그인

export async function signIn(email, password) {
  const res = await fetch(`${server}/user/login` , {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return await res.json()
}

/* ARTICLES */

// 1. 피드 가져오기

export async function feed(skip) { 
  // 요청변수 skip -> 더보기 기능 구현
  const res = await fetch(`${server}/feed?skip=${skip}`, {
    headers: { "Authorization": "Bearer" + JSON.parse(localStorage.getItem("user")).token}
  })

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return await res.json()
}

// 2. 게시물 한 개 가져오기

export async function getArticle(id) {
  const res = await fetch(`${server}/articles/${id}` , {
    headers: { "Authorization" : "Bearer" + JSON.parse(localStorage.getItem("user")).token}
  })

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return await res.json()
}

// 3. 게시물 생성

export async function createArticle(formData) {
  const res = await fetch(`${server}/articles`, {
    method: "POST",
    headers: { "Authorization" : "Bearer" + JSON.parse(localStorage.getItem("user").token)},
    body: formData
  })

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }

  return await res.json()
}

// 4. 게시물 삭제

export async function deleteArticle(id) {
  const res = await fetch(`${server}/articles/${id}`, {
    method: "DELETE",
    headers: { "Authorization": "Bearer" + JSON.parse(localStorage.getItem("user")).token}
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return await res.json()
}

// 5. 좋아요

export async function favorite(id) {
  const res = await fetch(`${server}/articles/${id}/favorite`, {
    method: 'POST',
    headers: { "Authorization": "Bearer" + JSON.parse(localStorage.getItem("user")).token}
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return await res.json()
}

// 6. 좋아요 취소.

export async function unfavorite(id) {
  const res = await fetch(`${server}/articles/${id}/favorite`, {
    method: 'DELETE',
    headers: { "Authorization": "Bearer" + JSON.parse(localStorage.getItem("user")).token}
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return await res.json()
}

/* COMMENTS */

// 1. 댓글 가져오기

export async function getComments(id) {
  const res = await fetch(`${server}/articles/${id}/comments`, {
    headers: { 'Authorization': "Bearer" + JSON.parse(localStorage.getItem("user")).token}
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return await res.json()
}

// 2. 댓글 생성

export async function createCommnet(id, content) {
  const res = await fetch(`${server}/articles/${id}/comments`, {
    method:"POST",
    headers: { 
      'Authorization': "Bearer" + JSON.parse(localStorage.getItem("user")).token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ content })
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return await res.json()
}

// 3. 댓글 삭제

export async function deleteComment(id) {
  const res = await fetch(`${server}/comments/${id}`, {
    method: "DELETE",
    headers: { 'Authorization': "Bearer" + JSON.parse(localStorage.getItem("user")).token}
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return await res.json()
}

/* PROFILES */

// 1. 프로필 리스트 가져오기

export async function getProfiles(username) {
  // 프로필 검색에서 활용
  const res = await fetch (`${server}/profiles/?username=${username}`, {
    headers: { 'Authorization': "Bearer" + JSON.parse(localStorage.getItem("user")).token}
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return await res.json()
}

// 2. 프로필 상세보기

export async function getProfile(username) {
  const res = await fetch (`${server}/profiles/${username}`, {
    headers: { 'Authorization': "Bearer" + JSON.parse(localStorage.getItem("user")).token}
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return await res.json()
}

// 3. 타임라인 가져오기

export async function getTimeline(username) {
  const res = await fetch (`${server}/articles/?username=${username}`, {
    headers: { 'Authorization': "Bearer" + JSON.parse(localStorage.getItem("user")).token}
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return await res.json()
}

// 4. 팔로워 리스트 가져오기

export async function getFollowers(username) {
  const res = await fetch (`${server}/profiles/?followers=${username}`, {
    headers: { 'Authorization': "Bearer" + JSON.parse(localStorage.getItem("user")).token}
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return await res.json()
}

// 5. 팔로잉 리스트 가져오기

export async function getFollowings(username) {
  const res = await fetch (`${server}/profiles/?followings=${username}`, {
    headers: { 'Authorization': "Bearer" + JSON.parse(localStorage.getItem("user")).token}
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return await res.json()
}

// 6. 팔로우

export async function follow(username) {
  const res = await fetch(`${server}/profiles/${username}/follow`, {
    method: "POST",
    headers: { 'Authorization': "Bearer" + JSON.parse(localStorage.getItem("user")).token}
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return await res.json()
}

// 7. 언팔로우

export async function unfollow(username) {
  const res = await fetch(`${server}/profiles/${username}/follow`, {
    method: "DELETE",
    headers: { 'Authorization': "Bearer" + JSON.parse(localStorage.getItem("user")).token}
  })
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`)
  }
  return await res.json()
}