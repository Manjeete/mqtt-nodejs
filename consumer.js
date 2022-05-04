const amqp = require("amqplib");

const msg = {number:19}

async function connect(){
    try{
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs");
        
        channel.consume("jobs",message =>{
            console.log(JSON.parse(message.content.toString()))
        })

        console.log("Waiting for the messages...")

    }catch(err){
        console.error(err);
    }
}

connect()