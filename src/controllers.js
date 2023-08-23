const questionModel = require('./models')

async function read(req, res) {

    try {
        const data = await questionModel.find();
        console.log(data)
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

}

async function sendAnswer(req, res) {
    try {
        const {id} = req.query
        const {answer} = req.body

        const question = await questionModel.findById(id)

        if(answer === question.answer) {
            res.send('A resposta está exata');
        }else{
            res.send('A resposta está errada');
        }

        
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    read,
    sendAnswer
}