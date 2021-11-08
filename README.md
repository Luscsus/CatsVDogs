# CatsVDogs
This is a website that shows you if you're a dog or a cat person. It's my first website (that's why it's a little glitchy), hope you enjoy it. You can find it here: https://dogsvcats.herokuapp.com/

# How it works:
It uses the https://thecatapi.com/ and the https://dog.ceo/dog-api/ to get the animal pictures, displays them in a carousel and then once you've picked your images sends a POST request to the node.js server to get the numbers of people who have also taken this test. That data is stored in a NeDB database. The website is hosted on heroku.

# Dependencies:
Express: 4.17.1,<br/>
NeDB: 1.8.0
