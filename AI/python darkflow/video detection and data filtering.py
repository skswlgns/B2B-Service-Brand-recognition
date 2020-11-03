import time
import cv2
from darkflow.net.build import TFNet
from collections import deque
from module import classify_brands_and_products, make_video_exposure_records

test_time = time.time()  # 시작 시간 저장


# darkflow 옵션
options = {"model": "cfg/my-tiny-yolo.cfg", "load": -1, "threshold": 0.1, "gpu": 1.0}
tfnet = TFNet(options)
cap = cv2.VideoCapture('N30g_wdupuA.mp4')

video_duration = cap.get(cv2.CAP_PROP_FRAME_COUNT) / cap.get(cv2.CAP_PROP_FPS)  # 동영상 총 시간

label_object, frame_count, timestamps = dict(), 0, []
while cap.isOpened():
    capture_time = int(cap.get(cv2.CAP_PROP_POS_MSEC))                      # 프레임이 캡쳐된 시간
    frame_exists, curr_frame = cap.read()                                   # 해당 프레임 존재여부, 해당 프레임 이미지 객체
    if capture_time < 0:                                                    # 시간이 음수로 나오는 경우 제외(튀는 데이터)
        continue
    elif frame_exists:                                                      # 동영상 프레임이 존재하면
        if not frame_count % 3:                                             # 프레임 3개 단위로 검사
            timestamps.append(capture_time)                                 # 프레임 시간 저장하기
            results = tfnet.return_predict(curr_frame)                      # 분석하기
            for result in results:                                          # 이미지 데이터 저장
                if not label_object.get(result["label"]):                   # 등장하지 않았던 브랜드라면
                    label_object[result["label"]] = {capture_time}          # 새로 set을 만들어 넣어줌
                else:                                                       # 기존에 등장했던 브랜드라면
                    label_object[result["label"]].add(capture_time)         # 기존의 set에 추가
            # cv2.imwrite("video_capture/%s.jpg" % capture_time, curr_frame)  # 이미지 저장
        frame_count += 1
    else:                                                                   # 동영상이 끝나면 while문 탈출
        break
cap.release()

timestamp_index_dict = dict(zip(timestamps, [i for i in range(len(timestamps))]))  # 캡쳐시간 - 프레임 dict
index_timestamp_dict = dict(zip([i for i in range(len(timestamps))], timestamps))  # 프레임 - 캡쳐시간 dict

label_object = classify_brands_and_products(label_object)  # 같은 브랜드와 상품을 하나의 dict로 묶기

'''
"video_record": [
    {
        "company_id": "삼성_id",
        "total_exposure_time": "초단위 시간",
        "timelines": [
            [["로고", "등장 제품"], "시작", "끝"],
            [["로고", "등장 제품"], "시작", "끝"]
        ]
    }
]
'''

video_exposure_records = list()  # DB에 넣을 데이터
for brand_name, brand_timeline in label_object.items():  # 같은 브랜드의 로고와 상품을 묶어 DB에 넣을 데이터 만들기
    make_video_exposure_records(brand_name, brand_timeline, timestamp_index_dict, index_timestamp_dict, frame_count, video_exposure_records)

# 브랜드의 노출시간 순서대로 video_exposure_records 정렬해주기
video_exposure_records.sort(key=lambda x: x['total_exposure_time'], reverse=True)
print(video_exposure_records)


# 추가로 구현해야 할 것들
# youtube api를 이용해서 동영상의 정보 받아와야 함
# request를 이용해서 기업의 id 받아오기
# request를 이용해서 video 데이터 삽입하기
# 함수들 파일 분리하기

print("time :", time.time() - test_time)  # 현재시각 - 시작시간 = 실행 시간


