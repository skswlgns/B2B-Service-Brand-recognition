import time
from video_darkflow_detection_module import video_darkflow_detection
from video_classification_module import classify_brands_and_products, make_video_exposure_records
from insert_video_data_module import insert_video_data
from input_and_validation_module import input_and_validation

test_time = time.time()  # 시작 시간 저장

# 기본 데이터 입력받기
video_name, video_youtube_id, channel_id, channel_youtube_id, video_information = input_and_validation()

# Darkflow을 이용하여 비디오 분석 단계
label_object, frame_count, timestamps, video_duration = video_darkflow_detection(video_name)

# 검출된 데이터들 정리 단계
timestamp_index_dict = dict(zip(timestamps, [i for i in range(len(timestamps))]))  # 캡쳐시간 - 프레임 dict
index_timestamp_dict = dict(zip([i for i in range(len(timestamps))], timestamps))  # 프레임 - 캡쳐시간 dict
label_object = classify_brands_and_products(label_object)  # 같은 브랜드와 상품을 하나의 dict로 묶기

video_exposure_records = list()  # DB에 넣을 데이터
for brand_name, brand_timeline in label_object.items():  # 같은 브랜드의 로고와 상품을 묶어 DB에 넣을 데이터 만들기
    make_video_exposure_records(brand_name, brand_timeline, timestamp_index_dict, index_timestamp_dict, frame_count,
                                video_exposure_records)

# 브랜드의 노출시간 순서대로 video_exposure_records 정렬해주기
video_exposure_records.sort(key=lambda x: x['total_exposure_time'], reverse=True)
print(video_exposure_records)
insert_video_data(video_exposure_records, channel_id, video_duration, video_information)

print("time :", time.time() - test_time)  # 현재시각 - 시작시간 = 실행 시간
