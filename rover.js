class Rover {
   // Write code here!
   constructor(position){
       this.position=position;
       this.generatorWatts=110;
       this.mode=null;

   }

   receiveMessage(message){
       let response={"message":message.name,"results":[]};
       let commands=message.commands;
       for(let i=0;i< commands.length;i++){
         response.results.push(this.excecutCommand(commands[i])); //
       }
       return response;
   }

   excecutCommand(cmd){
      let result;

      if(cmd.commandType=="MODE_CHANGE"){
         this.mode=cmd.value;
         result={  "completed": true  }; 


      }else if(cmd.commandType=="MOVE"){
          if(this.mode=="LOW_POWER"){   
            result={  "completed": false  };  
          }else if(this.mode=="NORMAL"){  
            this.position= cmd.value;
            result={  "completed": true  };  
          } 
         
      }else if(cmd.commandType=="STATUS_CHECK"){
 
         result={
            "completed": true, 
            "roverStatus": { "mode": this.mode, "generatorWatts": this.generatorWatts, "position": this.position }
         };
         

      }
     return result;
   }
}

module.exports = Rover;