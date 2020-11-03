import time
from video_darkflow_detection_module import video_darkflow_detection
from video_classify_module import classify_brands_and_products, make_video_exposure_records

test_time = time.time()  # 시작 시간 저장
video_name = 'video2.MOV'

label_object, frame_count, timestamps, video_duration = video_darkflow_detection(video_name)

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

print("time :", time.time() - test_time)  # 현재시각 - 시작시간 = 실행 시간


