class Message {
   // Write code here!
   constructor(name,commands){
       this.name=name;
       if(!name){ throw new Error("Message Name required.")}

       this.commands=commands;

   }
}

module.exports = Message;