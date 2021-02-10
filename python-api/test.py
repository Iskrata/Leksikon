import requests

def mark(data, index):
    arr = data.split(' ')
    if(index == 0):
        arr[index] = '<mark>' + arr[index] + '</mark>'
    else:
        arr[index-1] += '<mark>'
        arr[index] += '</mark>'
    #print(arr)
    return (" ".join(arr))

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
    print('data - > ', data_list, '\nres - > ', res_list)
    for index, item in enumerate(data_list):
        if index + offset > len(res_list):
            break
        if item == ',COMMA':
            mark_offset -= 1
        if item != res_list[index + offset]:
            if res_list[index + offset] == ',COMMA':
                offset += 1
                print('index:', index, 'offset:', offset)
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

#print(punct_check('Основните елементи в едно изречение, разглеждано от синтаксиса, са подлог, сказуемо, допълнение, определение и обстоятелствено пояснение.'))
print(punct_check('Иван, който беше красив отиде да пазарува.'))