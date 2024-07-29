const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
     test("constructor sets position and default values for mode and generatorWatts", function(){
        let r=new Rover(1111);
        expect( r.position ).toBe(1111);
        expect( r.generatorWatts ).toBe(110);
  });


    // test 8
    test("response returned by receiveMessage contains the name of the message", function(){
      let r= new Rover(1111);
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
      let message=new Message('Test message with two commands', commands);
      let response = r.receiveMessage(message);
  
      expect( response.message ).toBe(message.name);
    });


        // test 9
        test("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
          let r= new Rover(1111);
          let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
          let message=new Message('Test message with two commands', commands);
          let response = r.receiveMessage(message);
      
          expect( response.results.length).toBe(2);
        });


        
    // test 10
    test("responds correctly to the status check command", function(){
      let r= new Rover(1111);
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
      let message=new Message('Test message with two commands', commands);
      let response = r.receiveMessage(message);
      console.log(typeof response.results[1]);
      expect(
        typeof response.results[1]=="object" && 
         typeof response.results[1].roverStatus== "object"  &&
         Object.keys(response.results[1].roverStatus).includes("mode")  &&
         Object.keys(response.results[1].roverStatus).includes("generatorWatts")  &&
         Object.keys(response.results[1].roverStatus).includes("position") 

      ).toBe(true);

    });


    //test 11   “responds correctly to the mode change command”
    test("responds correctly to the mode change command", function(){
      let rover= new Rover(1111);
      let commands1 = [new Command('MODE_CHANGE', 'LOW_POWER')];

      let response1 = rover.receiveMessage(new Message('Test MODE_CHANGE with LOW_POWER', commands1));
      expect(  response1.results[0].completed  && rover.mode=='LOW_POWER' ).toBe(true) 
    });


        //test 12  
        test("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
          let rover= new Rover(1111);
          let commands = [new Command('MODE_CHANGE', 'LOW_POWER'),new Command('MOVE', 23456)];
    
          let response = rover.receiveMessage(new Message('Test Move  with LOW_POWER', commands));
          expect( response.results[1].completed ).toBe(false) 
        });

     
               //test 13  
               test("responds with the position for the move command", function(){
                let rover= new Rover(1111);
                let commands = [new Command('MODE_CHANGE', 'NORMAL'),new Command('MOVE', 2222)];
          
                let response = rover.receiveMessage(new Message('Test Move position change', commands));
                expect( rover.position ).toBe(2222) 
              });
      
});