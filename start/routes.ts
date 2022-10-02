import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/words', 'WordsController').apiOnly()
}).prefix('/api')
