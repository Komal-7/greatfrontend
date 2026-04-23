const cards = ["A", "B", "C", "D", "E"];

function shuffleCards(cards) {
  // your code here
  let odd = [], even = [];
  for(let i=0;i<cards.length;i++){
    if(i%2===0){
      even.push(cards[i])
    }else{
      odd.push(cards[i])
    }
  }
  even.reverse();
  console.log(odd,even)
  return [...even, ...odd]
}

console.log(shuffleCards(cards));
