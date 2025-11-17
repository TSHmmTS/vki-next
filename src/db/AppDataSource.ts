import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Student } from './entity/Student.entity';
import { Group } from './entity/Group.entity';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB ?? './db/vki-web.db',
  entities: [Group, Student],
  synchronize: true,
  logging: false,
});

export const dbInit = async (): Promise<void> => {
  try {
    if (AppDataSource.isInitialized){
      console.log('>>> AppDataSource.isInitialized');
      return;
    }
    await AppDataSource.initialize();
    console.log('>>> AppDataSource.isInitialized');
  }
  catch (error) {
    console.log(error);
  }
};

await dbInit();

/* const init = async (): Promise<void> => {
   try {
     await AppDataSource.initialize();
   }
   catch (error) {
     console.log(error);
   }
 };

 await init();*/

export default AppDataSource;