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


function greet(call, callback) {
    console.log(call,"calllllll");
    var firstName = call.request.greeting.firstname;
    var lastName = call.request.greeting.lastname;

    callback(null, {result: "Hello " + firstName + " " + lastName})
}


 const main = ()=>{
    const server = new grpc.Server()
   server.addService(greetPackageDefinition.GreetService.service,{
        greet:greet
   })
   server.bindAsync("127.0.0.1:3000",grpc.ServerCredentials.createInsecure(),(error,port)=>{
            server.start()
            console.log(`server running on port 3000`);
        }) 
}
main()
// const main = ()=>{
//     const server = new grpc.Server()
//     server.bindAsync("127.0.0.1:50051",grpc.ServerCredentials.createInsecure(),(error,port)=>{
//         server.start()
//         console.log(`server running on port 50051`);
//     }) 
// }
// main()