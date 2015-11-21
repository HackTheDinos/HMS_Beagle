#!/usr/bin/python

import sys
import csv
import re
import json

def main(args):
    fname = args[0]
    data = {"cards": []}
    with open(fname, 'r') as csvfile:
        reader = csv.reader(csvfile)
        reader.next()
        for i, row in enumerate(reader):
            data["cards"].append(row_to_data(i, row))
    print json.dumps(data)

def row_to_data(i, row):
    return {
        "id": i,
        "type": get_type(row),
        "name": clean(row[0]),
        "img": "",
        "level": make_int(row[5]), 
        "points": make_int(row[7]), 
        "periods": get_periods(row[6]),
        "terrain": get_terrain(row[2], row[3], row[4]),
        "flight": get_flight(row[10]), 
        "description": clean(row[12]),
        "play": get_play(row[10]),
        "effect": get_play(row[10]),
        "extinct": get_extinct(row[18])
    }

def get_type(row):
    if clean(row[0]) == "home":
        return "home"
    if clean(row[6]) == "n/a":
        return "event"
    return "species"

def get_periods(periods):
    text = clean(periods)
    if text == "n/a":
        return []
    return text.split("/")

def get_terrain(ocean, fresh_water, land):
    terrains = []
    if clean(ocean) == "x":
        terrains.append("ocean")
    if clean(fresh_water) == "x":
        terrains.append("fresh_water")
    if clean(land) == "x":
        terrains.append("land")
    return terrains

def get_flight(effects):
    flight_match = re.search("Flight: (\d)", clean(effects))
    if flight_match:
        return int(flight_match.group(1))
    return 0

def get_play(effects):
    match = re.search("(play|special restriction): (.+)", clean(effects))
    if match:
        return clean(match.group(2))
    return ""
    
def get_effect(effects):
    match = re.search("effect: (.+)", clean(effects))
    if match:
        return clean(match.group(1))
    return ""
    
def get_extinct(extinct):
    text = clean(extinct)
    if text == "extinct":
        return True
    return False

def clean(string):
    return string.strip().lower()

def make_int(string):
    try:
        return int(string)
    except ValueError:
        return None

if __name__ == "__main__":
    main(sys.argv[1:])

