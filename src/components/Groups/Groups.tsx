'use client';

import useGroups from '@/hooks/useGroups';
import useStudents from '@/hooks/useStudents';
import type GroupInterface from '@/types/GroupInterface';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Groups.module.scss';

const Groups = (): React.ReactElement => {
  const { groups } = useGroups();
  const { students } = useStudents();

  return (
    <div className={styles.Groups}>
      {groups.map((group: GroupInterface) => {
        const groupStudents = students.filter((s: StudentInterface) => s.groupId === group.id);
        return (
          <div key={group.id}>
            <h2>{group.name}</h2>
            {!!groupStudents.length && (
              <ul>
                {groupStudents.map(s => (
                  <li key={s.id || s.uuid}>{`${s.lastName} ${s.firstName} ${s.middleName}`}</li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Groups;
