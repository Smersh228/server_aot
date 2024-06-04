const ws = require('ws')
const UUID = require('uuid')

const players = [{
  method:'connect',
  id: 48273,
  login:'tester1',
  password:'jshcye12fdd'
  
},{
  method:'connect',
  id: 41273,
  login:'tester2',
  password:'jdscye12fdd'
  
},
{
  method:'connect',
  id: 43273,
  login:'tester3',
  password:'jshcds12fdd'
  
},
{
  method:'connect',
  id: 44273,
  login:'tester4',
  password:'jshcggfdd'
  
},
{
  method:'connect',
  id: 58273,
  login:'tester5',
  password:'jshkkk1'
  
},
{
  method:'connect',
  id: 78273,
  login:'tester6',
  password:'jsasdas'
  
}]
const lobby = []
let lobby1 = []
let lobby2;
const sss = []
let ss = true
const wss = new ws.Server({
 port:3000,
 id:'',
}, () => console.log('sssssss'))

wss.on('connection', function connect(ws) {
   ws.id  = ''

   ws.on('message', function (message) {
    message = JSON.parse(message);
    console.log(message.method)
      switch (message.method){
       case 'createLobby':
         broadcastMessage1(message,ws)
          break;
      case 'connect':
          broadcastMessage(message,ws)
          break;
      case 'new':
         broadcastMessage3(message,ws)
         break;
      case 'createLobby1':
         broadcastMessage51(message,ws)
         break;
      case 'createLobby2':
            broadcastMessage512(message,ws)
            break;
      case 'connect_play':
              play_connect(message,ws)
              break;
      case 'fraction1':
              fraction1(message,ws)
              break;
      case 'redirect_play':
              redirect_play(message,ws)
              break;
      case 'fraction':
              fraction(message,ws)
              break;
      case 'ready':
              ready(message,ws)
              break;
      case 'delete_play':
              delete_play(message,ws)
              break;
      case 'connect_play_lobby':
              connect_play_lobby(message,ws)
              break;
      case 'ready_lobby_play':
             ready_lobby_play(message,ws)
             break;
      case 'ready_lobby_play1':
            ready_lobby_play1(message,ws)
            break;
      case 'move_order_play':
            move_order_play(message,ws)
            break;
      case 'attack_order_play':
            attack_order_play(message,ws)
            break;
      case 'fire_order_play':
            fire_order_play(message,ws)
            break;
      case 'fire1_order_play':
            fire1_order_play(message,ws)
            break;
      case 'defend_order_play':
            defend_order_play(message,ws)
            break;
      }
   

   })

})

function broadcastMessage(message,ws) {
players.push(message)
ws.id = message.id



wss.clients.forEach(client => {
 
  if (client.id === message.id) {

 client.send(JSON.stringify(players))
  }
})


}

