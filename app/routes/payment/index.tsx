import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import axios from 'axios'

export async function action ({ request }: ActionFunctionArgs) {
  try {
    const body = await request.formData()
    const name = body.get('name')
    const amount = body.get('amount')
    const email = body.get('email')
    console.log('name', amount)
    const backend = await axios.post(
      'http://localhost:3000/initialize-payment',
      {
        name,
        amount,
        email
      }
    )
    console.log('backend', backend)
    if (backend.status === 200) {
      console.log('backend', backend)
      const data = backend?.data?.data
      return redirect(data?.authorization_url)
    }
    return backend
  } catch (error) {
    console.log('error', error)
  }
}

const Payment = () => {
  const actionData = useActionData()
  console.log('actionData', actionData)
  return (
    <div style={{ width: '500px' }}>
      <Form
        style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
        method='post'
      >
        <input type='text' name='name' placeholder='Name' />
        <input type='text' name='email' placeholder='Email' />
        <input type='number' name='amount' placeholder='amount' />

        <button type='submit'>Pay</button>
      </Form>
    </div>
  )
}

export default Payment
