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

