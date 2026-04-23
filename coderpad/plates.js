
let plates = [
  "flower-decorated plate",
  "light green plate",
  "light green plate",
  "big blue plate",
  "big blue plate",
  "transparent plate",
];
const plateIndices = new Map();
  for(let i=0;i<plates.length;i++){
    if(i===0 || plates[i] !== plates[i-1]){
      plateIndices.set(plates[i],i)
    }
  }
function getInsertionDetails(plates, plate1, plate2 = null) {
  
  console.log(plateIndices)
  if(plate2===null){
    insertAt(plateIndices.get(plate1),plate1)
    updateIndices(plateIndices.get(plate1),1)
    return [plateIndices.get(plate1), false]
  }else{
    let pl1 = plateIndices.get(plate1);
    let pl2 = plateIndices.get(plate2);
    if(plate1===plate2){
      insertAt(pl1,plate1,plate2)
      updateIndices(pl1,2)
      return [pl1, false]
    }else{
      if(Number(pl1)<Number(pl2)){
        insertAt(pl2,plate1,plate2)
        updateIndices(pl1,2,plate2)
        return [pl1, false]
      }else{
        insertAt(pl1,plate2,plate1)
        updateIndices(pl2,2,plate1)
        return [pl2, true]
      }
    }
  }
}
function updateIndices(where, count, extraKey = null) {
  for(const [key, value] of plateIndices){
    if(value > where && key !== extraKey){
      plateIndices.set(key, value + count);
    }
  }
  if(extraKey) {
    plateIndices.set(extraKey, plateIndices.get(extraKey) + 1);
  }
  console.log("after update",plateIndices)
}
  

function insertAt(index, plate1, plate2=null) {
  if(plate2 === null){
    plates.splice(index,0,plate1)
  }else{
    plates.splice(index,0,plate1,plate2)
  }
  
}
// Test
// Call 1
console.log(getInsertionDetails(plates, "big blue plate","big blue plate"));
console.log(plates);

console.log(getInsertionDetails(plates, "light green plate","big blue plate"));
console.log(plates);

console.log(getInsertionDetails(plates, "transparent plate","big blue plate"));
console.log(plates);

