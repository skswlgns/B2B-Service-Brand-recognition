import requests

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

URL = 'https://www.googleapis.com/youtube/v3/channels?key=AIzaSyBQbAtGm7FHazDtqEv7xsyyDmU31k-kzyI&part=snippet,id,statistics&id=UCdUcjkyZtf-1WJyPPiETF1g'
response = requests.get(url=URL, params=None, )

print(response.json())
print(response.text)

headers = {
    'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55X2VtYWlsIjoiYWRtaW5AbmF2ZXIuY29tIiwiaWF0IjoxNjA0MjA0MjgyLCJleHAiOjE2MDQyOTA2ODJ9.M1Me5Blcr2pMh8FhuxrkwemQZSRwgWKdgWdmd60h20o',
    'company_id': '5f9ea11d39a42e4d1c921461'
}
data = {
    "channel_name": f"{response.json()['items'][0]['snippet']['title']}",
    "channel_subscribe": f"{response.json()['items'][0]['statistics']['subscriberCount']}",
    "channel_email": "abcd@naver.com",
    "channel_img": f"{response.json()['items'][0]['snippet']['thumbnails']['medium']['url']}",
    "channel_video_cnt": f"{response.json()['items'][0]['statistics']['videoCount']}",
    "channel_youtube_id": f"{response.json()['items'][0]['id']}"
}
print(data)
response = requests.post(url='http://localhost:3000/api/channel', headers=headers, json=data)
print(response.text)
response.raise_for_status()
