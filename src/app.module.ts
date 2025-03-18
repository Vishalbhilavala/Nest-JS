import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import * as dotenv from 'dotenv';
dotenv.config();

const config: any ={
  dialect: 'mysql',
  autoLoadModels: true,
  models:[
    UserModel
  ],
  define:{
    timestamps: false,
  },
}

@Module({
  imports: [UserModule,
    SequelizeModule.forRoot({
      ...config,
      host: process.env.HOST,
      port: process.env.DB_PORT,
      username: process.env.DATABASE_USER_NAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
