"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicRepository = void 0;
var typeorm_1 = require("typeorm");
/** Class representing a basic repository  */
var BasicRepository = /** @class */ (function () {
    /**
    * @param  {ObjectType<T>} entity
    */
    function BasicRepository(entity) {
        this.entity = entity;
        this.repository = typeorm_1.getRepository(entity);
    }
    /**
     * 儲存單一 Entity<T> 的資料
     *
     * @param  {T} data - Single data to save
     * @return {Promise<T>}
     */
    BasicRepository.prototype.save = function (data) {
        return this.repository.save(data);
    };
    /**
     * 儲存多筆 Entity<T> 的資料
     *
     * @param  {T} data - Multiple data to save
     * @return {Promise<T>}
     */
    BasicRepository.prototype.saveMany = function (data) {
        return this.repository.save(data);
    };
    /**
     * 尋找資料
     *
     * @param  {FindConditions<T>[]} [condition] - Used for find operations
     * @return {Promise<T>}
     */
    BasicRepository.prototype.find = function (condition) {
        var options = {
            where: condition,
        };
        return this.repository.find(options);
    };
    /**
     * 尋找符合條件的第一筆資料
     *
     * @param  {FindConditions<T>} [conditions] - Used for find operations
     * @param  {FindOneOptions<T>} [options] - Special criteria, like: select,
     * where, relation, join, order
     * @return {Promise<T|undefined>}
     */
    BasicRepository.prototype.findOne = function (conditions, options) {
        return this.repository.findOne(conditions, options);
    };
    /**
     * 更新指定欄位的資料
     *
     * @param  {FindConditions<T>} conditions - Given conditions
     * @param  {QueryDeepPartialEntity<T>} data - Updates entity partially
     * @return {Promise<UpdateResult>}
     */
    BasicRepository.prototype.update = function (conditions, data) {
        return this.repository.update(conditions, data);
    };
    return BasicRepository;
}());
exports.BasicRepository = BasicRepository;
