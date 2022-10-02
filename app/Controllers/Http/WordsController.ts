import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Word from 'App/Models/Word'

export default class WordsController {
  public async index({ response }: HttpContextContract) {
    const words = await Word.all()
    if (words.length > 0) {
      return response.status(200).send(words)
    }

    return response.send('Words not found!')
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    try {
      const saveWords = await Word.create(body)

      return response.status(201).send({
        message: 'Data saved successfully!',
        data: saveWords,
      })
    } catch (error) {
      return response.status(500).send({
        error: error,
        message: 'Error when saving data!',
      })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const deleteWords = await Word.findOrFail(params.id)

    try {
      deleteWords.delete()
      return response.status(200).send({ message: 'Data deleted successfully!', data: deleteWords })
    } catch (error) {
      return response.status(500).send({
        error: error,
        message: 'Error deleting data!',
      })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const word = await Word.find(params.id)

    if (word) {
      return response.status(200).send(word)
    }
    return response.send('Word not found!')
  }
}
