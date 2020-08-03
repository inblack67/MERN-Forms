import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import M from 'materialize-css'

const Registration = () => {

    const { register, handleSubmit, errors } = useForm(
        {
            defaultValues: {
                name: 'Aman',
                email: 'aman@gmail.com',
                password: 'Aman123@',
                prime: true,
            }
        }
    );

    const [submitting, setSubmitting] = useState(false);

    return (
        <div>
            <form onSubmit={handleSubmit(async formData => {
                setSubmitting(true)
                try {
                    const res = await axios.post('/api/register', formData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    M.toast({ html: res.data.msg })
                } catch (err) {
                    console.error(err)
                    if(err.response.data){
                        M.toast({ html: err.response.data.msg })
                    }
                }
                setSubmitting(false)
            })}>
                <div className="input-field">
                    <input type="text" name='name' ref={register({ required: 'Required!' })} />
                    <label htmlFor="name">Name</label>
                    { errors.name ? <span className='helper-text red-text'>
                        { errors.name.message }
                    </span> : null }
                </div>
                <div className="input-field">
                    <input type="email" name='email' ref={register({ required: 'Required!' })} />
                    <label htmlFor="email">Email</label>
                    { errors.email ? <span className='helper-text red-text'>
                        { errors.email.message }
                    </span> : null }
                </div>
                <div className="input-field">
                    <input type="password" name='password' ref={register({ required: 'Required!', 
                    minLength: {
                        value: 8,
                        message: 'Must Be 8 Chars'
                    }, 
                    validate: value => {
                        return (
                          [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
                            pattern.test(value)
                          ) || "must include lower, upper, number, and special chars"
                        );
                      },
                    })} />
                    <label htmlFor="password">Password</label>
                    { errors.password ? <span className='helper-text red-text'>
                        { errors.password.message }
                    </span> : null }
                </div>
                <div className="input-field">
                    <label htmlFor="prime">
                        <input id='prime' type="checkbox" name='prime' ref={register()} 
                        />
                        <span>Prime?</span>
                    </label>
                </div>
                <div className="input-field">
                    <button disabled={submitting} type="submit" className='btn red'>
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Registration
