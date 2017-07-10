#!/bin/bash  
# Purpose of this script is to clean moose database and create some tranactions

if [ -z "$1" ]
  then
    echo "One required argument missing: path to folder with MooseCoin core app.js"
    exit 1
fi

pwd=`pwd`
cd $1
forever stop app.js
dropdb moose_test && createdb moose_test
forever start app.js
sleep 5
cd $pwd

for i in {1..20}
do 
  curl -k -H "Content-Type: application/json" -X PUT -d '{"secret":"wagon stock borrow episode laundry kitten salute link globe zero feed marble","amount":'"$i"000000000',"recipientId":"537318935439898807M"}' http://localhost:4000/api/transactions
  echo ''
done
  curl -k -H "Content-Type: application/json" -X PUT -d '{"secret":"wagon stock borrow episode laundry kitten salute link globe zero feed marble","amount":'10000000000',"recipientId":"544792633152563672M"}' http://localhost:4000/api/transactions
  curl -k -H "Content-Type: application/json" -X PUT -d '{"secret":"wagon stock borrow episode laundry kitten salute link globe zero feed marble","amount":'10000000000',"recipientId":"4264113712245538326M"}' http://localhost:4000/api/transactions
sleep 5
