from flask import request, url_for
from flask_api import FlaskAPI, status, exceptions
import string
import requests
import re

app = FlaskAPI(__name__)
Dictionary=set(open("words.txt", encoding="utf8").read().split())

# Показване на ненужните запетайки p.s Не работи изобщо добре!
NENUJNA_ZAPTAIKA = False

### CORS section
@app.after_request
def after_request_func(response):
    origin = request.headers.get('Origin')
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Headers', 'x-csrf-token')
        response.headers.add('Access-Control-Allow-Methods',
                            'GET, POST, OPTIONS, PUT, PATCH, DELETE')
        if origin:
            response.headers.add('Access-Control-Allow-Origin', origin)
    else:
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        if origin:
            response.headers.add('Access-Control-Allow-Origin', origin)

    return response
### end CORS section
def format_word(word, reason, correct):
    return '<mark class="popoverOption" data-content="{correct}" rel="popover" data-placement="bottom" data-original-title="{reason}">{word}</mark>'.format(correct=correct, reason=reason, word=word)
def spell_check(data, plain_data):
    print("data", data)
    r = requests.get('https://us-central1-azbuki-ml.cloudfunctions.net/forwardApi/api?pnct=' + plain_data.replace(',', '').replace(' ', '%20'))
    res_list = r.json()
    flag = 0
    offset = 0
    return_data = ""
    prev_word = ""
    for index, word in enumerate(data):
        wword = word.translate(str.maketrans('', '', string.punctuation)).lower()
        # форматиране
        if word == ',' and prev_word == ' ':
            flag = 1
            return_data += format_word(word, "Интервал пред запетая", prev_word + ",")
        if word == ',' and prev_word == ',':
            flag = 1
            return_data += format_word(word, "Две запетаи", ",")
        # правопис
        if len(word) > 1 and wword not in Dictionary:
            flag = 1
            return_data += format_word(word, "Несъществуваща дума", "[option 1, option 2, option 3]")
        # пунтуация
        else:
            if res_list[index+offset] == ',COMMA' and word == ' ' and prev_word[-1] != ",":
                flag = 1
                return_data += format_word(word, "Изпусната запетая", prev_word + ",")
            if res_list[index+offset] != ',COMMA' and word == ' ':
                offset -= 1
                return_data += word 
            else:
                return_data += word       

        prev_word = word
    return [flag, return_data]

@app.route("/", methods=['GET', 'POST'])
def notes_list():
    if request.method == 'POST':
        data = request.data.get('body', '')
        return spell_check(re.split(r'(\s+)', data), data)
    else:
        return "ne iskam get"

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=4000)