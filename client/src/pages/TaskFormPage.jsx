import {useEffect} from 'react'
import {set, useForm} from 'react-hook-form'
import {createTask, deleteTask, updateTask, getTask} from '../api/tasks.api'
import {useNavigate, useParams} from 'react-router-dom'
import {toast} from 'react-hot-toast'

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue
  } = useForm()

  const navigate = useNavigate()
  const params = useParams()

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data)
      toast.success("Task updated", {
        position: "top-center",
        style: {
          background: "#101010",
          color: "#fff"
        }
      })
    } else {
      await createTask(data)
      toast.success("Task created", {
        position: "top-center",
        style: {
          background: "#101010",
          color: "#fff"
        }
      })
    }
    navigate("/tasks")
  })

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const {data} = await getTask(params.id)
        setValue('title', data.title)
        setValue('description', data.description)
      }
    }
    loadTask()
  }, [])

  return (
    <div className='max-w-xl mx-auto'>
      <form onSubmit={onSubmit}>
        <input className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
          type="text"
          placeholder="Title"
          {...register("title", {required: true})}
        />
        {errors.title && <span>Title is required</span>}
        <textarea className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
          rows="3"
          placeholder="Description"
          {...register("description", {required: true})}
        ></textarea>
        {errors.description && <span>Description is required</span>}
        <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>Save</button>
      </form>
      {params.id && 
      <div className='flex justify-end'>
        <button className='bg-red-500 p-3 rounded-lg w-48 mt-3' onClick={async () => {
          const accepted = window.confirm('Are you sure?')
          if (accepted) {
            await deleteTask(params.id)
            toast.success("Task deleted", {
              position: "top-center",
              style: {
                background: "#101010",
                color: "#fff"
              }
            })
            navigate("/tasks")
          }
        }}>Delete</button>
      </div>}
    </div>
  )
}
  