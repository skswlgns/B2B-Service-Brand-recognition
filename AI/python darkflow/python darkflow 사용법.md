## 가상환경 실행 및 cv2, pytube3 설치(파이썬 버전 3.6 이상에서)

```powershell
> python -m venv venv
> call venv/scripts/activate
> pip install --upgrade pip


> pip install opencv-python
> pip install pytube3 --upgrade
```





## 고화질 동영상 다운로드 하기

```python
# high quality video downloade.py 실행

from pytube import YouTube
# 라이브러리 가져오기

yt = YouTube('https://www.youtube.com/watch?v=V1DEVT--TCE')
# 동영상 링크를 이용해 YouTube 객체 생성

yt_streams = yt.streams
# YouTube 객체인 yt에서 stream 객체를 생성

print("다운가능한 영상 상세 정보 :")
for i, stream in enumerate(yt_streams):
    print(i, " : ", stream)

print(" 고화질, mp4 포맷만 가져오기 : ")
for i, stream in enumerate(yt_streams.filter(adaptive=True, file_extension='mp4')):
    print(i, " : ", stream)

print(" \"itag\"를 이용해 특정 stream 선택 :")
itag = input()
my_stream = yt_streams.get_by_itag(itag)
print("선택된 stream : ", my_stream)

print(" 선택된 stream 다운로드 ")
my_stream.download()
```

> 실행하면 아래 목록이 뜨는데, 이 중 다운받고자 하는 영상의 `itag`를 입력하면 다운받아짐

```shell
다운가능한 영상 상세 정보 :
0  :  <Stream: itag="18" mime_type="video/mp4" res="360p" fps="30fps" vcodec="avc1.42001E" acodec="mp4a.40.2" progressive="True" type="video">
1  :  <Stream: itag="22" mime_type="video/mp4" res="720p" fps="30fps" vcodec="avc1.64001F" acodec="mp4a.40.2" progressive="True" type="video">
2  :  <Stream: itag="137" mime_type="video/mp4" res="1080p" fps="30fps" vcodec="avc1.640028" progressive="False" type="video">
3  :  <Stream: itag="248" mime_type="video/webm" res="1080p" fps="30fps" vcodec="vp9" progressive="False" type="video">
4  :  <Stream: itag="136" mime_type="video/mp4" res="720p" fps="30fps" vcodec="avc1.4d401f" progressive="False" type="video">
5  :  <Stream: itag="247" mime_type="video/webm" res="720p" fps="30fps" vcodec="vp9" progressive="False" type="video">
6  :  <Stream: itag="135" mime_type="video/mp4" res="480p" fps="30fps" vcodec="avc1.4d401f" progressive="False" type="video">
7  :  <Stream: itag="244" mime_type="video/webm" res="480p" fps="30fps" vcodec="vp9" progressive="False" type="video">
8  :  <Stream: itag="134" mime_type="video/mp4" res="360p" fps="30fps" vcodec="avc1.4d401e" progressive="False" type="video">
9  :  <Stream: itag="243" mime_type="video/webm" res="360p" fps="30fps" vcodec="vp9" progressive="False" type="video">
10  :  <Stream: itag="133" mime_type="video/mp4" res="240p" fps="30fps" vcodec="avc1.4d4015" progressive="False" type="video">
11  :  <Stream: itag="242" mime_type="video/webm" res="240p" fps="30fps" vcodec="vp9" progressive="False" type="video">
12  :  <Stream: itag="160" mime_type="video/mp4" res="144p" fps="30fps" vcodec="avc1.4d400c" progressive="False" type="video">
13  :  <Stream: itag="278" mime_type="video/webm" res="144p" fps="30fps" vcodec="vp9" progressive="False" type="video">
14  :  <Stream: itag="140" mime_type="audio/mp4" abr="128kbps" acodec="mp4a.40.2" progressive="False" type="audio">
15  :  <Stream: itag="249" mime_type="audio/webm" abr="50kbps" acodec="opus" progressive="False" type="audio">
16  :  <Stream: itag="250" mime_type="audio/webm" abr="70kbps" acodec="opus" progressive="False" type="audio">
17  :  <Stream: itag="251" mime_type="audio/webm" abr="160kbps" acodec="opus" progressive="False" type="audio">
 고화질, mp4 포맷만 가져오기 : 
0  :  <Stream: itag="137" mime_type="video/mp4" res="1080p" fps="30fps" vcodec="avc1.640028" progressive="False" type="video">
1  :  <Stream: itag="136" mime_type="video/mp4" res="720p" fps="30fps" vcodec="avc1.4d401f" progressive="False" type="video">
2  :  <Stream: itag="135" mime_type="video/mp4" res="480p" fps="30fps" vcodec="avc1.4d401f" progressive="False" type="video">
3  :  <Stream: itag="134" mime_type="video/mp4" res="360p" fps="30fps" vcodec="avc1.4d401e" progressive="False" type="video">
4  :  <Stream: itag="133" mime_type="video/mp4" res="240p" fps="30fps" vcodec="avc1.4d4015" progressive="False" type="video">
5  :  <Stream: itag="160" mime_type="video/mp4" res="144p" fps="30fps" vcodec="avc1.4d400c" progressive="False" type="video">
6  :  <Stream: itag="140" mime_type="audio/mp4" abr="128kbps" acodec="mp4a.40.2" progressive="False" type="audio">
 "itag"를 이용해 특정 stream 선택 :
```



