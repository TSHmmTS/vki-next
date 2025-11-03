'use client';

import useStudent from '@/hooks/useStudent';
import BackLink from '@/components/layout/BackLink/BackLink';

interface Props {
  studentId: number;
}

const Student = ({ studentId }: Props): React.ReactElement => {
  const student = useStudent(studentId);

  if (!student) {
    return (
      <div>
        <BackLink href="/students">{'<< список студентов'}</BackLink>
        Студент не найден
      </div>
    );
  }

  return (
    <div>
      <BackLink href="/students">{'<< список студентов'}</BackLink>
      <h2>{`${student.lastName} ${student.firstName} ${student.middleName}`}</h2>
      <div>{`ID: ${student.id}`}</div>
      <div>{`Группа: ${student.groupId}`}</div>
    </div>
  );
};

export default Student;


