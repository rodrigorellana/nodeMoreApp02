'use strict';
var dao = require('./dao');

var Customer = function() {
    var self = this;
    self.results = {};
    self.apiClient = {};
    self.apiURL = +'/customers/';
    // self.apiURL = + '/customers/' + cumtomerID + '/users';

    self.getAll = function(cumtomerID) {
        return new Promise(function(resolve, reject) {
            dao.get(self.apiURL).exec(function(error, data) {
                if (error)
                    reject(error);
                else
                    resolve(data);
            });
        });
    };

    self.getOne = function(cumtomerID) {
        self.cumtomerID = cumtomerID;

        return new Promise(function(resolve, reject) {
            dao.get({ _id: idWorkflowSettings })
                .exec(function(error, data) {
                    if (error)
                        reject(error);
                    else
                        resolve(data);
                });
        });
    };

    self.createUser = function(newUserEmail) {

    }

    //doing
    self.getRolesFromStage = function(stageIndex) {
        // this function is open to type it from user interface, then must return email
        // comma separated values from all users from the rol calls from typing user
        // interface: getRolesFromStage('0','all') getRolesFromStage('2','Bodegueros')
        // getRolesFromStage('2', 'Bodegueros,Almacen')  -> todo later var passingRole =
        // rol;
        self
            .getWfSettings(self.idWorkflowSettings)
            .then(function(data) {
                var wf = data; //preguntar a marcelo como efectuar querys en mongoose
                var targetStage = wf.stages[stageIndex];
                if (!targetStage)
                    throw new Error('No se pudo encontrar la etapa al tratar de obtener los roles');

                if (!targetStage.roles || targetStage.roles === 0)
                    throw new Error('La etapa indicada desde donde obtener los roles no tiene ningun rol asociado.');

                // targetStage.roles.forEach(function(passingRole) { }, this);

            }).catch(function(errorMsg) {
                let erroObj = self.createReturnObject(false, errorMsg, null, null);
                return erroObj;
            });
    };

};

module.exports = new Customer();
