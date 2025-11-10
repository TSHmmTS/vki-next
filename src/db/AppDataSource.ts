import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Group } from './entity/Group.entity';
import { Student } from './entity/Student.entity';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB ?? './db/vki-web.db',
  entities: [Group, Student],
  synchronize: true,
  logging: false,
});

 const init = async (): Promise<void> => {
   try {
     await AppDataSource.initialize();
   }
   catch (error) {
     console.log(error);
   }
 };

AppDataSource.initialize()
  .then(async () => {
    console.log('Data Source has been initialized!');

    const groupRepository = AppDataSource.getRepository(Group);
    const defaultGroups = [
      { name: '2207А1', contacts: 'Контакты не указаны' },
      { name: '2207А2', contacts: 'Контакты не указаны' },
    ];

    for (const group of defaultGroups) {
      const exists = await groupRepository.findOne({ where: { name: group.name } });

      if (!exists) {
        await groupRepository.save(group);
      }
    }
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

export default AppDataSource;