import { readFileSync } from 'fs';

const data = [];
readFileSync('input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    const values = line.split(": ")[1].split(" ").filter(a => a).map(a => parseInt(a.trim()));
    data.push(values);
});


// PART 1
let result = 1;

for(let i = 0; i < data[0].length; i++) {
    let time = data[0][i];
    let distance = data[1][i];
    let wins = 0;
    for(let k = 0; k <= time; k++) {
        let testDist = k*(time - k);
        if(testDist > distance) {
            wins++;
        }
    }
    result *= wins;
}

console.log("PART1", result);

let time = "";
data[0].forEach(a => time += a.toString());
time = parseInt(time);

let distance = "";
data[1].forEach(a => distance += a.toString());
distance = parseInt(distance);

let wins = 0;
for(let k = 0; k <= time; k++) {
    let testDist = k*(time - k);
    if(testDist > distance) {
        wins++;
    }
}

console.log("PART2", wins);