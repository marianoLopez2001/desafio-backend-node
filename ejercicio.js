//PROBLEMA 1 - REPETIR 20 VECES NUMEROS RANDOM DEL 1 AL 1000

//FORMA 1

// const numeros = []
// for (let i = 0; i < 10000; i++) {
//     numeros.push(Math.ceil(Math.random() * 20))
// }

// // B
// const numerosObj = {}
// numeros.forEach(n => {
//     if (numerosObj[n]) {
//         numerosObj[n]++
//     } else {
//         numerosObj[n] = 1
//     }
// })

// console.log(numerosObj)

//FORMA 2 

// const obj = {}

// for (let i = 0; i < 1000; i++) {
//     let randomNumber = Math.ceil(Math.random() * 20);

//     obj[randomNumber] ? obj[randomNumber]++ : obj[randomNumber] = 1
// }

// console.log(obj);
// obj["key"] = 1 LO MISMO QUE... obj.key = 1

//PROBLEMA 2 

// const productos = [
//     { id:1, nombre:'Escuadra', precio:323.45 },
//     { id:2, nombre:'Calculadora', precio:234.56 },
//     { id:3, nombre:'Globo Terráqueo', precio:45.67 },
//     { id:4, nombre:'Paleta Pintura', precio:456.78 },
//     { id:5, nombre:'Reloj', precio:67.89 },
//     { id:6, nombre:'Agenda', precio:78.90 }
// ]

// function getNombres () {
//     const nombres = productos.map(i => i.nombre).join(', ')
//     console.log(nombres);
// }

// function getMaxPrice () {
//     let max = productos[0].precio //VARIABLE SEMILLA
//     let prod = productos[0]

//     for (const producto of productos) {
//         if (producto.precio > max) {
//             max = producto.precio;
//             prod = producto
//         }
//        /*LO QUE HACE EL FOR ESTE, ES QUE EN CADA ITERACION EVALUA SI LA ITERACION ES MAYOR AL PRODUCTO SEMILLA Y LE ASIGNA ESE VALOR AL PRODUCTO 
//        SEMILLA Y REPITE HASTA QUE NO ENCUENTRE NINGUNA ITERACION MAYOR Y QUEDE EL VALOR SEMILLA COMO EL VALOR MAYOR, LA CLAVE ES QUE EN CADA ITERACION
//        ASIGNA EL VALOR, LO CAMBIA A OTRA ITERACION Y LA EVALUA DE VUELTA HASTA RECORRER EL ARRAY Y DAR CON EL RESULTADO*/
//     }
//     console.log(prod);
// }

// getNombres()
// getMaxPrice()

