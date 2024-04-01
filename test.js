// wir laden uns zwei Funktionen aus dem "fs" Modul, aehnlich wie #include <stdio.h>
import { readFileSync, writeFileSync } from 'node:fs';


// wir definieren unsere Variabeln
let inputFileData = "";
let inputData = [];
let verboseOptionIndex = process.argv.indexOf("-v") > -1;

function convertDate(germanDate) {
    const [day, month, year] = germanDate.split(".");
    return `${month}/${day}/${year}`;
}

// man kann in JS direkt verschachtelte Variabeln definieren
// hier z. B. ein Array mit einem Array drin, welches die Header fuer
// die Ergebnisdatei beinhaltet
let outputData = [
    [
        'Date (US format)',
        'Quantity (hours)',
        'Activity'
    ],
]

// holen uns das input Argument/Parameter aus der Befehlszeile 
let inputIndex = process.argv.indexOf("--input");

if (inputIndex === -1) {
    console.error("Error. Please provide input.");
    process.exit();
}

let inputFile = process.argv[inputIndex + 1];

if(inputFile === undefined) {
    console.error("Error. No file provided to --input parameter.");
    process.exit();
}

let inputFileComponents = inputFile.split(".");

if(inputFileComponents[1] === "" || inputFileComponents[1] !== "csv" || inputFileComponents.length > 2) {
    console.error("Error. Missing or wrong filetype. Please provide csv file.");
    process.exit();
}

if(inputFileComponents[0] === "") {
    console.log("Error. Missing filename of csv file.");
    process.exit();
}


// hier das output
let outputIndex = process.argv.indexOf("--output");

if(outputIndex === -1) {
    console.error("Error. Please provide output.");
    process.exit();
}

let outputFile = process.argv[outputIndex + 1];

if(outputFile === undefined) {
    console.error("Error. No file provided to --output parameter.");
    process.exit();
}

let  outputFileComponents = outputFile.split(".");

if(outputFileComponents[1] === "" || outputFileComponents[1] !== "csv" || outputFileComponents.length > 2) {
    console.error("Error. Missing or wrong filetype. Please provide csv output file.");
    process.exit();
}

if(outputFileComponents[0] === "") {
    console.error("Error. Missing filename. Please enter a filename for the csv output file.");
    process.exit();
}

// angegebene Datei (Zeile 23) einlesen und zu einem String konvertieren
inputFileData = readFileSync(inputFile).toString();


// trenne die Zeilen voneinander und speichere sie als ein Array
inputFileData = inputFileData.split("\r\n");

// Tipp 1: Brauchen wir die erste Zeile uberhaupt?
// trenne jedes Unterarray, was eine Zeile darstellt, nochmal 
for (let i = 0; i < inputFileData.length; i++) {
    let columns = inputFileData[i].split(";");
    if(columns.length === 1) {
        continue;
    }
    inputData.push(columns);
}

if(verboseOptionIndex === true) {
    console.log(inputData, "\r\n");
}


for (let i = 1; i < inputData.length; i++) {
    // leeres Array in outputData legen fur nachste Zeile
    outputData.push([]);
    // speichere die richtigen Daten in das neue Array
    outputData[i][0]= convertDate(inputData[i][0]);
    outputData[i][1]= inputData[i][3];
    outputData[i][2]= inputData[i][13];
    
}


if(verboseOptionIndex === true){
    console.log(outputData);
}


// fuge die Unterarrays wieder zu einer Zeile zusammen
for (let i = 0; i < outputData.length; i++) {
    outputData[i] = outputData[i].join(";");    
}


// fuge alle Zeilen wieder zu einem langen Text zusammen
outputData = outputData.join("\r\n");


// speichere den Text in die in Zeile 29 angegebene Datei
writeFileSync(outputFile, outputData);