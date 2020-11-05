import cv2
from darkflow.net.build import TFNet


def video_darkflow_detection(video_name):
    try:
        options = {'model': 'cfg/my-tiny-yolo.cfg', 'load': -1, 'threshold': 0.1, 'gpu': 1.0}
        tfnet = TFNet(options)
        cap = cv2.VideoCapture(video_name)

        video_duration = cap.get(cv2.CAP_PROP_FRAME_COUNT) / cap.get(cv2.CAP_PROP_FPS)  # 동영상 총 시간

        tmp_brand_dict, count, tmp_timestamps = dict(), 0, []
        while cap.isOpened():
            capture_time = int(cap.get(cv2.CAP_PROP_POS_MSEC))  # 프레임이 캡쳐된 시간
            frame_exists, curr_frame = cap.read()  # 해당 프레임 존재여부, 해당 프레임 이미지 객체
            if capture_time < 0:  # 시간이 음수로 나오는 경우 제외(튀는 데이터)
                continue
            elif frame_exists:  # 동영상 프레임이 존재하면
                if not count % 3:  # 프레임 3개 단위로 검사
                    tmp_timestamps.append(capture_time)  # 프레임 시간 저장하기
                    results = tfnet.return_predict(curr_frame)  # 분석하기
                    for result in results:  # 이미지 데이터 저장
                        if not tmp_brand_dict.get(result['label']):  # 등장하지 않았던 브랜드라면
                            tmp_brand_dict[result['label']] = {capture_time}  # 새로 set을 만들어 넣어줌
                        else:  # 기존에 등장했던 브랜드라면
                            tmp_brand_dict[result['label']].add(capture_time)  # 기존의 set에 추가
                    # cv2.imwrite("video_capture/%s.jpg" % capture_time, curr_frame)  # 이미지 저장
                count += 1
            else:  # 동영상이 끝나면 while문 탈출
                break
        cap.release()
        return tmp_brand_dict, count, tmp_timestamps, video_duration

    except:
        print('ERROR: Video 분석에 실패하였습니다.')
        exit()
