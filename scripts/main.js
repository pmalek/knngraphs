var deck = bespoke.from('article');

bespoke.from('article', {
  keys: true,
  scale: true,
  progress: true,
  state: true,
  bullets: '.bullet',
  fx: {
    direction: "horizontal",
    transition: "fall",
    reverse: true
  }
});

//document.addEventListener('keydown', function(e) {
//  "use strict";
//  var ONE_KEY_IN_ASCII = 48;
//  if(
//    e.which >= ONE_KEY_IN_ASCII &&
//    e.which <= ONE_KEY_IN_ASCII + deck.slides.length
//    ){
//    deck.slide( e.which - ONE_KEY_IN_ASCII - 1  ); // -1 for 0 based slides
//    
//    console.log(e.index);
//    console.log(e.which - ONE_KEY_IN_ASCII);
//  }
//});
