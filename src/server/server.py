import assistant as ass
import time

while True:
    o = ass.market_opening()
    print(o)
    if(o==False):
        time.sleep(60*3)
    while o:
        o = ass.market_opening()
        ass.to_db(ass.del_ekhtiar(ass.df_arabic_persian(ass.getTablo())))
        print('q1')
        time.sleep(60)