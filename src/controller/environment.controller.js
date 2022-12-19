const express = require('express');
const { Service } = require('../services/environment.service')
const { isValidId, isValidSkills } = require('../helper/validation')
const { buildResponse } = require('../helper/buildResponse')
const service = new Service()


class Controller {
    
    constructor() {
        this.route = express.Router();
        this.bindAction();
    }

    bindAction() {
        this.route.get('/', async function (req, res) {
            try {
                const environment = await service.getEnvironment();
                res.status(200).send(environment)
            } catch (error) {
                res.status(500).send(error.message)
            }
        })

        this.route.get('/:id', isValidId, async function (req, res) {
            try {
                const { id } = req.params;
                const environment = await service.getEnvironmentById(id)
                buildResponse(res, 200, environment)
            } catch (error) {
                buildResponse(res, 500, error.message)
            }
        })

        this.route.post('/', isValidSkills, async function (req, res) {

            try {
                const { label, category, priority } = req.body
                const environment = await service.createEnvironment(label, category, priority)
                buildResponse(res, 200, environment)
            } catch (error) {
                buildResponse(res, 500, error.message)
            }
        })

        this.route.put('/:id', isValidId, isValidSkills, async function (req, res) {
            try {
                const { id } = req.params;
                const { label, category, priority } = req.body
                const environment = await service.updateEnvironment(id, label, category, priority)
                buildResponse(res, 200, environment)
            } catch (error) {
                buildResponse(res, 500, error.message)
            }
        })

        this.route.patch('/:id', isValidId, async function (req, res) {
            try {
                const { id } = req.params
                const environment = await service.patchEnvironment(id, req.body)
                buildResponse(res, 200, environment)
            } catch (error) {
                buildResponse(res, 500, error.message)

            }
        })

        this.route.delete('/:id', isValidId, async function (req, res) {
            try {
                const { id } = req.params
                const environment = await service.deleteEnvironment(id)
                buildResponse(res, 200, environment)
            } catch (error) {
                buildResponse(res, 500, error.message)
            }
        })
    }

}

module.exports = Controller