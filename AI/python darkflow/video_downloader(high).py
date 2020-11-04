from pytube import YouTube
# 라이브러리 가져오기

print('비디오 Youtube ID 입력: ', end='')
video_youtube_id = input()

yt = YouTube(f'https://www.youtube.com/watch?v={video_youtube_id}')
# 동영상 링크를 이용해 YouTube 객체 생성

yt_streams = yt.streams
# YouTube 객체인 yt에서 stream 객체를 생성

print('다운가능한 영상 상세 정보 :')
for i, stream in enumerate(yt_streams):
    print(i, " : ", stream)

print(' 고화질, mp4 포맷만 가져오기 : ')
for i, stream in enumerate(yt_streams.filter(adaptive=True, file_extension='mp4')):
    print(i, " : ", stream)

print(' \"itag\"를 이용해 특정 stream 선택 :')
itag = input()
my_stream = yt_streams.get_by_itag(itag)
print('선택된 stream : ', my_stream)

print(' 선택된 stream 다운로드 ')
my_stream.download()