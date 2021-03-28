from selenium import webdriver
from time import sleep

browser = webdriver.Firefox()
browser.implicitly_wait(5)

browser.get('https://slovored.com/spellchecker/')
dom = driver.find_element_by_xpath('//*')

text_box = dom.find_element_by_name('word')
submit_button = dom.find_element_by_name('submit')

text_box.send_keys('Незнам как се пише')
submit_button.click()

sleep(5)
result = dom.find_element_by_name('word')


# TODO:
# Extension ; Back-end-spelling; Back-end-grammer
# Website