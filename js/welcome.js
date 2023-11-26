TweenMax.from(".title",1.5,{
    delay:0.5,
    opacity:0,
    x:-200,
    ease:Expo.easeInOut
});
TweenMax.from(".brief",1.5,{
    delay:0.5,
    opacity:0,
    y:200,
    ease:Expo.easeInOut
});


TweenMax.from("#register",1.5,{
    delay:0.6,
    opacity:0,
    y:200,
    ease:Expo.easeInOut
});

TweenMax.staggerFrom(".welcome-img",1.5,{
    delay:0.5,
    opacity:0,
    x:-30,
    ease:Expo.easeInOut
},0.08);