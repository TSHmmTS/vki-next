import type StudentInterface from "@/types/StudentInterface";
import useGroups from "@/hooks/useGroups";
import { useForm, type SubmitHandler } from "react-hook-form";
import styles from './AddStudent.module.scss';

export type FormFields = Pick<StudentInterface, 'firstName' | 'lastName' | 'middleName' | 'groupId'>;

interface Props {
    onAdd: (studentForm: FormFields) => void;
}

const AddStudent = ({ onAdd }: Props): React.ReactElement => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormFields>();
    const { groups } = useGroups();

    const onSubmit: SubmitHandler<FormFields> = studentForm => onAdd(studentForm);

    return (
        <div className={styles.AddStudent}>
            <h2>Добавление студента</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="Фамилия" {...register('lastName', { required: true })}/>
                <input placeholder="Имя" {...register('firstName', { required: true })}/>
                <input placeholder="Отчество" {...register('middleName', { required: true })}/>
                {errors.middleName && <div>Обязательное поле</div>}

                <select {...register('groupId', { required: true, valueAsNumber: true })}>
                    <option value="">Выберите группу</option>
                    {groups.map(g => (
                        <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                </select>

                <input type="submit" value="Добавить"/>
            </form>
        </div>
    );
};

export default AddStudent;