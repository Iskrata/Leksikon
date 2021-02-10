from flask import request, url_for
from flask_api import FlaskAPI, status, exceptions
import string
import requests

app = FlaskAPI(__name__)
Dictionary=set(open("words.txt", encoding="utf8").read().split())

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

def mark(data, index):
    arr = data.split(' ')
    if(index == 0):
        arr[index] = '<mark>' + arr[index] + '</mark>'
    else:
        arr[index-1] += '<mark>'
        arr[index] += '</mark>'
    #print(arr)
    return (" ".join(arr))

def spell_check(data):
    last_item = ''
    i = 0
    flag = 0
    return_data = ''
    for item in data:
        if item == ',' and last_item == ' ':
            text = mark(data, i)
            flag = 1
            return_data += 'Не може да има интервал преди запeтайка. -> ' + text + '<br>'
        if item == ',' and last_item == ',':
            text = mark(data, i)
            flag = 1
            return_data += 'Не може да има две запетайки една след друга. -> ' + text + '<br>'
        last_item = item
        if item == ' ':
            i += 1
    if flag == 1:
        return [1, return_data]
    return[0, '']

def word_check(data):
    #data_list = data.replace(',', '').lower().split()
    data_list = data.translate(str.maketrans('', '', string.punctuation)).lower().split()
    flag = 0
    return_data = ''
    for index, word in enumerate(data_list):
        if(word not in Dictionary):
            text = mark(data, index)
            flag = 1
            return_data += 'Несъществуваща дума -> ' + text + '<br>'
    if flag == 1:
        return [1, return_data]
    return [0, '']

def punct_check(data):
    r = requests.get('https://us-central1-azbuki-ml.cloudfunctions.net/forwardApi/api?pnct=' + data.replace(',', '').replace(' ', '%20'))
    res_list = r.json()
    data_list = data.replace(',', ' ,COMMA').replace('.', '').split()
    flag = 0
    return_data = ''

    # [tova che go ,COMMA kaza mi napomni]
    # [ tova che go kaza mi napomni]
    offset = 0
    mark_offset = 0
    #print('data - > ', data_list, '\nres - > ', res_list)
    for index, item in enumerate(data_list):
        if index + offset > len(res_list):
            break
        if item == ',COMMA':
            mark_offset -= 1
        if item != res_list[index + offset]:
            if res_list[index + offset] == ',COMMA':
                offset += 1
                #print('index:', index, 'offset:', offset)
                text = mark(data, index + mark_offset)
                flag = 1
                return_data += 'Изпусната е запетайка -> ' + text + '<br>'
            if item == ',COMMA':
                offset -= 1
                text = mark(data, index + mark_offset)
                flag = 1
                return_data += 'Ненужна запетайка -> ' + text + '<br>'     
            else:
                print("Unhandled error: Invalid symbol at punct_check() - ", item, res_list[index+offset])
                
    if flag == 1:
        return [1, return_data]
    return [0, '']

@app.route("/", methods=['GET', 'POST'])
def notes_list():
    if request.method == 'POST':
        spell_check_resp = spell_check(request.data.get('body', ''))
        word_check_resp = word_check(request.data.get('body', ''))
        punct_check_resp = punct_check(request.data.get('body', ''))
       
        resp = [spell_check_resp[0] or word_check_resp[0] or punct_check_resp[0], spell_check_resp[1] + word_check_resp[1] + punct_check_resp[1]]
        return resp, status.HTTP_201_CREATED

    # request.method == 'GET'
    return 'ne iskam get'


if __name__ == "__main__":
    app.run(debug=True)

# TODO: razkarai unhandled error