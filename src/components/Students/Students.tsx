'use client';

import useStudents from '@/hooks/useStudents';
import useGroups from '@/hooks/useGroups';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';
import Student from './Student/Student';
import AddStudent, { type FormFields } from './AddStudent/AddStudent';
import { v4 as uuidv4 } from 'uuid';
import { AutoEncrypter } from 'typeorm';

const Students = (): React.ReactElement => {
  const {
    students,
    deleteStudentMutate,
    addStudentMutate,
  } = useStudents();
  const { groups } = useGroups();

  const onDeleteHandler = (studentId: number): void => {
    if (confirm('Удалить студента?')) {
      debugger;
      console.log('onDeleteHandler', studentId);

      deleteStudentMutate(studentId);
    }
  };

  const onAddHandler = (studentFormField: FormFields): void => {
    const fallbackGroupId = groups[0]?.id ?? 1;
    const studentGroupId = Number.isFinite(studentFormField.groupId) ? studentFormField.groupId : fallbackGroupId;

    debugger;
    console.log('Добавление студента', studentFormField);

    addStudentMutate({
      id: -1,
      ...studentFormField,
      groupId: studentGroupId,
      uuid: uuidv4(),
    });
  };

  return (
    <div className={styles.Students}>
      <AddStudent onAdd={onAddHandler}/>
      {students.map((student: StudentInterface) => (
        <Student
          key={student.id || student.uuid}
          student={student}
          onDelete={onDeleteHandler}
        />
      ))}
    </div>
  );
};

export default Students;
