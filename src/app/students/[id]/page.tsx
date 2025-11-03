import Student from '@/components/Students/Student';
import Page from '@/components/layout/Page/Page';

interface Params {
  params: { id: string };
}

const StudentPageById = ({ params }: Params): React.ReactNode => {
  const studentId = Number(params.id);

  return (
    <Page>
      <h1>Студент</h1>
      <Student studentId={studentId} />
    </Page>
  );
};

export default StudentPageById;


