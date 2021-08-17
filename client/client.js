const path = require("path")
const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")

// gRPC service definition for greet
const greetProtoPath = path.join(__dirname,"../protos/greet.proto") 

const greetProtoDef = protoLoader.loadSync(greetProtoPath,{
    keepCase:true,
    longs:String,
    enums:String,
    defaults:true,
    oneofs:true
});

const greetPackageDefinition = grpc.loadPackageDefinition(greetProtoDef).greet
const client = new greetPackageDefinition.GreetService("localhost:3000",grpc.credentials.createInsecure())

const callGreeting = () =>{
    const request ={ 
        greeting:{
            firstname:"milad",
            lastname:"khajavi"
        }
    }
    client.greet(request, (err,response)=>{
        if (!err) {
            console.log("greeting response: " ,response.result);
        } else {
            console.log(err,"error");            
        }
    })
}
const main = () =>{
    callGreeting()
}
main()