from collections import deque


def classify_brands_and_products(label_object):

    def make_time_group(time_list):

        def make_group(group_frames):
            start, end = group_frames[0], group_frames[-1]
            group_duration = abs(start - end)
            if group_duration > 1000 and (len(group_frames) / (group_duration // 100)) >= 0.5:  # 1초 미만의 그룹이라면 튀는데이터로 처리
                if len(group_frames) > 1:  # {1}프레임짜리 그룹, 1초 미만의 그룹이라면 튀는데이터로 처리
                    return [start, end]
            return None

        result_timeline, queue = [], deque()  # sum을 더해주는 로직이 없음
        time_list = sorted(list(time_list))

        # 각 프레임을 검사하면서 그룹을 만들어주기
        for time in time_list:
            if queue:
                if abs(time - queue[-1]) >= 1000:  # 앞 프레임과 1초이상 차이가 벌어진다면 다른 그룹으로 분리
                    time_group = make_group(queue)
                    if time_group:
                        result_timeline.append(time_group)  # 그룹을 저장
                    queue, time_sum = deque(), 0  # 그룹을 저장한 후 초기화
            queue.append(time)

        # queue에 남아있는 데이터 처리
        if queue:
            time_group = make_group(queue)
            if time_group:
                result_timeline.append(time_group)

        return result_timeline

    tmp_label_object = dict()
    for brand, brand_timestamps in label_object.items():

        brand = brand.split('_')  # brand 값은 리스트로 분리
        brand_timeline = make_time_group(brand_timestamps)  # brand_timestamps 값은 그룹화
        tmp_label_object[brand[0]] = tmp_label_object.get(brand[0], dict())  # 제품과 브랜드를 한 그룹으로 묶어주기
        tmp_brand_dict = tmp_label_object[brand[0]]
        if len(brand) == 1:  # 각 브랜드의 로고면 logo라고 표기
            tmp_brand_dict['logo'] = tmp_brand_dict.get('logo', []) + brand_timeline
        else:  # 각 브랜드의 제품이면 제품이름 표기
            tmp_brand_dict[brand[1]] = tmp_brand_dict.get(brand[1], []) + brand_timeline

    return tmp_label_object


def make_video_exposure_records(key, values, timestamp_index_dict, index_timestamp_dict, frame_count, video_exposure_records):
    # request를 보내 key 기업의 id를 가져오기

    brand_exposure_frame = [set() for _ in range(((frame_count // 100) + 1) * 100)]  # 겹치는 제품이 존재하는지 확인할 프레임 리스트
    for value_name, value_timelines in values.items():
        for timeline in value_timelines:
            for i in range(timestamp_index_dict[timeline[0]], timestamp_index_dict[timeline[1]] + 1):
                brand_exposure_frame[i].add(value_name)  # 각 프레임에 등장한 로고 혹은 제품 적어주기

    # 하나의 그룹으로 묶어서 정리해준다.
    tmp_brand_object = dict(company_name=f'{key}_id', total_exposure_time=0, timelines=list())  # DB에 넣을 객체

    tmp_timeline, flag = [set(), 0, 0], False  # [["로고", "등장 제품"], "시작", "끝"] 형태로 만들기
    for index, brands in enumerate(brand_exposure_frame):
        if brands and not flag:  # 브랜드가 처음 등장했다면 그룹을 시작
            tmp_timeline[0] = brands
            tmp_timeline[1], flag = index_timestamp_dict[index], True

        elif not brands and flag:  # 더이상 브랜드가 등장하지 않는다면 그룹을 끊기
            tmp_timeline[2] = index_timestamp_dict[index - 1]
            tmp_brand_object['timelines'].append(tmp_timeline)
            tmp_timeline, flag = [set(), 0, 0], False

        elif brands and flag:
            tmp_timeline[0].update(brands)

    for timeline in tmp_brand_object['timelines']:  # 브랜드의 총 노출시간 계산해주기
        timeline[0] = list(timeline[0])
        tmp_brand_object['total_exposure_time'] += (timeline[2] - timeline[1])

    video_exposure_records.append(tmp_brand_object)
