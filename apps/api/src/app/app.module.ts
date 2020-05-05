import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DocumentsModule } from './documents/documents.module';
import { SocketsModule } from './sockets/sockets.module';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from './../environments/environment';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'doc-collab'),
      exclude: ['/api*']
    }),
    MongooseModule.forRoot(environment.dbURI as string, {useNewUrlParser: true, useUnifiedTopology: true}),
    AuthModule,
    UsersModule,
    DocumentsModule,
    SocketsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
