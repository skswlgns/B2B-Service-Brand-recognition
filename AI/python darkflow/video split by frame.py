import cv2

cap = cv2.VideoCapture('video1.mp4')
# success, image = cap.read()

# time_skips = float(2000)  # 건너뛰는 시간

count, success = 1, True
while success:
    try:
        success, image = cap.read()
        cv2.imwrite("video_capture/%d.jpg" % count, image)
        print("saved image %d.jpg" % count)

        # cap.set(cv2.CAP_PROP_POS_MSEC, (count * time_skips))

        # if cv2.waitKey(10) == 27:
        #     break
        count += 1
    except:
        break

# cap.release()
