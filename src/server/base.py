from cgi import print_arguments, print_form
from urllib import response
from flask import Flask, request, jsonify, Response
import random
import json
import pymongo
import pandas as pd
from flask_cors import CORS
from melipayamak import Api
from bson import ObjectId

sms = Api('9011010959','@8F20').sms('soap')

client = pymongo.MongoClient()
roundtrade_db = client['roundtrade']
user_colection = roundtrade_db['user']
alarm_collection = roundtrade_db['alarm']


app = Flask(__name__)
CORS(app)


@app.route('/api/validation', methods=["POST"])
def validation():
      data =  request.get_json()
      phone = data['phone']
      user = pd.DataFrame(user_colection.find({'phone':phone}))
      if len(user) ==0:
            validtionCodeSend = random.randint(1000,9999)
            print(validtionCodeSend)
            sundCalling = f'کاربر محترم رُند تِرِید، کد تایید شما {validtionCodeSend} میباشد، تکرار میکنم {validtionCodeSend}'
            textCalling = f'کاربر محترم رندترید، کد تایید شما {validtionCodeSend} میباشد'
            print(textCalling)
            responsCalling = 0 #sms.send_with_speech(data['phone'], '50004001010959' ,textCalling ,sundCalling)
            print(responsCalling)
            response = json.dumps({'register':True, 'msg':'منتظر تماس تایید باشید','validtionCodeSend':validtionCodeSend})
      else:
            response = json.dumps({'register': False, 'msg':'شماره قبلا ثبت شده'})

      return response

@app.route('/api/register', methods=["POST"])
def register():
      data =  request.get_json()
      phone = data['phone']
      password = data['password']
      user = pd.DataFrame(user_colection.find({'phone':phone}))
      if len(user) ==0:
            user_colection.insert_one({'phone':phone, 'password':password})
            return json.dumps({'register':True, 'msg':'ثبت نام تکمیل شد'})
      else:
            return json.dumps({'register':False, 'msg':'شماره قبلا ثبت شده'})

@app.route('/api/login', methods=["POST"])
def login():
      data =  request.get_json()
      phone = data['phone']
      password = data['password']
      user = pd.DataFrame(user_colection.find({'phone':phone}))
      if len(user) > 0:
            if (user['password'][0] == password):
                  return json.dumps({'login':True, 'msg': 'ورود موفق'})
            else:
                  return json.dumps({'login':False, 'msg': 'رمز اشتباه است'})
      else:
            return json.dumps({'login':False, 'msg': 'شماره موبایل ثبت نام نشده'})

@app.route('/api/logincookie', methods=["POST"])
def logincookie():
      data =  request.get_json()
      phone = data['phone']
      user = pd.DataFrame(user_colection.find({'phone':phone}))
      if len(user) > 0:
            return json.dumps({'login':True})
      else:
            return json.dumps({'login':False})



@app.route('/api/forget', methods=["POST"])
def forget():
      data =  request.get_json()
      phone = data['phone']
      user = pd.DataFrame(user_colection.find({'phone':phone}))
      if len(user) >= 1:
            validtionCodeSend = random.randint(1000,9999)
            print(validtionCodeSend)
            sundCalling = f'کاربر محترم رُند تِرِید، کد تایید شما {validtionCodeSend} میباشد، تکرار میکنم {validtionCodeSend}'
            textCalling = f'کاربر محترم رندترید، کد تایید شما {validtionCodeSend} میباشد'
            print(textCalling)
            responsCalling = 0 #sms.send_with_speech(data['phone'], '50004001010959' ,textCalling ,sundCalling)
            print(responsCalling)
            response = json.dumps({'act':True, 'msg':'منتظر تماس تایید باشید','validtionCodeSend':validtionCodeSend})
      else:
            response = json.dumps({'act': False, 'msg':'شماره همراه یافت نشد'})

      return response


@app.route('/api/setnewpass', methods=["POST"])
def setnewpass():
      data =  request.get_json()
      phone = data['phone']
      password = data['password']
      user = pd.DataFrame(user_colection.find({'phone':phone}))
      if len(user) >= 1:
            alarm_collection.delete_one({'phone':phone})
            user_colection.insert_one({'phone':phone, 'password':password})
            return json.dumps({'act':True, 'msg':'رمز عبور تغییر کرد'})
            print(000000000)
      else:
            return json.dumps({'act':False, 'msg':'خطا'})





if __name__ == '__main__':
   app.run(debug=True)