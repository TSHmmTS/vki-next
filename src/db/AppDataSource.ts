import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Student } from './entity/Student.entity';
import { Group } from './entity/Group.entity';
import { User } from './entity/User.entity';
import { hashPassword } from '@/utils/password';

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

const ensureSeedUsers = async (): Promise<void> => {
  const repository = AppDataSource.getRepository(User);
  const defaultUsers = [
    {
      email: 'admin@example.com',
      fullName: 'Администратор Системы',
      password: hashPassword('admin123'),
    },
  ];

  await Promise.all(defaultUsers.map(async user => {
    const exists = await repository.findOne({
      where: { email: user.email },
    });

    if (!exists) {
      await repository.save(repository.create(user));
    }
  }));
};

await dbInit();

if (AppDataSource.isInitialized) {
  await ensureSeedUsers();
}

export default AppDataSource;