#!/bin/bash
NAME="Parsley"
LOCATION="Plot"
PLANTTYPE="Herb"

API="http://localhost:4741"
URL_PATH="/plants"
TOKEN="c7326a5c57d5896c8966d165257eb771"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "plant": {
      "name": "'"${NAME}"'",
      "location": "'"${LOCATION}"'",
      "plantType": "'"${PLANTTYPE}"'"
    }
  }'

echo
