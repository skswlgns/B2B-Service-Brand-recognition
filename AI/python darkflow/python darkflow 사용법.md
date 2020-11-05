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





## Darkflow를 사용해서 비디오 분석, 분석 데이터 DB에 저장

> 해당 3가지 정보를 입력하면 자동으로 저장됨

```
Video 이름 입력: 저장된 영상 이름 입력
Video Youtube Id 입력: 영상 youtube id 입력(유뷰트 영상 url에 표시, v=youtube_id)
Channel Youtube Id 입력: 채널 youtube id 입력(유튜브 채널 url에 표시)
```



