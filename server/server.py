from flask import Flask
from flask import request

import urllib2

app = Flask(__name__)

BASE_URL = (
	'https://api.forecast.io/forecast/'
	'97aa234cb4320192e0964f6c9bb9ffda/{0},{1}'
)

@app.route('/services/weather')
def get_weather():
	latitude = request.args.get('latitude', '')
	longitude = request.args.get('longitude', '')
	if latitude == '' or longitude == '':
		return ''
	url = BASE_URL.format(latitude, longitude);
	response = urllib2.urlopen(url)
	return response.read()

if __name__ == '__main__':
	app.run()
