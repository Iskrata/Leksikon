#!pip install deplacy spacy-udpipe
import spacy_udpipe
from time import sleep

#spacy_udpipe.download("bg")
nlp=spacy_udpipe.load("bg")
doc=nlp("Гладна мечка хоро не играе.")


# import deplacy
# deplacy.render(doc)
# deplacy.serve(doc,port=None)

# import graphviz
# graphviz.Source(deplacy.dot(doc))