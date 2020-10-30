import time
import cv2
from darkflow.net.build import TFNet
from collections import deque

start = time.time()  # 시작 시간 저장


#
def make_timeline(name, times):
    result = []

    queue = deque()
    sum = 0

    for time in times:
        if queue:
            minus = abs(time - queue[-1])
            if minus >= 1000:
                if len(queue) > 1 or sum > 1000:
                    start, end = queue.popleft(), queue[-1]
                    if abs(start - end) > 1000:
                        result.append([start, end])
                queue = deque()
                sum = 0
        queue.append(time)
    if queue:
        if len(queue) > 1 or sum > 1000:
            start, end = queue.popleft(), queue[-1]
            if abs(start - end) > 1000:
                result.append([start, end])
    return result


# darkflow 옵션
options = {"model": "cfg/my-tiny-yolo.cfg", "load": -1, "threshold": 0.5, "gpu": 1.0}
tfnet = TFNet(options)

cap = cv2.VideoCapture('video2.MOV')

label_object = dict()
time_skips, count = float(60), 1  # 건너뛰는 시간

while cap.isOpened():
    capture_time = int(cap.get(cv2.CAP_PROP_POS_MSEC))
    frame_exists, curr_frame = cap.read()
    if frame_exists:
        # print(count, capture_time)
        cap.set(cv2.CAP_PROP_POS_MSEC, (count * time_skips))
        # 프레임 시간 찍기
        results = tfnet.return_predict(curr_frame)
        for result in results:
            # 이미지 데이터 저장
            if not label_object.get(result["label"]):
                label_object[result["label"]] = {capture_time}
            else:
                label_object[result["label"]].add(capture_time)
        # cv2.imwrite("video_capture/%s.jpg" % capture_time, curr_frame)
        count += 1
    else:
        break

cap.release()

# 리스트화 및 정렬
for key, value in label_object.items():
    label_object[key] = sorted(list(value))
    # print(key, label_object[key])
print('등장하는 브랜드와 시간', label_object)
for key, value in label_object.items():
    print(key, make_timeline(key, value))

print("time :", time.time() - start)  # 현재시각 - 시작시간 = 실행 시간
