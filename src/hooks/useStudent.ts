import { useQueryClient } from '@tanstack/react-query';
import type StudentInterface from '@/types/StudentInterface';

const useStudent = (studentId: number): StudentInterface | undefined => {
  const queryClient = useQueryClient();
  const students = queryClient.getQueryData<StudentInterface[]>(['students']) ?? [];
  return students.find(s => s.id === studentId);
};

export default useStudent;


