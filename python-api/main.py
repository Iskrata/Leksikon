from flask import request, url_for
from flask_api import FlaskAPI, status, exceptions

app = FlaskAPI(__name__)

def mark(data, index):
    arr = data.split(' ')
    #print(arr)
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
            return_data += 'Не може да има интервал преди заптая. -> ' + text + '<br>'
        if item == ',' and last_item == ',':
            text = mark(data, i)
            flag = 1
            return_data += 'Не може да има две запетайки една след друга. -> ' + text + '<br>'
        last_item = item
        if item == ' ':
            i += 1
    if flag == 1:
        return [1, return_data]
    return[0]



@app.route("/", methods=['GET', 'POST'])
def notes_list():
    if request.method == 'POST':
        return spell_check(request.data.get('body', '')), status.HTTP_201_CREATED

    # request.method == 'GET'
    return 'po'


if __name__ == "__main__":
    app.run(debug=True)