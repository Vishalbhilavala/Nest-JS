import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserModel } from '../models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { Messages } from '../libs/utils/message'
import { HandleResponse } from 'src/libs/service/handleResponce';
import { ResponseData } from 'src/libs/utils/responce';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserModel)
        private readonly userModel: typeof UserModel
    ) { }

    async getUsers() {
        const users = await this.userModel.findAll({});

        if (!users || users.length === 0) {
            Logger.error(`Product ${Messages.NOT_FOUND}`)
            return HandleResponse(
                HttpStatus.NOT_FOUND,
                ResponseData.ERROR,
                `Product ${Messages.NOT_FOUND}`,
                undefined,
            )
        }

        Logger.log(`Product ${Messages.GET_SUCCESS}`)
        return HandleResponse(
            HttpStatus.OK,
            ResponseData.SUCCESS,
            `Product ${Messages.GET_SUCCESS}`,
            { users }
        )
    }

    async createUser(dto: any) {
        const {
            name, email, password,
        } = dto;

        const allReadyExist = await this.userModel.findOne({ where:{ email }});
        if (allReadyExist) {
            Logger.error(`Email ${Messages.ALREADY_EXIST}`);
            return HandleResponse(
                HttpStatus.BAD_REQUEST,
                ResponseData.ERROR,
                `Email ${Messages.ALREADY_EXIST}`,
                undefined,
            )
        }

        const addUser = await this.userModel.create({ name, email, password })
        
        Logger.log(`User ${Messages.ADD_SUCCESS}`)
        return HandleResponse(
            HttpStatus.CREATED,
            ResponseData.SUCCESS,
            `User ${Messages.ADD_SUCCESS}`,
            {userId: addUser.id}
        )
    }
}
