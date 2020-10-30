import cv2

cap = cv2.VideoCapture('video1.mp4')
# print(cap.set(cv2.CAP_PROP_FPS, 10))
# fps = cap.get(cv2.CAP_PROP_FPS)
# print(fps)
timestamps = []

while cap.isOpened():
    frame_exists, curr_frame = cap.read()
    if frame_exists:
        # 프레임 시간 찍기
        capture_time = int(cap.get(cv2.CAP_PROP_POS_MSEC))
        timestamps.append(capture_time)
        # 사진 저장(해당 부분에서 데이터 분석 시작)
        cv2.imwrite("video_capture/%s.jpg" % capture_time, curr_frame)
    else:
        break

cap.release()

print('캡처된 시간', timestamps)
