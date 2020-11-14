import os
import xml.etree.ElementTree as ET

targetDir = r"C:\Users\multicampus\Desktop\data\annotations"

# 내 경로에 있는 모든 파일들 불러오기
# 예) 1.xml, 2.xml ..... 1000.xml
file_list = os.listdir(targetDir)


for file in file_list:
    # 불러온 파일들에 경로를 붙여주기
    # 예) C:\Users\multicampus\오픈CV\data\annotations\panasonic9.xml
    target_path = targetDir + "\\" + file
    # 파일을 읽고 쓰는 형태로 열고 인코딩은 UTF8로 한다.
    targetXML = open(target_path, 'rt', encoding="UTF-8")

    tree = ET.parse(targetXML)
    root = tree.getroot()

    # 수정할 부분을 찾아준다.
    target_tag = root.find("path")

    # 원본 스트링을 저장해준다.
    original = target_tag.text

    # 수정할 텍스트
    modified = original.replace(r"C:\Users\multicampus\Desktop\data\dataset", r"/home/team1/TamTam/data/dataset")
    modified = modified.replace("\\", "/")

    target_tag.text = modified

    tree.write(target_path)
