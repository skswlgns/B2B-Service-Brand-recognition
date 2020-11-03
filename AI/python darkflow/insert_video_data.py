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

URL = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBQbAtGm7FHazDtqEv7xsyyDmU31k-kzyI&part=id, snippet, statistics&id=N30g_wdupuA'
response = requests.get(url=URL, params=None, )

print(response.json())
print(response.text)

headers = {
    'company_id': '5f9ea11d39a42e4d1c921461'
}
body = {
    "video_url": f"{response.json()['items'][0]['id']}",
    "channel_id": "5fa026db864b294be4dc2bd2",
    "video_youtube_id": f"{response.json()['items'][0]['id']}",
    "video_title": f"{response.json()['items'][0]['snippet']['title']}",
    "video_content": f"{response.json()['items'][0]['snippet']['description']}",
    "video_views": f"{response.json()['items'][0]['statistics']['viewCount']}",
    "video_like": f"{response.json()['items'][0]['statistics']['likeCount']}",
    "video_dislike": f"{response.json()['items'][0]['statistics']['dislikeCount']}",
    "video_date": f"{response.json()['items'][0]['snippet']['publishedAt']}",
    "video_record": [{'company_name': 'apple_id', 'total_exposure_time': 148749, 'timelines': [[['logo'], 10343, 12145], [['logo'], 13847, 15148], [['logo'], 18752, 29212], [['logo'], 37420, 42425], [['logo'], 46930, 50533], [['logo'], 72355, 74257], [['logo'], 88271, 90673], [['logo'], 110944, 113897], [['logo'], 185018, 186719], [['logo'], 243576, 246179], [['logo'], 254837, 256139], [['logo'], 306489, 307840], [['logo'], 326709, 329862], [['logo'], 333666, 335268], [['logo'], 361094, 363196], [['logo'], 372355, 378611], [['logo'], 404487, 406089], [['logo'], 413596, 415448], [['logo'], 442725, 449482], [['logo'], 485968, 487470], [['logo'], 515348, 516949], [['logo'], 620152, 621604], [['logo'], 668250, 669902], [['logo'], 690623, 694276], [['logo'], 696679, 698431], [['logo'], 703686, 707139], [['logo'], 712344, 714397], [['logo'], 725708, 730513], [['logo'], 735367, 739271], [['logo'], 740523, 757740], [['logo'], 764647, 769351], [['logo'], 777910, 779662], [['logo'], 786268, 807239], [['logo'], 808390, 826959]]}, {'company_name': 'sony_id', 'total_exposure_time': 102936, 'timelines': [[['logo'], 0, 1034], [['logo'], 6790, 8041], [['logo'], 20303, 23106], [['logo'], 24958, 25959], [['logo'], 38021, 40023], [['logo'], 50333, 53737], [['logo'], 68902, 71254], [['logo'], 144077, 145428], [['logo'], 164097, 165298], [['logo'], 241074, 243476], [['logo'], 254087, 255638], [['logo'], 298231, 305138], [['logo'], 307840, 309642], [['logo'], 335018, 336669], [['logo'], 390073, 393176], [['logo'], 475858, 477260], [['logo'], 478411, 480313], [['logo'], 517200, 518851], [['logo'], 583015, 584567], [['logo'], 614947, 616048], [['logo'], 625658, 627610], [['logo'], 690623, 694276], [['logo'], 696679, 698431], [['logo'], 703686, 707139], [['logo'], 712344, 714397], [['logo'], 735367, 737169], [['logo'], 740523, 741524], [['logo'], 746128, 749482], [['logo'], 753085, 757740], [['logo'], 761994, 763646], [['logo'], 764647, 769351], [['logo'], 777910, 780463], [['logo'], 786268, 798130], [['logo'], 808290, 810092], [['logo'], 811694, 826959]]}, {'company_name': 'nike_id', 'total_exposure_time': 40140, 'timelines': [[['logo'], 138171, 139622], [['logo'], 438821, 440923], [['logo'], 473906, 475808], [['logo'], 485768, 487970], [['logo'], 489472, 492425], [['logo'], 513045, 515298], [['logo'], 541824, 547179], [['logo'], 551384, 556239], [['logo'], 557840, 564196], [['logo'], 634667, 635768], [['logo'], 691023, 692725], [['logo'], 729762, 731814], [['logo'], 735367, 736619], [['logo'], 764747, 769351]]}, {'company_name': 'fila_id', 'total_exposure_time': 16399, 'timelines': [[['logo'], 0, 1034], [['logo'], 181915, 182916], [['logo'], 228061, 231164], [['logo'], 298231, 305138], [['logo'], 413746, 415498], [['logo'], 606439, 609041]]}, {'company_name': 'guess_id', 'total_exposure_time': 13163, 'timelines': [[['logo'], 60243, 63396], [['logo'], 98982, 100083], [['logo'], 274857, 278911], [['logo'], 431364, 432615], [['logo'], 629362, 631464], [['logo'], 761994, 763496]]}, {'company_name': 'philips_id', 'total_exposure_time': 11963, 'timelines': [[['logo'], 33616, 35969], [['logo'], 200633, 203036], [['logo'], 390823, 391924], [['logo'], 621654, 624807], [['logo'], 734216, 735317], [['logo'], 769401, 771253]]}, {'company_name': 'comdegarson_id', 'total_exposure_time': 4154, 'timelines': [[['logo'], 203086, 205889], [['logo'], 211945, 213296]]}, {'company_name': 'kangol_id', 'total_exposure_time': 3903, 'timelines': [[['logo'], 335018, 337870], [['logo'], 364047, 365098]]}, {'company_name': 'cuckoo_id', 'total_exposure_time': 1502, 'timelines': [[['logo'], 183466, 184968]]}, {'company_name': 'samsung_id', 'total_exposure_time': 1452, 'timelines': [[['buzz'], 349582, 351034]]}, {'company_name': 'adidas_id', 'total_exposure_time': 0, 'timelines': []}],
    "video_thumbnails": f"{response.json()['items'][0]['snippet']['thumbnails']['medium']['url']}",
    "video_time": 0,
    "video_category": "IT"
}

print(body)
response = requests.post(url='http://localhost:3000/api/video', headers=headers, json=body)
print(response.text)
response.raise_for_status()
