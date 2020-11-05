import requests
from API_ENV import YOUTUBE_API_URL, YOUTUBE_API_KEY, TAMTAM_API_URL, TAMTAM_API_KEY
from video_category import video_category


def insert_video_data(video_exposure_records, channel_id, video_duration, video_information):
    # company_id_dict 만들기
    company_id_dict = dict()
    url = f'{TAMTAM_API_URL}/company'
    headers = {'company_id': TAMTAM_API_KEY}
    response = requests.get(url=url, headers=headers)
    for res in response.json():
        company_id_dict[res['company_nickname']] = res['_id']

    # company_nickname을 company_id로 바꿔주기
    for record in video_exposure_records:
        record['company_id'] = company_id_dict[record['company_id']]

    # 넣어줄 데이터 만들기
    headers = {
        'company_id': f'{TAMTAM_API_KEY}'
    }
    body = {
        'video_url': f"https://www.youtube.com/watch?v={video_information.json()['items'][0]['id']}",
        'channel_id': channel_id,
        'video_youtube_id': f"{video_information.json()['items'][0]['id']}",
        'video_title': f"{video_information.json()['items'][0]['snippet']['title']}",
        'video_content': f"{video_information.json()['items'][0]['snippet']['description']}",
        'video_views': f"{video_information.json()['items'][0]['statistics']['viewCount']}",
        'video_like': f"{video_information.json()['items'][0]['statistics']['likeCount']}",
        'video_dislike': f"{video_information.json()['items'][0]['statistics']['dislikeCount']}",
        'video_date': f"{video_information.json()['items'][0]['snippet']['publishedAt']}",
        'video_record': video_exposure_records,
        'video_thumbnails': f"{video_information.json()['items'][0]['snippet']['thumbnails']['medium']['url']}",
        'video_time': video_duration,
        'video_category': f"{video_category[video_information.json()['items'][0]['snippet']['categoryId']]}",
    }
    print(body)

    success = requests.post(url=f'{TAMTAM_API_URL}/video', headers=headers, json=body)
    print(success.text)
    success.raise_for_status()

