/*jslint node:true es6:true*/
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    LEAN = 'lean',
    P8Schema = function (props) {
        'use strict';
        props.hgId = {type: String, default: ''};
        props.CreatedBy = {type: String, default: ''};
        props.CreatedDate = {type: Number, default: Date.now};
        props.ModifiedBy = {type: String, default: ''};
        props.ModifiedDate = {type: Number, default: Date.now};
        var baseSchema = new Schema(props, {
                _id: true,
                autoIndex: false
            }),
            injectLeanOption = function (mongooseObject) {
                var mLeanOptions = Object.keys(mongooseObject._mongooseOptions).some(function (item) {
                    return item === LEAN && !mongooseObject._mongooseOptions[LEAN];
                });
                if (!mLeanOptions) {
                    mongooseObject._mongooseOptions.lean = true;
                }
            };
        baseSchema.index({hgId: 1}, {unique: false});
        baseSchema.set('toJSON', {
            virtuals: true
        });
        baseSchema.pre('save', function (next) {
            var self = this;
            self.validate(function (error) {
                if (error) {
                    return next(error);
                }
                var now = Date.now();
                if (self.isNew) {
                    self._doc._id = new mongoose.Types.ObjectId();
                    self._doc.CreatedDate = self._doc.CreatedDate || now;
                    self._doc.ModifiedDate = self._doc.ModifiedDate || now;
                    self._doc.ModifiedBy = self._doc.ModifiedBy || self._doc.CreatedBy;
                } else {
                    if (self.ModifiedDate) {
                        self.ModifiedDate = now;
                    }
                }
                next();
            });
        });
        baseSchema.pre('findOneAndUpdate', function (next) {
            this.options.runValidators = true;
            this.update({}, {
                $set: {
                    ModifiedDate: Date.now()
                }
            });
            next();
        });
        baseSchema.pre('update', function (next) {
            this.options.runValidators = true;
            this.update({}, {
                $set: {
                    ModifiedDate: Date.now()
                }
            });
            next();
        });
        baseSchema.post('update', function (data) {
            //With upgrade to MongoDB Driver 2.0, update methods now return
            //raw mongodb server result instead of the number of records affected
            //For backward compability I am changing the result format
            data.result = data.result.n;
        });
        baseSchema.pre('findOne', function () {
            injectLeanOption(this);
        });
        baseSchema.pre('find', function () {
            injectLeanOption(this);
        });
        return baseSchema;
    };
module.exports = P8Schema;