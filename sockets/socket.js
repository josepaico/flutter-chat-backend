const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');

    //obtiene el token
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    //verifica autenticacion
    if( !valido ) { return client.disconnect();}
    //Cliente autenticado
    usuarioConectado(uid);

    //ingresar al usuario a una sala en particular
    //sala global, cliente.id, 5f81f8fb5a320c3ca443546c
    client.join( uid );

    //escuchar del cliente el mensaje personal
    client.on('mensaje-personal', async (payload) => {
        //grabar mensaje
        await grabarMensaje( payload );
        
        io.to( payload.para ).emit('mensaje-personal', payload );
    })

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });

    /*client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });*/


});
