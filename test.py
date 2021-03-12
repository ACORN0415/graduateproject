# riss.kr 에서 특정 키워드로 논문 / 학술 자료 검색하기

#Step.1 필요한 모듈을 로딩합니다.
from selenium import webdriver
import time

#step .2 사용자에게 검색 관련 정보들을 입력받습니다.
print("=" *100)
print(" 이 크롤러는 RISS 사이트의 논문 및 학술자료 수집용 웹크롤러입니다")
print("=" *100)
query_txt = input('1. 수집할 자료의 키워드는 무엇입니까?(여러개일 경우 , 로 구분하여 입력):')
#query_txt = '해양자원, 도시재생'
print("\n")

#Step.3, 크롬 드라이버 설정 및 웹 페이지 열기
chrome_path = "c:/temp/chromedriver_85/chromedriver.exe"
driver = webdriver.Chrome(chrome_path)

url = 'http://www.riss.kr'
driver.get(url)
time.sleep(2)

#Step 4 자동으로 검색어 입력 후 조회하기
element = driver.find_element_by_id("query")
driver.find_element_by_id("query").click()
element.send_keys("\n")
