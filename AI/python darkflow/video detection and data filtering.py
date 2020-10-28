import cv2
from darkflow.net.build import TFNet

# darkflow 옵션
options = {"model": "cfg/my-tiny-yolo.cfg", "load": -1, "threshold": 0.5}
tfnet = TFNet(options)

cap = cv2.VideoCapture('video2.MOV')

label_object = dict()
time_skips, count = float(60), 1  # 건너뛰는 시간

while cap.isOpened():
    capture_time = int(cap.get(cv2.CAP_PROP_POS_MSEC))
    frame_exists, curr_frame = cap.read()
    if frame_exists:
        print(count, capture_time)
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
    print(key, label_object[key])
print('등장하는 브랜드와 시간', label_object)
