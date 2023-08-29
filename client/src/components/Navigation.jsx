import {Link} from 'react-router-dom'

export function Navigation() {
  return (
    <div className='flex justify-between py-3'>
        <Link to="/tasks">
          <h1 className='font-bold text-3x1 mb-4'>Task App</h1>
        </Link>
        <Link className='bg-indigo-500 px-3 py-3 rounded-lg' to="/tasks-create">Create task</Link>
    </div>
  )
}