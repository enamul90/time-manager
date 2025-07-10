
import React from 'react';

import { FaCalendarDays } from "react-icons/fa6";
import { FaLaptopCode } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { LuActivity } from "react-icons/lu";

import TaskManager from '../components/TaskManager';
import Navbar from '../components/Navbar';
import SummaryCard from '../components/SummaryCard';


const page = () => {
  const summaryData = [
    {
      title: 'Working days',
      value: 1200,
      icon: <FaCalendarDays />,
    },
    {
      title: 'Work',
      value: '15,000',
      icon: <FaLaptopCode />,
    },
    {
      title: 'Activity',
      value: "90%",
      icon: <LuActivity />,
    },
    {
      title: 'Total User',
      value: 320,
      icon: <FaTasks />,
    },
  ];

  return (
    <>
      <Navbar />

      <div className='max-w-7xl mx-auto mt-3 md:mt-4  grid grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 gap-3 md:gap-4 px-4'>
        <SummaryCard data={summaryData} />
      </div>

      <TaskManager />

    </>
  );
};

export default page;