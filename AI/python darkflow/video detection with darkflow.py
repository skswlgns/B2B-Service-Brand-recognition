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
        # for result in results:
        #     cv2.rectangle(curr_frame, (result["topleft"]["x"], result["topleft"]["y"]),
        #                   (result["bottomright"]["x"], result["bottomright"]["y"]), (255, 0, 0), 4)
        #     text_x, text_y = result["topleft"]["x"] - 10, result["topleft"]["y"] - 10
        #     cv2.putText(curr_frame, result["label"], (text_x, text_y), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2,
        #                 cv2.LINE_AA)
        location_datas.append([capture_time, results])
        # 사진 저장(해당 부분에서 데이터 분석 시작)
        # cv2.imwrite("video_capture/%s.jpg" % capture_time, curr_frame)
    else:
        break

cap.release()

print('캡처된 시간', timestamps)
for location_data in location_datas:
    print(location_data)
