// function onScrollInit(items, trigger) {
//   items.each(function () {
//     var osElement = $(this)
//     var osAnimationClass = osElement.attr('data-os-animation')
//     var osAnimationDelay = osElement.attr('data-os-animation-delay') || '0s'

//     osElement.css({
//       '-webkit-animation-delay': osAnimationDelay,
//       '-moz-animation-delay': osAnimationDelay,
//       'animation-delay': osAnimationDelay
//     })

//     var osTrigger = trigger ? trigger : osElement

//     new Waypoint({
//       element: osTrigger[0],
//       handler: function () {
//         osElement.addClass('animate__animated ' + osAnimationClass)
//       },
//       offset: '75%'
//     })
//   })
// }

// $(document).ready(function () {
//   onScrollInit($('.os-animation'))
// })

function onScrollInit(items, trigger) {
  items.each(function () {
    var osElement = $(this) // Elemento que queremos animar
    var osAnimationClass = osElement.attr('data-os-animation') // Clase de animación
    var osAnimationDelay = osElement.attr('data-os-animation-delay') || '0s' // Retardo opcional

    // Establecemos el retraso de la animación
    osElement.css({
      '-webkit-animation-delay': osAnimationDelay,
      '-moz-animation-delay': osAnimationDelay,
      'animation-delay': osAnimationDelay
    })

    var osTrigger = trigger ? trigger : osElement // Definimos el trigger

    // Configuramos Waypoint
    new Waypoint({
      element: osTrigger[0], // Pasamos el DOM nativo
      handler: function (direction) {
        if (direction === 'down') {
          // Cuando el usuario baja, agregamos la animación
          osElement.addClass('animate__animated ' + osAnimationClass)
        } else if (direction === 'up') {
          // Cuando el usuario sube, eliminamos la animación
          osElement.removeClass('animate__animated ' + osAnimationClass)
        }
      },
      offset: '75%' // Ajusta el porcentaje para activar la animación
    })

    // Configuramos otro Waypoint para eliminar la clase cuando se salga del viewport
    new Waypoint({
      element: osTrigger[0],
      handler: function (direction) {
        if (direction === 'down') {
          osElement.removeClass('animate__animated ' + osAnimationClass) // Elimina la animación al salir hacia abajo
        }
      },
      offset: '-20%' // Ajusta el porcentaje para eliminar la clase al salir
    })
  })
}

$(document).ready(function () {
  onScrollInit($('.os-animation')) // Aplica la función a los elementos con la clase .os-animation
})
