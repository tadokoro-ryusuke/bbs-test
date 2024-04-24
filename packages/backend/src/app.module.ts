import * as path from 'path';

import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';

import {FirebaseModule} from '@/firebase/firebase.module';
import {ThreadIndexModule} from '@/thread/thread.index.module';
import {UserIndexModule} from '@/user/user.index.module';

import {PrismaModule} from './prisma/prisma.module';
import {ThreadModule} from './thread/core/thread.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), 'src/generated/graphql/schema.gql'),
      sortSchema: true,
    }),
    ThreadIndexModule,
    UserIndexModule,
    FirebaseModule,
    PrismaModule,
    ThreadModule,
  ],
})
export class AppModule {}
