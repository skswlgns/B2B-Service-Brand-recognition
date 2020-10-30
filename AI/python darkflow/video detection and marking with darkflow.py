import cv2
from darkflow.net.build import TFNet

# darkflow 옵션
options = {"model": "cfg/my-tiny-yolo.cfg", "load": -1, "threshold": 0.5}
tfnet = TFNet(options)

cap = cv2.VideoCapture('video2.MOV')
timestamps = list()
location_datas = list()
label_object = dict()

while cap.isOpened():
    capture_time = int(cap.get(cv2.CAP_PROP_POS_MSEC))
    frame_exists, curr_frame = cap.read()
    if frame_exists:
        # 프레임 시간 찍기
        timestamps.append(capture_time)
        results = tfnet.return_predict(curr_frame)
        for result in results:
            # 이미지에 라벨 마킹하기
            cv2.rectangle(curr_frame, (result["topleft"]["x"], result["topleft"]["y"]),
                          (result["bottomright"]["x"], result["bottomright"]["y"]), (255, 0, 0), 4)
            text_x, text_y = result["topleft"]["x"] - 10, result["topleft"]["y"] - 10
            cv2.putText(curr_frame, result["label"], (text_x, text_y), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2, cv2.LINE_AA)

            # 이미지 데이터 저장
            if not label_object.get(result["label"]):
                label_object[result["label"]] = [capture_time]
            else:
                label_object[result["label"]].append(capture_time)





        location_datas.append([capture_time, results])
        # 사진 저장(해당 부분에서 데이터 분석 시작)
        # cv2.imwrite("video_capture/%s.jpg" % capture_time, curr_frame)
    else:
        break

cap.release()

print('캡처된 시간', timestamps)
print('등장하는 브랜드와 시간', label_object)
for key, value in label_object.items():
    print(key, value)
# for location_data in location_datas:
#     print(location_data)