function broadcastMessage1(message,ws) {
   lobby.push(message)
   lobby1.push(message)
   lobby1.map((cell,index) =>  cell.id1 = index)
   console.log(lobby1)
   ws.id = message.id
  
  
 
 
  
   wss.clients.forEach(client => {

      
     if (ws.id === message.id) {
      console.log('суета1')
     client.send(JSON.stringify(lobby.find((cell) => { return cell.id === client.id})))
     }
   })
   
   
   }

   function broadcastMessage3(message,ws) {
     ws.id = message.id
   console.log(message.id)
  
      wss.clients.forEach(client => {
         
         
       if ( client.id === message.id) {
       
        
         client.send(JSON.stringify(lobby1))
       }
      })
   
      
      }
      function broadcastMessage51(message,ws) {
       ws.id = message.id
       
         wss.clients.forEach(client => {
         
          
          
          
           if (client.id === message.id) {
            let s = lobby.find((cell) => {return cell.id === ws.id } )
            s.players[0].ready = message.ready
            s.players[0].fraction = message.fraction
  
            client.send(JSON.stringify(s))

           }
           

            
            
         

          
          
           
         })
         
          
         }


         function broadcastMessage512(message,ws) {
           ws.id = message.id
            let s = lobby.find((cell) => { return cell.id === message.id})
          
            console.log(ws.id)
            
            wss.clients.forEach(client => {

             if (client.id === message.id)   {
              s.players.push(message.players)
          
            //  console.log(message.players)
            
             s.players[1].fraction = message.players.fraction
             s.players[1].ready = message.players.ready
             s.players.splice(2,3)
             client.send(JSON.stringify(s))
             
            
           
             s.players.splice(2,3)
            
             
            
              
               
             }
            })
             
            
            }


            function play_connect(message,ws) {
              ws.id = message.id.id
              let s = lobby.find((cell) => {return cell.id === ws.id } )
              s.players[0].fraction = message.fraction
                wss.clients.forEach(client => {
                 
                 
                
                  
       
                   client.send(JSON.stringify(s))
       
                  
                   
                
       
                 
                 
                  
                })
                
                 
                } 
                
                function fraction1(message,ws) {
                  ws.id = message.id.id
                  let s = lobby.find((cell) => {return cell.id === ws.id } )
                    wss.clients.forEach(client => {
                    
               
                     
                    
                      
           
                     client.send(JSON.stringify(s))
           
                      
                       
                    
           
                     
                     
                      
                    })
                    
                     
                    }

                    function redirect_play(message,ws) {
                      ws.id = message.id
                    
                      let s = lobby.find((cell) => {return cell.id === message.id } )
                        wss.clients.forEach(client => {
                        
                         
                            
                        
                        
                          
                  if ( s.players[1].ready === 'Готов' && s.players[0].fraction !== s.players[1].fraction && s.players[0].fraction !== 0 && s.players[1].fraction !== 0 && client.id === message.id ) {
                     lobby1.splice(s.id1,1)
                   
                      
                      s.redirect_play = message.redirect_play
                         client.send(JSON.stringify(s))
                        
                  }
                          
                           
                        
               
                         
                         
                          
                        })
                        
                         
                        }

                        function fraction(message,ws) {
                          ws.id = message.id
                          
                          let s = lobby.find((cell) => {return cell.id === message.id } )
                          
                          
                          

                          
                         
                            wss.clients.forEach(client => {
                           
                              if (client.id === message.id) {
                                s.players[1].fraction = message.fraction
                                
                                console.log(1)
                                client.send(JSON.stringify(s))
                              }
                            
                      
                              



                              
                             
                            
                            
                              
                   
                          
                   
                              
                            
                           
                   
                             
                             
                              
                            }) 
                            
                             
                            }

                            function ready(message,ws) {
                              ws.id = message.id
                             
                           
                              let s = lobby.find((cell) => {return cell.id === message.id } )
                                wss.clients.forEach(client => {
                             if (client.id === message.id) {
                              
                              console.log(2)
                              s.players[1].ready = message.ready
                              client.send(JSON.stringify(s))
                             
                             }
                                 
                                 
                                
                                
                             
                       
                                
                       
                                  
                                   
                                
                       
                                 
                                 
                                  
                                })
                                
                                 
                                }

                                function delete_play(message,ws) {
                                  ws.names = message.names
                                 
                                  let s = lobby.find((cell) => {return cell.names === message.names } )
                                  
                                let s1 =  lobby1.filter((cell) =>  { return cell !== s})
                                  lobby1 = s1
                                    wss.clients.forEach(client => {
                                     
                            
      
                                     
                                     
                                      
                                    })
                                    
                                     
                                    }


                                    function connect_play_lobby(message,ws) {
                                      ws.id = message.id
                                     
                                      let s = lobby.find((cell) => {return cell.id === ws.id } )
                                      
                                    let s1 =  lobby1.filter((cell) =>  { return cell !== s})
                                      lobby1 = s1
                                        wss.clients.forEach(client => {
                                          if ( client.id === message.id) {

                                            client.send(JSON.stringify(s))

                                           }
                                          
                                        })
                                        
                                         
                                        }

                                        function ready_lobby_play(message,ws) {
                                          ws.id = message.id
                                           
                                          let s = lobby.find((cell) => {return cell.id === ws.id } )
                                          s.players[0].ready_play = message.ready
                                          s.units1 =   message.lobby
                                         
                                            wss.clients.forEach(client => {
                                             if ( client.id === message.id) {
                                                 if (s.players[0].ready_play === s.players[1].ready_play ) {
                                              s.units3 = s.units1.concat(s.units2)
                                              s.hod = true


                                                  console.log(1)
                                                  s.players[0].ready_play = false
                                                  s.players[1].ready_play = false

                                                  s.count1 = message.count1
                                                  client.send(JSON.stringify(s))
                                                  
                                                 } else {
                                                  s.hod = false
                                                  client.send(JSON.stringify(s))

                                                 }
                                                   

                                             }
                                       
                                              
                                              
                                            })
                                            
                                             
                                            }
                                            function ready_lobby_play1(message,ws) {
                                              ws.id = message.id
                                               
                                              let s = lobby.find((cell) => {return cell.id === ws.id } )
                                              s.players[1].ready_play = message.ready
                                              s.units2 =   message.lobby
                                             
                                                wss.clients.forEach(client => {
                                                 if ( client.id === message.id) {
    
                                                  if (s.players[0].ready_play === s.players[1].ready_play ) {
                                                    console.log(1)
                                                    s.hod = true
                                                    s.players[1].ready_play = false
                                                    s.players[0].ready_play = false
                                                    s.count1 = message.count1
                                                 s.units3 = s.units1.concat(s.units2)
                                                    client.send(JSON.stringify(s))
                                               
                                                   } else {
                                                    s.hod = false
                                                    client.send(JSON.stringify(s))
                                                   }
    
                                                 }
                                           
                                                  
                                                  
                                                })
                                                 
                                                 
                                                }

                                                function move_order_play(message,ws) {
                                                  ws.id = message.id
                                                   
                                                  let s = lobby.find((cell) => {return cell.id === ws.id } )

                                                    wss.clients.forEach(client => {
                                                     if ( client.id === message.id) {
                                                       let s1 = message.lobby.find((tank) => tank.id === message.tank_active)
                                                            s1.coordinates.col = message.order_col
                                                            s1.coordinates.row = message.order_row
                                                            s1.coordinates.type = message.order_type
                                                            s1.trajectory = message.order_vector_move
                                                            s1.actions.defend = s1.afterStepData.defend

                                                            s1.defend_sector =  []
                                                            s1.defend_side =  {}
                                                            s1.tank_attack = {}
                                                            s1.order = message.order_name
                                                           
                                                          
                                                           
                                                            client.send(JSON.stringify(message.lobby))
                                                    
                                                       }
        
                                                     }
                                               
                                                      
                                                      
                                                   ) }
                                                    function fire_order_play(message,ws) {
                                                      ws.id = message.id
                                                     
                                                      let s = lobby.find((cell) => {return cell.id === ws.id } )
    
                                                        wss.clients.forEach(client => {
                                                         if ( client.id === message.id) {
                                                           let s1 = message.lobby.find((tank) => tank.id === message.tank_active)
                                                                s1.tank_attack = message.order_tank_attack
                                                                s1.order = message.order_name
                                                                s1.defend_sector =  []
                                                                s1.defend_side =  {}
                                                                s1.tank_attack_number = message.tank_attack_number
                                                                s1.coordinates.row = message.order_tank.coordinates.row
                                                                s1.coordinates.col =  message.order_tank.coordinates.col
                                                                s1.coordinates.type = message.order_tank.coordinates.type
                                                                s1.trajectory = []
                                                              
                                                               
                                                                client.send(JSON.stringify(message.lobby))
                                                        
                                                           }
            
                                                         }
                                                   
                                                          
                                                          
                                                       )
                                                        
                                                         
                                                        }
                                                        function defend_order_play(message,ws) {
                                                          ws.id = message.id
                                                   
                                                          let s = lobby.find((cell) => {return cell.id === ws.id } )
        
                                                            wss.clients.forEach(client => {
                                                             if ( client.id === message.id) {
                                                               let s1 = message.lobby.find((tank) => tank.id === message.tank_active)
                                                                    s1.defend_side =  message.order_def_order === 'side'  ?   {row:message.order_row,col:message.order_col} : s1.defend_side
                                                                    s1.defend_sector = message.order_def_order === 'sector'  ? message.order_def_mas : []
                                                                    s1.coordinates.row = message.order_tank.coordinates.row
                                                                    s1.coordinates.col =  message.order_tank.coordinates.col
                                                                    s1.coordinates.type = message.order_tank.coordinates.type
                                                                    s1.order = message.order_name
                                                                    s1.trajectory = []          
                                                                    s1.tank_attack = {}
                                                                   
                                                                    client.send(JSON.stringify(message.lobby))
                                                            
                                                               }
                
                                                             }
                                                       
                                                              
                                                              
                                                           )
                                                             
                                                            }
                                                            function fire1_order_play(message,ws) {
                                                              ws.id = message.id
                                                   
                                                              let s = lobby.find((cell) => {return cell.id === ws.id } )
            
                                                                wss.clients.forEach(client => {
                                                                 if ( client.id === message.id) {
                                                                   let s1 = message.lobby.find((tank) => tank.id === message.tank_active)
                                                                        s1.coordinates.col = message.order_col
                                                                        s1.coordinates.row = message.order_row
                                                                        s1.coordinates.type = message.order_type
                                                                        s1.order = message.order_name
                                                                       
                                                                      
                                                                       
                                                                        client.send(JSON.stringify(message.lobby))
                                                                
                                                                   }
                    
                                                                 }
                                                           
                                                                  
                                                                  
                                                               )
                                                                }

                                                                function attack_order_play(message,ws) {
                                                                  ws.id = message.id
                                                   
                                                                  let s = lobby.find((cell) => {return cell.id === ws.id } )
                
                                                                    wss.clients.forEach(client => {
                                                                     if ( client.id === message.id) {
                                                                       let s1 = message.lobby.find((tank) => tank.id === message.tank_active)
                                                                            s1.tank_attack = message.order_tank_attack
                                                                            s1.coordinates.col = message.order_row.col
                                                                            s1.coordinates.row = message.order_row.row
                                                                            s1.coordinates.type = message.order_type
                                                                            s1.tank_attack_number = message.tank_attack_number
                                                                            s1.order = message.order_name
                                                                            s1.defend_sector =  []
                                                                            s1.defend_side =  {}
                                                                            s1.tank_attack_number = message.tank_attack_number
                                                                            s1.trajectory = []
                                                                           
                                                                            client.send(JSON.stringify(message.lobby))
                                                                    
                                                                       }
                        
                                                                     }
                                                               
                                                                      
                                                                      
                                                                   )
                                                                     
                                                                    }
