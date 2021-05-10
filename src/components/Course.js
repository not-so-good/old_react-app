import { useEffect, useState } from 'react';
import { read, insert, update, remove } from '../services/apiService';

const Course = ({ match, history }) => {

    const [id] = useState(match.params.id);
    const [course, setCourse] = useState({
        _id: '0',
        name: '',
        points: 0
    });

    useEffect(() => {
        if (id !== '0') {
            read('courses', id, data => {
                if (data) setCourse(data);
            })
        }
    }, [id]);

    function changeHandler(e) {
        setCourse({
            ...course,
            [e.target.name]: e.target.value
        });
    }

   function inputValidation() {
        var n = course.name;
        var m = course.points;
        if (n === '') {
            console.log('Input a course name!');
            return false;
        }
        if (m === 0) {
            console.log('Input a course points!');
            return false;
        }
        return true;
    }

    const back = () => {
        history.push('/courses');
    }

    const del = () => {
        remove('courses', id, (err, result) => {
            history.push('/courses');
        });
    }

    const save = () => {
        const valid = inputValidation();
        if (valid) {
            if (id === '0') {
                delete course._id;
                insert('courses', course, data => {
                    if (data) return history.push('/courses');
                    console.log('There was error during save data');
                })
            } else {
                update('courses', id, course, data => {
                    if (data) return history.push('/courses');
                    console.log('There was error during save data');

                })
            }
        }
    }

    return (
        <div className='container'>
            <h2>Course</h2>
            <form className='input-form'>
                <div style={{ margin: '12px 0' }}>
                    <label htmlFor='name'>Course name: </label>
                    <input type='text'
                        name='name'
                        value={course.name}
                        onChange={changeHandler} required />
                </div>
                <div style={{ margin: '12px 0' }}>
                    <label htmlFor='points'>Course points: </label>
                    <input type='number'
                        name='points'
                        value={course.points}
                        onChange={changeHandler} required />
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

export default Course;
