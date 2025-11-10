import type StudentInterface from '@/types/StudentInterface';
import useGroups from '@/hooks/useGroups';
import styles from './Student.module.scss';

interface Props {
  student: StudentInterface;
  onDelete: (id: number) => void;
}

const Student = ({ student, onDelete }: Props): React.ReactElement => {
  const { groups } = useGroups();
  const groupName = groups.find(g => g.id === student.groupId)?.name ?? '';
  const onDeleteHandler = (): void => {
    onDelete(student.id);
  };

  const modifier = student.isDeleted ? '--isDeleted' : student.isNew ? '--isNew' : '';

  return (
    <div className={`${styles.Student} ${styles[modifier]}`}>
      {`${student.id || 'xxxx'} - ${student.lastName} ${student.firstName} ${student.middleName}${groupName ? ` (группа: ${groupName})` : ''}`}
      <button onClick={onDeleteHandler}>Удалить</button>
    </div>
  );
};

export default Student;
