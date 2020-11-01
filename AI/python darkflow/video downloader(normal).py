from pytube import YouTube

yt = YouTube('https://www.youtube.com/watch?v=V1DEVT--TCE')
# 위 링크 위치에 동영상 링크 적어주기
print(yt.title)

yt.streams.filter(adaptive=True, file_extension='mp4').first().download()