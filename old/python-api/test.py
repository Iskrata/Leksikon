#!pip install deplacy camphr 'unofficial-udify>=0.3.0' en-udify@https://github.com/PKSHATechnology-Research/camphr_models/releases/download/0.7.0/en_udify-0.7.tar.gz
import time
#import pkg_resources,imp
import requests
tic = time.perf_counter()
#imp.reload(pkg_resources)
import spacy

nlp=spacy.load("en_udify")
#doc=nlp("Близкият другар и роднина на Алеко Константинов - радикалдемократът Найчо Цанов който е имал възможност да наблюдава бъдещия писател при едно гостуване на семейството му във Видин, отбелязва нещо.")
doc=nlp("Гладна мечок хоро не играе.")
#doc=nlp("Членуването в българския език преминава през тежък път. Още през 1835 г. билкарят в „Болгарска граматика“ изследва българските говори и въвежда членуването според синтактичната функция на думата в изречението.")
#doc=nlp("Уважаеми клиенти, сока е неохраняем.")

CHLENUVANE = True
FORMA = True

"""
for token in doc:
    print(token.text, token.lemma_, token.pos_, token.tag_, token.dep_,
            token.shape_, token.is_alpha, token.is_stop)
            """
def chlenuvane(doc):
    for token in doc:
        if(token.dep_ == "nsubj"):
            tt = str(token.text).strip()
            r = requests.get('https://us-central1-azbuki-ml.cloudfunctions.net/forwardApi/api?pos=' + tt)
            req_chlen = r.json()[0][0][2]
            if(req_chlen == "Ncmsh"):
                print("ГРЕШНО ЧЛЕНУВАНЕ ПРИ ДУМАТА -> " + token.text)

def right_form(doc):
    for token in doc:
        pass

for token in doc:
    print(token.text, token.dep_, token.head.text, token.head.pos_, token.head.tag_,
            [child for child in token.children])

print('--chlenuvane--')
chlenuvane(doc)
print('--right-form--')
right_form(doc)
toc = time.perf_counter()
print(f"Downloaded the tutorial in {toc - tic:0.4f} seconds")
        
    

#import deplacy
#deplacy.render(doc)
#deplacy.serve(doc,port=None)


# import graphviz
# graphviz.Source(deplacy.dot(doc))