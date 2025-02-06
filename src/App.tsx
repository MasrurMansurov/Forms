import { useFieldArray, useForm } from 'react-hook-form';
import './App.css'

type formValue = {
  username: string,
  email: string,
  channel: string,
  social: {
    twitter: string,
    facebook: string,
  };
  phoneNumbers: string[],
  phNumbers: {
    number: string
  }[]
}

function App() {
  const form = useForm<formValue>({
    defaultValues: {
      username: '',
      email: '',
      channel: '',
      phoneNumbers: [''],
      phNumbers: [{ number: '' }]
    }
  })

  const { register, control, handleSubmit, formState: {errors} } = form

  const {fields, append, remove} = useFieldArray({
    name: 'phNumbers',
    control,
  })

  const onSubmit = (data: formValue) => {
    console.log('Form submited', data);
  }

  return (
    <>
      <div className='main'>
        <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className='main-text'>YouTube Form</h1>

        {/* User Name */}
            <div className='form-control'>
              <label htmlFor="username">Username</label>
              <input
              className='input'
                type="text"
                id="username"
                {...register('username', { 
                  required: {
                  value: true,
                  message: 'Username is required',
                } 
              })}
              />
              <p className='error'>{errors.username?.message}</p>
            </div>

        {/* Email */}
            <div className='form-control'>
              <label htmlFor="email">Email</label>
              <input 
              className='input'
              type="text" 
              id="email"
              {...register('email', {
                pattern: {
                  value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                  message: 'Please enter a valid email address',
                },
                validate: {
                  notAdmin: (fieldValue) => {
                    return (
                      fieldValue !== 'admin@example.com' || 
                      'Enter a different email address'
                    )
                  },
                  notBlackListed: (fieldValue) => {
                    return (
                      !fieldValue.endsWith('baddomain.com') || 
                      'This domain is not supported '
                    )
                  }
                }
              })}
              />
              <p className='error'>{errors.email?.message}</p>
            </div>

          {/* YouTube Channel */}
            <div className='form-control'>
              <label htmlFor="channel">YouTube Channel</label>
              <input 
              className='input'
              type="text" 
              id="channel"
              {...register('channel', {
                required: {
                  value: true,
                  message: 'Channel is required'
                }
              })} 
              />
              <p className='error'>{errors.channel?.message}</p>
            </div>

          {/* Primary Phone Number */}
            <div className='form-control'>
              <label htmlFor="primary-phone">Primary phone number</label>
              <input 
              className='input'
              type="text" 
              id='primary-phone'
              {...register('phoneNumbers.0', {
                required: {
                  value: true,
                  message: 'Phone number is required'
                }
              })}
              />
              <p className='error'>{errors.phoneNumbers?.message}</p>
            </div>

            {/* Secondary Phone Number */}
              <div className='form-control'>
                  <div>
                    {
                      fields.map((field, index)=> {
                        return (
                          <div className='phone-fields' key={field.id}>
                            <label>Secondary phone number</label>
                            <input 
                            className='input'
                            type="text"
                            {...register(`phNumbers.${index}.number`)}
                             />
                              <button type='button' className='remove-btn' onClick={()=> remove(index)}>Remove</button>
                             <p className='error'>{errors.phNumbers?.message}</p>
                          </div>
                        )
                      })
                    }
                    <button type='button' className='add-phone' onClick={()=> append({ number: '' })}>Add phone number</button>
                  </div>
              </div>
            <button type='submit' className='submit'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default App
