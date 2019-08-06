#!/bin/bash
NAME="Parsley"
PLANTTYPE="Herb"

API="http://localhost:4741"
URL_PATH="/plots"
TOKEN="c71514ecddbaac532a9b27cdba875fc1"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "plot": {
      "name": "'"${NAME}"'",
      "plantType": "'"${PLANTTYPE}"'"
    }
  }'

echo
