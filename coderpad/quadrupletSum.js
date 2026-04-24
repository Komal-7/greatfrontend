
function findQuadrupletSum(numbers, target) {
    /*
    Finds four integers within `numbers` whose sum amounts to
    exactly `target`, and returns them.

    There will always be a valid quadruplet, and the same number
    can be picked several times.
    */
    for (let a of numbers) {
        for (let b of numbers) {
            for (let c of numbers) {
                for (let d of numbers) {
                    if (a + b + c + d === target) {
                        return [a, b, c, d];
                    }
                }
            }
        }
    }
}

function findQuadrupletSumFast(numbers, target) {
    // TODO: Code the same function as above, but faster!
    
    const pair = new Map();
    for(let i=0;i<numbers.length;i++){
      for(let j=0;j<numbers.length;j++){
        const sum = numbers[i] + numbers[j];
        if(!pair.get(sum)){
          pair.set(sum,[numbers[i], numbers[j]])
        }
      }
    }
    for(const [key,value] of pair){
      const comp = target-key;
      if(pair.has(comp)){
        return [...pair.get(comp),...value]
      }
    }
    return null
}

// =============== DO NOT EDIT BELOW THIS LINE ===============

function runTestcase(numbers, target, testcaseName) {
    console.log(testcaseName.padEnd(25), '-');
    const t0 = performance.now();
    const result = findQuadrupletSumFast(numbers, target);
    const elapsed = performance.now() - t0;

    if (!Array.isArray(result)) {
        console.error(`FAILED: the function returned ${result} of type ${typeof result}, not an array.`);
        process.exit(1);
    }

    if (result.length !== 4) {
        console.error(`FAILED: the result has ${result.length} elements, not 4`);
        process.exit(1);
    }

    if (result.reduce((a, b) => a + b, 0) !== target) {
        console.error(`FAILED: the sum of ${result} is ${result.reduce((a, b) => a + b, 0)}, not ${target}`);
        process.exit(1);
    }

    if (result.some(r => !numbers.includes(r))) {
        console.error('FAILED: one of the numbers is not in the list');
        process.exit(1);
    }

    console.log('PASSED');
}

runTestcase([5, 4, 3, 2, 1, 0], 11, 'Small testcase');
runTestcase([54, 3, 42, 16, 4, 24], 90, 'Solution with duplicates');
runTestcase([89, -62, -92, -37, 28, 29], -7, 'With negative numbers');
runTestcase([39, -57, -53, -79, 83, -6, 27, -97], 0, 'Target is zero');

for (let i = 1; i <= 5; i++) {
    const numbers = Array.from({length: 1000}, () => Math.floor(Math.random() * 200000000 - 100000000));
    const target = numbers.slice(-4).reduce((a, b) => a + b, 0);  // Make sure the target can be done by summing the last 4 numbers
    numbers.sort(() => Math.random() - 0.5);  // Shuffle the list to avoid cheaters who just return the last 4 elements ;)
    runTestcase(numbers, target, `Large test #${i}`);
}

console.log('Congratulations. You passed all testcases!');
