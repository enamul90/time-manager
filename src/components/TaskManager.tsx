'use client';

import { useEffect, useState } from 'react';
import { MdEdit } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineArrowDropUp } from "react-icons/md";

import { MdModeEditOutline } from "react-icons/md";

import API from '@/app/utils/axios';


export default function TaskManager() {

  const [addTask, setAddTask] = useState(false)

  const [showWork, setShowWork] = useState("")

  const [taskData, setTaskData] = useState({
    taskName: "",
    taskTime: "",
    taskDetails: "",
  })

  const [dayName, setDayName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const [taskList, setTaskList] = useState([])




  const createTask = async () => {
    try {
      await API.post('/tasks', {
        workID: showWork,
        tittle: taskData.taskName,
        time: taskData.taskTime,
        description: taskData.taskDetails,
      });

      setAddTask(false)
      setTaskData({
        taskName: "",
        taskTime: "",
        taskDetails: "",
      })

      taskReq (showWork)

    }
    catch (err) {
      alert(err.response?.data?.error || 'Create Task Fails');
    }
  }


  const taskReq = async (id) => {
    try {
      const data = await API.get(`/tasks/${id}`);

      setTaskList(data.data.data)

    }
    catch (err) {
      alert(err.response?.data?.error || 'something went wrong');
    }
  }





  const [dayList, setDayList] = useState([])

  const dayRequest = async () => {
    try {
      const res = await API.get('/work-day');
      setDayList(res.data.data)
    }
    catch (err) {
      
    }
  }



  const handleAddDay = async () => {

    if (dayName !== "") {
      if (editingIndex !== null) {
        const updatedDays = [...days];
        updatedDays[editingIndex].name = dayName;
        setEditingIndex(null);
      }

      else {
        try {
          await API.post('/work-day', {
            workDay: dayName,
          });

          dayRequest()
        }
        catch (err) {
          alert(err.response?.data?.error || 'Work  Create Fails');
        }
      }
      setDayName('');
    }
  };


  const handleEdit = (index) => {
    setDayName(index.workday);
    setEditingIndex(index._id);
  };


  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this day?");
    if (confirmDelete) {
      const updatedDays = days.filter((_, i) => i !== index);
      setDays(updatedDays);
      if (editingIndex === index) {
        setDayName('');
        setEditingIndex(null);
      }
    }
  };

  useEffect(() => {
    dayRequest()
  }, [])
  

  return (
    <div className='max-w-7xl mx-auto mt-3 md:mt-4 px-4'>
      <div className="flex justify-between items-center mb-4 w-full gap-3 p-3 bg-white shadow rounded-md">
        <input
          type="text"
          value={dayName}
          onChange={(e) => setDayName(e.target.value)}
          className="w-full p-2 border rounded input-focus"
          placeholder="Working Day Name"
        />
        <button onClick={handleAddDay} className="btn-primary px-6 py-2 text-sm cursor-pointer">
          {editingIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      {/* Days Display */}
      <div className="space-y-3">
        {dayList?.map((days, index) => (
          <div
            key={index}
            className="p-3 bg-white shadow rounded-md"
          >
            <div className='flex items-center justify-between'>
              <div className='flex flex-row items-center gap-2'>
                <h3 className="text-lg font-semibold text-neutral-800">{days.workday} - </h3>
                <h4 className="text-sm text-gray-500">
                  {new Date(days.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </h4>
              </div>

              <div className='flex gap-5'>
                <button className='cursor-pointer' onClick={() => handleEdit(days)}>
                  <MdEdit className='text-primary' />
                </button>

                {
                  showWork === days._id ? (
                    <button onClick={() => setShowWork("")} className='p-1 bg-primary rounded-full'>
                      < MdOutlineArrowDropUp className='text-white' />
                    </button>
                  ) : (
                    <button
                      onClick={() =>{
                         setShowWork(days._id) 
                         taskReq(days._id)
                      }}
                      className='p-1 bg-primary rounded-full'
                    >
                      <IoMdArrowDropdown className='text-white' />
                    </button>
                  )
                }

              </div>
            </div>

            {/* Add Task Modal */}
            {
              addTask && (
                <div className="w-full bg-neutral-200/50 h-screen absolute top-0 left-0 z-50 flex items-center justify-center">
                  <div className="border border-neutral-200 p-4 rounded-md bg-white shadow-sm w-md">
                    {/* Title */}
                    <div className="mb-3">
                      <label className="block text-sm text-neutral-600 font-medium">Task Title</label>
                      <input
                        type="text"
                        value={taskData.taskName}
                        onChange={(e) => setTaskData({ ...taskData, taskName: e.target.value })}
                        placeholder="Enter task title"
                        className="w-full mt-1 p-2 border rounded-md text-sm focus:outline-none focus:ring focus:border-[#e07b39]"
                      />
                    </div>

                    {/* Time */}
                    <div className="mb-3">
                      <label className="block text-sm text-neutral-600 font-medium">Time</label>
                      <input
                        type="number"
                        value={taskData.taskTime}
                        onChange={(e) => setTaskData({ ...taskData, taskTime: e.target.value })}
                        placeholder="e.g. 2H"
                        className="w-full mt-1 p-2 border rounded-md text-sm focus:outline-none focus:ring focus:border-[#e07b39]"
                      />
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                      <label className="block text-sm text-neutral-600 font-medium">Description</label>
                      <textarea
                        rows={3}
                        value={taskData.taskDetails}
                        onChange={(e) => setTaskData({ ...taskData, taskDetails: e.target.value })}
                        placeholder="Enter task details"
                        className="w-full mt-1 p-2 border rounded-md text-sm focus:outline-none focus:ring focus:border-[#e07b39]"
                      />
                    </div>

                    {/* Actions */}
                    <div className="text-end">
                      <button
                        onClick={() => setAddTask(false)}
                        className="bg-neutral-800 text-white px-4 py-2 rounded-md text-sm  transition me-3 cursor-pointer"
                      >
                        Close
                      </button>
                      <button
                        onClick={createTask}
                        className="bg-[#e07b39] text-white px-4 py-2 rounded-md text-sm hover:bg-[#cc6d32] transition cursor-pointer"
                      >
                        Save Task
                      </button>
                    </div>
                  </div>
                </div>
              )
            }



            {/* Task List */}
            <div className={`${showWork === days._id && 'mt-2 pt-2 border-t border-neutral-200'}`}>

              {
                showWork === days._id && (
                  <>
                    <div className='flex justify-between items-center'>
                      <h2 className='text-neutral-800 font-semibold text uppercase'>My Work  List </h2>

                      <button onClick={() => setAddTask(true)} className='flex gap-3 items-center text-xs  text-white px-3 py-2 bg-primary rounded-md cursor-pointer' >
                        Add Task  <IoMdAdd className='text-base' />
                      </button>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-3">
                      {taskList.map((task, index) => (
                        <div key={index} className="border border-neutral-200 p-3 rounded-md">
                          {/* title */}
                          <div className="mb-2 flex justify-between items-center">
                            <h2 className="text-neutral-800 font-semibold text-base">{task?.tittle}</h2>
                            <h3 className="text-neutral-600 font-semibold text-wrap">{task?.taskTime || '2H'}</h3>
                          </div>

                          <p className="text-neutral-700 text-[14px]">
                            {task?.description || 'No description provided.'}
                          </p>

                          {/* action */}
                          <div className="mt-4 flex gap-2">
                            <button className="text-green-700 font-semibold cursor-pointer text-xs px-3 py-2 bg-amber-100 rounded-md shadow">Delete</button>
                            <button className="text-blue-500 font-semibold cursor-pointer text-xs px-3 py-2 bg-blue-100 rounded-md shadow">Edit</button>
                            <button className="text-red-600 font-semibold cursor-pointer text-xs px-3 py-2 bg-red-100 rounded-md shadow">Set Status</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )
              }
            </div>
          </div>
        ))}

        {dayList.length === 0 && (
          <p className="text-gray-400 text-center">No days added yet.</p>
        )}
      </div>
    </div>
  );
}

