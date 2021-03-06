import React from 'react'
import { Formik, Field } from 'formik'
import { navigate } from 'gatsby-link'
import validationSchema from './validationSchema'
import { encode } from '../../utils'

const ContactForm = () => {
  return (
    <Formik
      initialValues={{ name: '', email: '', message: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        fetch("/?no-cache=1", {                                 //eslint-disable-line
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encode({
            'form-name': 'contact',
            ...values,
          }),
        })
          .then(() => {
            navigate('/success')
            setSubmitting(false)
          })
          .catch(error => {
            console.log(error)
            alert('Error: Please Try Again!')                            //eslint-disable-line
            setSubmitting(false)
          })
      }}
      render={({
        errors,
        touched,
        isSubmitting,
        handleSubmit,
        handleReset,
      }) => (
        <form
          className='pa5 black-80 measure center'
          name='contact'
          onSubmit={handleSubmit}
          onReset={handleReset}
          data-netlify='true'
          data-netlify-honeypot='bot-field'
        >
          <div className='mt3'>
            <label htmlFor='name' className='f6 b db mb2'>Name</label>
            <Field
              className='db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2'
              type='text'
              id='name'
              name='name'
              aria-label='Name'
            />
            {touched.name && errors.name && <p className='f6 red'>{errors.name}</p>}
          </div>
          <div className='mt3'>
            <label htmlFor='email' className='f6 b db mb2'>Email</label>
            <Field
              className='db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2'
              type='email'
              id='email'
              name='email'
              aria-label='Email'
            />
            {touched.email && errors.email && <p className='f6 red'>{errors.email}</p>}
          </div>
          <div className='mt3 mb3'>
            <label htmlFor='message' className='f6 b db mb2'>Message</label>
            <Field
              className='db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2'
              component='textarea'
              rows='6'
              id='message'
              name='message'
              aria-label='Message'
            />
            {touched.message && errors.message && <p className='f6 red'>{errors.message}</p>}
          </div>
          <div className='mt5 measure tr'>
            <input
              id='clear'
              name='clear'
              aria-label='Clear'
              type='reset'
              value='Clear'
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib mr3'
            />
            <input
              id='submit'
              name='submit'
              aria-label='Send Message'
              type='submit'
              value='Send Message'
              disabled={isSubmitting}
              className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
            />
          </div>
        </form>
      )}
    />
  )
}

export default ContactForm
