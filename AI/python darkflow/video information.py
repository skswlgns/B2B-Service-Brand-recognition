from pytube import YouTube
# 라이브러리 가져오기

yt = YouTube('https://www.youtube.com/watch?v=V1DEVT--TCE')
# 동영상 링크를 이용해 YouTube 객체 생성

print("영상 제목 : ", yt.title)

print("영상 길이 : ", yt.length)

print("영상 평점 : ", yt.rating)

print("영상 썸네일 링크 : ", yt.thumbnail_url)

print("영상 조회수 : ", yt.views)

print("영상 설명 : ", yt.description)