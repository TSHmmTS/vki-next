import { studentService } from '@/services/StudentSercice';

export async function GET(): Promise<Response> {
  const students = await studentService.addRandomStudents();

  return new Response(JSON.stringify(students), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};