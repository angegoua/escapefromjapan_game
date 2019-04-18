const slider = document.querySelector('.sliderContainer')
const sliderImages = document.querySelectorAll('.sliderContainer img')
const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');
const pagination = document.querySelector('.pagination')
const step = 508 // definit le décalage
let pos = 0 // définit la position en cours.
let action
playSlider()

slider.addEventListener('mouseover',stopSlider)
slider.addEventListener('mouseout',playSlider)

function setPosition(pos)
{
    document.querySelector('.current').classList.remove('current')
    slider.style.left = -pos*step+'px' // 960px
    let points= document.querySelectorAll('.pagination li')
    points[pos].classList.add('current')
}

function stopSlider()
{
    clearInterval(action)
}


function playSlider()
{
    action = setInterval(
        function()
        {
            pos = (pos+1)%sliderImages.length
            setPosition(pos)
        },
        3000 // toutes les 3 secondes
    )
}

leftArrow.addEventListener(
    'click',
    function () {
        pos--
      if(pos < 0){
        pos = sliderImages.length-1
      }
        setPosition(pos)
    },
)

rightArrow.addEventListener(
    'click',
    function () {
        pos++
        if(pos == sliderImages.length)
        {
            pos = 0
        }
        setPosition(pos)
    },
)


rightArrow.addEventListener(
    'mouseover',
    stopSlider,
)

rightArrow.addEventListener(
    'mouseout',
    playSlider,
)

leftArrow.addEventListener(
    'mouseover',
    stopSlider,
)

leftArrow.addEventListener(
    'mouseout',
    playSlider,
)



for(let i = 0 ; i < sliderImages.length;i++){
   let li  = document.createElement('li')
   if(i == 0){
     li.classList.add('current')
   }
    li.classList.add('point')
    pagination.appendChild(li)
}

let points = document.querySelectorAll('.point');

for(let i = 0; i< points.length; i++){
    points[i].addEventListener(
        'click',
        function () {
            pos = i;
            setPosition(pos)
        }
        )
}
