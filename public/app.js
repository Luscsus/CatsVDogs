var NumberOfCats = 0;
var NumberOfDogs = 0;
var AmountOfSkips = 0;
var countdown = 0;
var NumberOfChangesDog = 0;
var NumberOfChangesCat = 0;
const ImageDogs = []
const ImageCats = []
let carousel
let carousel2


class Carousel {

    constructor(element) {

        this.board = element
        // add first two cards programmatically
        this.push()
        this.push()

        // handle gestures
        this.handle()

    }

    handle() {

        // list all cards
        if (this.board.id == "boardCat")
        {
            this.cards = this.board.querySelectorAll('.CatImage')
        }
        else if (this.board.id == "boardDog")
        {
            this.cards = this.board.querySelectorAll('.DogImage')
        }

        // get top card
        this.topCard = this.cards[this.cards.length - 1]

        // get next card
        this.nextCard = this.cards[this.cards.length - 2]

    }

    onPan() {
        setTimeout(() => {
            // remove swiped card
            this.board.removeChild(this.topCard)
            // add new card
            this.push()
            // handle gestures on new top card
            this.handle()
        }, 200)
    }

    push() {
        let card = document.createElement("img");
        if (this.board.id == "boardCat")
        {
            card.classList.add('CatImage')
            card.src = ImageCats[NumberOfChangesCat]
            NumberOfChangesCat++
        }
        else if (this.board.id == "boardDog")
        {
            card.classList.add('DogImage')
            card.src = ImageDogs[NumberOfChangesDog]
            NumberOfChangesDog++
        }
        this.board.insertBefore(card, this.board.firstChild)
    }
}

async function Slider()
{
    var data = '';
    // Slide down the end card
    $(document).ready(function()
    {
        $(".EndCard").slideDown(1000);
    })

    // Change the EndTitle text:
    if (NumberOfCats < NumberOfDogs)
    {
        document.getElementById("EndTitle").innerHTML = "You're a dog person";
        data = 'dog'
    }
    else if (NumberOfCats > NumberOfDogs)
    {
        document.getElementById("EndTitle").innerHTML = "You're a cat person";
        data = 'cat'
    }
    else
    {
        document.getElementById("EndTitle").innerHTML = "You like dogs and cats equally";
        data = 'both'
    }

    // Send the POST request to the server asking for the variables:
    const FinalData = {"AddedData": data}
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(FinalData)
    }
    const response = await fetch('/api', options)
    const json = await response.json()

    // get the variables from the server and store them:
    var NumberOfBothPeople = json.NumberOfBothPeople
    var NumberOfCatPeople = json.NumberOfCatPeople
    var NumberOfDogPeople = json.NumberOfDogPeople

    document.getElementById("EndExplanation").innerHTML = "You choose " + NumberOfCats + " cats, " + NumberOfDogs + " dogs. And skipped " + AmountOfSkips + " times.";
    document.getElementById("AmountOfPeople").innerHTML = NumberOfCatPeople + " people that have taken this test are cat people, " + NumberOfDogPeople + " are dog people and " + NumberOfBothPeople + " people like them both equally"
}

var CreateBoardAndCarousel = (function() {
    var executed = false;
    return function() {
        if (!executed) {
            executed = true;
            setTimeout(() => {
                // get the catLoader and hide it
                 var loader = document.getElementById("loaderCat")
                loader.style.display = "none"

                // get the dogLoader and hide it
                var loader = document.getElementById("loaderDog")
                loader.style.display = "none"

                let boardcat = document.querySelector('#boardCat')
                let boarddog = document.querySelector('#boardDog')
                carousel = new Carousel(boardcat)
                carousel2 = new Carousel(boarddog)
            }, 1000)
        }
    };
})();

function PickedCat() {
    countdown++;
    document.getElementById("Countdown").innerHTML = countdown + "/10";
    NumberOfCats++; 
    changeImages()
}

function PickedDog() {
    countdown++;
    document.getElementById("Countdown").innerHTML = countdown + "/10";
    NumberOfDogs++;
    changeImages()
}

function Skip() {
    GetImageCat();
    GetImageDog();
    changeImages()
    AmountOfSkips++
}

var Get10Images = (function() {
    var executed = false;
    return function() {
        if (!executed) {
            executed = true;
            for(let i = 0; i < 11; i++)
            {
                GetImageCat();
                GetImageDog();
            }
            CreateBoardAndCarousel()
        }
    };
})();

function changeImages() {  
    if (countdown >= 10)
    {
        Slider()
    }
    else 
    {
        // Move the cat image to the left:
        carousel.topCard.style.transition = 'transform 300ms ease-out'
        carousel.topCard.style.transform =
            'translateX(' + -1000 + 'px) translateY(' + -100 + 'px) rotate(' + -13 + 'deg)'

        // Move the dog image to the left
        carousel2.topCard.style.transition = 'transform 300ms ease-out'
        carousel2.topCard.style.transform =
            'translateX(' + 1000 + 'px) translateY(' + -100 + 'px) rotate(' + -13 + 'deg)'
        
        carousel.onPan()
        carousel2.onPan()
    }
}
Get10Images();

function GetImageDog(event) {
    fetch("https://dog.ceo/api/breeds/image/random")
        .then(response => response.json())
        .then(data => {
            // Save the url to the ImageDogs array
            ImageDogs.push(data["message"])
        })
}

function GetImageCat(event) {
    fetch("https://api.thecatapi.com/v1/images/search")
        .then(response => response.json())
        .then(data => {
            // Save the url to the ImageCats array
            ImageCats.push(data[0]["url"])
        })
}