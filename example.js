"use strict";
var brain = require('brain');
console.log('node is running cool',brain);
/****************************EVENT LISTENERS********************/

var net = new brain.NeuralNetwork();

var fonts = [
  'lato',
  'oswald',
  'istok web',
  'lora',
  'merriweather',
  'montserrat',
  'domine',
  'neuton',
  'playfair display',
  'muli',
  'ubuntu',
  'amatic sc',
  'andika',
  'flamenco',
  'asap'
]

net.train([{input: {pos: 0.0}, output: {pos: 0.4}},
           {input: {pos: 0.1}, output: {pos: 0.2}},
           {input: {pos: 0.2}, output: {pos: 0.3}},
           {input: {pos: 0.4}, output: {pos: 0.6}},
           {input: {pos: 0.5}, output: {pos: 0.7}},
           {input: {pos: 0.8}, output: {pos: 0.9}},
           {input: {pos: 0.010}, output: {pos: 0.011}},
           {input: {pos: 0.012}, output: {pos: 0.013}},
         ]);
        //  {
        //     errorThresh: 0.005,
        //     iterations: 60000,
        //     log: true,           // console.log() progress periodically
        //     logPeriod: 10,       // number of iterations between logging
        //     learningRate: 0.3    // learning rate
        //   }


        window.onload = () => {
          var getLength = (num) => {
              return num.toString().length;
          }
      	/////////////////////////////////////////////////////////////
      	/****************************HELPER FUNCTIONS*******************/
      	var getOutputIndex = () => {
      		let firstFont = document.getElementById('firstFont').value.toLowerCase();
      		let indexOfFirstFont = checkInFontsArray(firstFont);
          if(indexOfFirstFont > -1) {
      			let newIndex = modifyIndex(indexOfFirstFont);
            console.log(newIndex);
      			// Run the model
      			let output = net.run({pos: newIndex});
            console.log(output);
            let expo = getLength(indexOfFirstFont);
            // Change the index back to it's original form
            console.log(typeof expo);
            let outputIndexWithDec = output.pos * fonts.length;
            let outputIndex = Math.floor(outputIndexWithDec);
      			return outputIndex;
      		}
      		return undefined;
      	}

      	// Function returns either the index of the element or either null if it don't
      	// finds the font in the list
      	var checkInFontsArray = (firstFont) => {

      		let fontIndex = fonts.indexOf(firstFont);
      		return fontIndex > -1 ? fontIndex : undefined;
      	}

      	var modifyIndex = (index) => {
          if(index == 0)
          return 0.0;

          let expo = getLength(index);
          if(expo > 1) {
            expo += 1;
          }
      		return index / Math.pow(10,expo);
      	}
      	////////////////////////////////////
      	var outputDiv = document.getElementById('output');
      	var getOutput = document.getElementById('getOutput');
        var dataForm = document.getElementsByClassName('data-form')[0];
      	console.log(getOutput);

        var getOutputAction = (e) => {
          e.preventDefault();

          outputDiv.innerHTML = 'loading............';
          setTimeout(() => {
            let outputIndex = getOutputIndex();
        		if(outputIndex) {
        				let result = fonts[outputIndex];

                if(result){
                  outputDiv.innerHTML = '<p>The font pair is <span class="result">'+result+'</span></p>';
                }
                else{
                  outputDiv.innerHTML = '<p>The font pair is <span class="result">not found</span> in the database</p>';
                }
            }else{
        			outputDiv.innerHTML = '<p>Font is not in the database</p>';
        		}
          },500);
        }

        getOutput.addEventListener('click',getOutputAction,false);
        dataForm.addEventListener('submit',getOutputAction,false);
  }
