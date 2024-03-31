import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import axios from 'axios'

export async function loader ({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url).searchParams
  const referenceId = url.get('reference')
  console.log('referenceId', referenceId)
  if (referenceId) {
    console.log('referenceId', referenceId)
    const response = await axios.get(
      `http://localhost:3000/verify/${referenceId}`
    )               
    console.log(response.data)
    const status = response.status
    if (status === 200) {
      return redirect('/payment')
    }
  }
  return redirect('/error')
}

const VerifyMe = () => {
  return <div>VERIFY ME</div>
}

export default VerifyMe