## 채널 데이터 DB에 넣기

> `insert_channel_data.py` 실행
>
> Channel Youtube Id 입력: 채널을 방문했을 때, url에 나오는 값. 가끔 본인들이 설정한 id도 나오는데, 그런 값들은 인식을 잘 못함. 해쉬값으로 찾아서 넣을 것



## 영상 분석 후 DB에 넣기

> 백엔드 서버 실행 후 `video_main.py` 실행
>
> 1. Video 이름 입력: `python video downloader`폴더에 저장된 동영상이름. 확장자까지 넣어줘야함
> 2. Video Youtube Id 입력: 영상을 youtube에서 틀었을 때, url에서 `watch=`뒤에 나오는 값
> 3. Channel Youtube Id 입력: 채널을 방문했을 때, url에 나오는 값. 가끔 본인들이 설정한 id도 나오는데, 그런 값들은 인식을 잘 못함. 해쉬값으로 찾아서 넣을 것
> 4. **DB에 들어있는 채널의 동영상만 가능하니 주의**

```
Video 이름 입력: TEMP_DATA.mp4
Video Youtube Id 입력: QOg7D0bTHO4
Channel Youtube Id 입력: UC_0oo0GPlDUU88ubLDnJkSQ
```





<hr/>



## 영상 정보 받아오기

```python
# video information 실행

from pytube import YouTube

yt = YouTube('https://www.youtube.com/watch?v=V1DEVT--TCE')
# 동영상 링크를 이용해 YouTube 객체 생성

print("영상 제목 : ", yt.title)

print("영상 길이 : ", yt.length)

print("영상 평점 : ", yt.rating)

print("영상 썸네일 링크 : ", yt.thumbnail_url)

print("영상 조회수 : ", yt.views)

print("영상 설명 : ", yt.description)
```





## 영상 자르기

> `video_capture`라는 폴더를 만든 후, 영상 이름을 `video1`로 수정하여 실행
>
> 시간스킵을 하려면 `time_skips` 주석 해제(ms 단위)

```python
# video split by frame 실행

import cv2

vidcap = cv2.VideoCapture('video1.mp4') # 영상 이름 입력
success, image = vidcap.read()

count = 1
success = True

# time_skips = float(2000)  # 건너뛰는 시간

while success:
    success, image = vidcap.read()
    cv2.imwrite("video_capture/%d.jpg" % count, image)
    print("saved image %d.jpg" % count)

    # vidcap.set(cv2.CAP_PROP_POS_MSEC, (count * time_skips))

    if cv2.waitKey(10) == 27:
        break
    count += 1

# vidcap.release()

```







## Darkflow를 사용해서 사진 탐색하기

> 탐색 진행, 사진에 마킹 후 저장

```python
import cv2
from darkflow.net.build import TFNet

# darkflow 옵션
options = {"model": "cfg/my-tiny-yolo.cfg", "load": -1, "threshold": 0.5}
tfnet = TFNet(options)
curr_frame = cv2.imread("./test_pic1.jpg")
results = tfnet.return_predict(curr_frame)
for result in results:
    cv2.rectangle(curr_frame, (result["topleft"]["x"], result["topleft"]["y"]),
                  (result["bottomright"]["x"], result["bottomright"]["y"]), (255, 0, 0), 4)
    text_x, text_y = result["topleft"]["x"] - 10, result["topleft"]["y"] - 10
    cv2.putText(curr_frame, result["label"], (text_x, text_y), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2, cv2.LINE_AA)
cv2.imwrite("video_capture/test.jpg", curr_frame)
```





## Darkflow를 사용해서 비디오 탐색, 라벨 저장

> 탐색 진행 후 캡쳐된 시간과 라벨 위치 출력

```python
import cv2
from darkflow.net.build import TFNet

# darkflow 옵션
options = {"model": "cfg/my-tiny-yolo.cfg", "load": -1, "threshold": 0.5, "gpu": 0.7}
tfnet = TFNet(options)

cap = cv2.VideoCapture('video1.MOV')
timestamps = list()
location_datas = list()

while cap.isOpened():
    frame_exists, curr_frame = cap.read()
    if frame_exists:
        # 프레임 시간 찍기
        capture_time = int(cap.get(cv2.CAP_PROP_POS_MSEC))
        timestamps.append(capture_time)
        results = tfnet.return_predict(curr_frame)
        location_datas.append([capture_time, results])
    else:
        break

cap.release()

print('캡처된 시간', timestamps)
for location_data in location_datas:
    print(location_data)
```



