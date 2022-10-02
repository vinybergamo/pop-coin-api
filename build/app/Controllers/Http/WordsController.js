"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Word_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Word"));
class WordsController {
    async index({ response }) {
        const words = await Word_1.default.all();
        if (words.length > 0) {
            return response.status(200).send(words);
        }
        return response.send('Words not found!');
    }
    async store({ request, response }) {
        const body = request.body();
        try {
            const saveWords = await Word_1.default.create(body);
            return response.status(201).send({
                message: 'Data saved successfully!',
                data: saveWords,
            });
        }
        catch (error) {
            return response.status(500).send({
                error: error,
                message: 'Error when saving data!',
            });
        }
    }
    async destroy({ params, response }) {
        const deleteWords = await Word_1.default.findOrFail(params.id);
        try {
            deleteWords.delete();
            return response.status(200).send({ message: 'Data deleted successfully!', data: deleteWords });
        }
        catch (error) {
            return response.status(500).send({
                error: error,
                message: 'Error deleting data!',
            });
        }
    }
    async show({ params, response }) {
        const word = await Word_1.default.find(params.id);
        if (word) {
            return response.status(200).send(word);
        }
        return response.send('Word not found!');
    }
}
exports.default = WordsController;
//# sourceMappingURL=WordsController.js.map