import json

lga = ['ALPINE', 'ARARAT', 'BALLARAT', 'BANYULE', 'BASS COAST', 'BAW BAW', 'BAYSIDE', 'BENALLA', 'BOROONDARA', 'BRIMBANK', 'BULOKE', 'CAMPASPE', 'CARDINIA', 'CASEY', 'CENTRAL GOLDFIELDS', 'COLAC-OTWAY', 'CORANGAMITE', 'DAREBIN', 'EAST GIPPSLAND', 'FRANKSTON', 'GANNAWARRA', 'GLEN EIRA', 'GLENELG', 'GOLDEN PLAINS', 'GREATER BENDIGO', 'GREATER DANDENONG', 'GREATER GEELONG', 'GREATER SHEPPARTON', 'HEPBURN', 'HINDMARSH', 'HOBSONS BAY', 'HORSHAM', 'HUME', 'INDIGO', 'KINGSTON', 'KNOX', 'LATROBE', 'LODDON', 'MACEDON RANGES', 'MANNINGHAM', 'MANSFIELD', 'MARIBYRNONG', 'MAROONDAH', 'MELBOURNE', 'MELTON', 'MILDURA', 'MITCHELL', 'MOIRA', 'MONASH', 'MOONEE VALLEY', 'MOORABOOL', 'MORELAND', 'MORNINGTON PENINSULA', 'MOUNT ALEXANDER', 'MOYNE', 'MURRINDINDI', 'NILLUMBIK', 'NORTHERN GRAMPIANS', 'PORT PHILLIP', 'PYRENEES', 'QUEENSCLIFFE', 'SOUTH GIPPSLAND', 'SOUTHERN GRAMPIANS', 'STONNINGTON', 'STRATHBOGIE', 'SURF COAST', 'SWAN HILL', 'TOWONG', 'WANGARATTA', 'WARRNAMBOOL', 'WELLINGTON', 'WEST WIMMERA', 'WHITEHORSE', 'WHITTLESEA', 'WODONGA', 'WYNDHAM', 'YARRA', 'YARRA RANGES', 'YARRIAMBIACK']
empty = []
list_dict = []
with open("sin_tracker.json",'r') as load_f:
	load_dict = json.load(load_f)

	for each in lga:
		try:
			dict_temp = load_dict[each]
			dict_temp['lga'] = each
			# print(dict_temp)
			list_dict.append(dict_temp)
			
		except Exception as e:
			empty.append(each)

with open('sins_data.json', 'w') as fp:
	json.dump(list_dict, fp)
