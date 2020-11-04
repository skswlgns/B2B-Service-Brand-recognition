import requests
from API_ENV import YOUTUBE_API_URL, YOUTUBE_API_KEY, TAMTAM_API_URL, TAMTAM_API_KEY


def input_and_validation():
    print('Video 이름 입력: ', end='')
    video_name = input()
    if not video_name:
        print('ERROR: Video 이름이 입력되지 않았습니다.')
        exit()

    print('Video Youtube Id 입력: ', end='')
    video_youtube_id = input()
    if not video_youtube_id:
        print('ERROR: Video Youtube Id가 입력되지 않았습니다.')
        exit()

    print('Channel Youtube Id 입력: ', end='')
    channel_youtube_id = input()
    if not channel_youtube_id:
        print('ERROR: Channel Youtube Id가 입력되지 않았습니다.')
        exit()

    # channel_youtube_id로 channel_id 찾기
    url = f'{TAMTAM_API_URL}/channel/youtube/{channel_youtube_id}'
    headers = {'company_id': TAMTAM_API_KEY}
    channel_information = requests.get(url=url, headers=headers)
    if not channel_information.json():
        print('ERROR: Channel Youtube Id 정보가 잘못되었습니다.')
        exit()
    channel_id = channel_information.json()[0]['_id']

    # Youtube API: 비디오 정보 확인
    url = f'{YOUTUBE_API_URL}/videos'
    params = {
        'key': YOUTUBE_API_KEY,
        'part': 'id, snippet, statistics',
        'id': video_youtube_id,
    }
    video_information = requests.get(url=url, params=params)
    if not video_information.json():
        print('ERROR: Video Youtube Id 정보가 잘못되었습니다.')
        exit()
    print(video_information.json())

    return video_name, video_youtube_id, channel_id, channel_youtube_id, video_information
