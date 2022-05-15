import pandas as pd



def arabic_persian(char):
    return char.replace('ي','ی').replace('ك','ک').replace('ك','ک')



def df_arabic_persian(df):
    ddf = df
    for i in ddf.columns:
        for j in ddf.index:
            ddf[i][j] = arabic_persian(ddf[i][j])
    return ddf

def del_ekhtiar(df):
    for i in range(0,9):
        df = df.loc[~df['نماد'].str.contains(f'{str(i)}')]
    return df

