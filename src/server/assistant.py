import pandas as pd
import requests
from io import BytesIO
from pymongo import MongoClient
import time

client = MongoClient()  
tablo_db = client['roundtrade']['tablo']

def arabic_persian(char):
    return char.replace('ي','ی').replace('ك','ک')

def df_arabic_persian(df):
    ddf = df
    for i in ['نام', 'نماد']:
        for j in ddf.index:
            ddf[i][j] = arabic_persian(ddf[i][j])
    return ddf

def del_ekhtiar(df):
    for i in range(0,9):
        df = df.loc[~df['نماد'].str.contains(f'{str(i)}')]
    return df

def getTablo():
    tablo = requests.get('http://members.tsetmc.com/tsev2/excel/MarketWatchPlus.aspx?d=0&format=0')
    df = pd.read_excel(BytesIO(tablo.content),header=2)
    df['ns'] = time.time_ns()
    return df

def to_db(df):
    df = df.to_dict(orient='records')
    tablo_db.insert_many(df)

def market_opening():
    start = [8,45]
    end = [12,30]
    t = time.localtime()
    if t.tm_hour<start[0] and t.tm_hour>end[0]+1:
        loop = False
    elif t.tm_hour==start[0] and t.tm_min<start[1]:
        loop = False
    elif t.tm_hour == end[0] and t.tm_min >end[1]:
        loop = False
    else:
        loop = True
    return loop


