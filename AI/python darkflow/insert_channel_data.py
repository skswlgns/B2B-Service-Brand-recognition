import requests
from API_ENV import YOUTUBE_API_URL, YOUTUBE_API_KEY, TAMTAM_API_URL, TAMTAM_API_KEY

'''
GET: response = requests.get(url=URL, params=params)
POST: response = requests.get(url=URL, data=data, headers=headers, json=json)
response.request
response.status_code
response.raise_for_status()
response.json()
response.url
response.text
'''

print('Youtube Channel Id 입력: ', end='')
youtube_channel_id = input()

url = f'{YOUTUBE_API_URL}/channels'
params = {
    'key': YOUTUBE_API_KEY,
    'part': 'snippet,id,statistics',
    'id': youtube_channel_id,
}
response = requests.get(url=url, params=params)

print(response.text)

headers = {
    'company_id': f'{TAMTAM_API_KEY}'
}
data = {
    "channel_name": f"{response.json()['items'][0]['snippet']['title']}",
    "channel_subscribe": f"{response.json()['items'][0]['statistics']['subscriberCount']}",
    "channel_email": f"{response.json()['items'][0]['snippet']['title']}@naver.com",
    "channel_img": f"{response.json()['items'][0]['snippet']['thumbnails']['medium']['url']}",
    "channel_video_cnt": f"{response.json()['items'][0]['statistics']['videoCount']}",
    "channel_youtube_id": f"{response.json()['items'][0]['id']}"
}
print(data)
response = requests.post(url=f'{TAMTAM_API_URL}/channel', headers=headers, json=data)
print(response.text)
response.raise_for_status()
