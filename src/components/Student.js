import { useEffect, useState } from 'react';
import { read, insert, update, remove } from '../services/apiService';

const Student = ({ match, history }) => {


    const [id] = useState(match.params.id);
    const [student, setStudent] = useState({
        _id: '0',
        firstName: '',
        lastName: '',
        yearOfBirth: '',
        address: ''
    });

    useEffect(() => {
        if (id !== '0') {
            read('students', id, data => {
                if (data) setStudent(data);
            })
        }
    }, [id]);

    function changeHandler(e) {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    }

    function inputValidation() {
        var n = student.firstName;
        var m = student.lastName;
        if (n === '') {
            console.log("Enter the student's first name!");
            return false;
        }
        if (m === '') {
            console.log("Enter the student's last name!");
            return false;
        }
        return true;
    }

    const back = () => {
        history.push('/students');
    }

    const del = () => {
        remove('students', id, (err, result) => {
            history.push('/students');
        });
    }

    const save = () => {
        const valid = inputValidation();
        if (valid) {
            if (id === '0') {
                delete student._id;
                insert('students', student, data => {
                    if (data) return history.push('/students');
                    console.log('There was error during save data');
                })
            } else {
                update('students', id, student, data => {
                    if (data) return history.push('/students');
                    console.log('There was error during save data');

                })
            }
        }
    }

    return (
        <div className='container'>
            <h2>Student</h2>
            <form className='input-form'>
                <div style={{ margin: '12px 0' }}>
                    <label htmlFor='name'>Student First name: </label>
                    <input type='text'
                        name='firstName'
                        value={student.firstName}
                        onChange={changeHandler} required />
                </div>
                <div style={{ margin: '12px 0' }}>
                    <label htmlFor='points'>Student Last name: </label>
                    <input type='text'
                        name='lastName'
                        value={student.lastName}
                        onChange={changeHandler} required />
                </div>
                <div style={{ margin: '12px 0' }}>
                    <label htmlFor='points'>Students Year Of Birth: </label>
                    <input type='text'
                        name='yearOfBirth'
                        value={student.yearOfBirth}
                        onChange={changeHandler} />
                </div>
                <div style={{ margin: '12px 0' }}>
                    <label htmlFor='points'>Students Adress: </label>
                    <input type='text'
                        name='address'
                        value={student.address}
                        onChange={changeHandler} />
                </div>
                <hr />
                <div className='left'>
                    <button type='button' onClick={del}>DELETE</button>
                </div>
                <div className='right'>
                    <button type='button' onClick={back}>BACK</button>
                    &nbsp;&nbsp;
                    <button type='button' onClick={save}>SAVE</button>
                </div>
            </form>
        </div>
    );
}

export default Student;
