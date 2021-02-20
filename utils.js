const fs = require('fs');


const checkId = (req, res, next) => {
    const { id } = req.params;
    if(id.length !== 36){
        res.status(400).send('{"message": "Invalid Bin Id provided"}');
    }
    next();
};

const checkBin = (req, res, next) => {
    const { id } = req.params;
    const binExist = fs.existsSync(`./bins/${id}.json`);
    if(!binExist){
        res.status(404).json({"message": "Bin Not Found"});
        return;
    }
    next();
};

const checkIfBlank = (req, res, next) => {
    if(req.body && Object.keys(req.body).length === 0 && req.body.constructor === Object){
        res.status(400).send({"message": "Bin cannot be blank"});
        return;
    }
    next();
}

module.exports = { checkId, checkBin, checkIfBlank };