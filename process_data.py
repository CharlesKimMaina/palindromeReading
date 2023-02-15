import sys
import json

filename = sys.argv[1]

with open(filename) as f:
    data = json.load(f)

# Process the data here

print("This is the data", data)
