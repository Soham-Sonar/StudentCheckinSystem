import React, { useState, useEffect } from 'react';
import TabsNav from '../components/TabsNav';
import AddStudentForm from '../components/AddStudentForm';
import CheckIn from '../components/Checkin';
import Attendance from '../components/Attendance';
import StudentDetails from '../components/StudentDetails';
import { API_BASE, authAxios } from '../api/axios';
import axios from 'axios';

export default function Dashboard({ handleLogout }) {
  const [activeTab, setActiveTab] = useState('Add Student');
  const [studentForm, setStudentForm] = useState({ name:'', email:'', studentId:'', pincode:'', district:'', state:'', country:'' });
  const [studentError, setStudentError] = useState(null);
  const [studentSuccess, setStudentSuccess] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const [/*students*/, setStudents] = useState([]);
  const [checkinStudentId, setCheckinStudentId] = useState('');
  const [checkins, setCheckins] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [studentDetails, setStudentDetails] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  const [notifyStatus, setNotifyStatus] = useState(null);

  // --- Load data on mount ---
  useEffect(()=>{
    fetchStudents();
    fetchCheckins();
    fetchAttendance();
  }, []);

  useEffect(()=>{
    const fetchLocation = async () => {
      if(studentForm.pincode.length===6){
        setLocationLoading(true);
        try{
          const res = await axios.get(`https://api.postalpincode.in/pincode/${studentForm.pincode}`);
          if(res.data[0].Status==='Success'){
            const po = res.data[0].PostOffice[0];
            setStudentForm(prev=>({...prev, district:po.District, state:po.State, country:po.Country}));
          }
        }catch{}
        finally{setLocationLoading(false);}
      }
    };
    fetchLocation();
  }, [studentForm.pincode]);

  const fetchStudents = async ()=>{
    try{ const res = await authAxios.get(`${API_BASE}/students`); setStudents(res.data);}catch(err){console.error(err);}
  };
  const fetchCheckins = async ()=>{ try{ const res=await authAxios.get(`${API_BASE}/checkins`); setCheckins(res.data);}catch(err){console.error(err);} };
  const fetchAttendance = async ()=>{ try{ const res=await authAxios.get(`${API_BASE}/attendance`); setAttendance(res.data);}catch(err){console.error(err);} };
  const fetchStudentDetails = async (id)=>{ try{ const res=await authAxios.get(`${API_BASE}/students/${id}/attendance`); setStudentDetails(res.data);}catch{setStudentDetails(null);} };

  const handleAddStudent = async (e)=>{
    e.preventDefault();
    setStudentError(null); setStudentSuccess(null);
    if(!studentForm.name||!studentForm.email||!studentForm.studentId){setStudentError('Name, Email, and Student ID are required'); return;}
    try{ await authAxios.post(`${API_BASE}/students`, studentForm); setStudentSuccess('Student added successfully!'); setStudentForm({ name:'', email:'', studentId:'', pincode:'', district:'', state:'', country:'' }); fetchStudents(); fetchAttendance(); }catch(err){ setStudentError(err.response?.data?.error || 'Failed to add student'); }
  };

  const handleCheckin = async (e)=>{
    e.preventDefault();
    if(!checkinStudentId) return;
    try{ await authAxios.post(`${API_BASE}/checkins`, {studentId:checkinStudentId}); setCheckinStudentId(''); fetchCheckins(); fetchAttendance(); }catch{}
  };

  const notifyAbsentStudents = async () => {
  await authAxios.post(`${API_BASE}/attendance/notify-absent`);
};

  const formatDateTime = (d)=>{ const date=new Date(d); return isNaN(date)?'Invalid Date':date.toLocaleString(); };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />
      <main className="max-w-5xl mx-auto p-6 space-y-6">
        {activeTab==='Add Student' && <AddStudentForm studentForm={studentForm} setStudentForm={setStudentForm} handleAddStudent={handleAddStudent} studentError={studentError} studentSuccess={studentSuccess} locationLoading={locationLoading} />}
        {activeTab==='Check-In' && <CheckIn checkins={checkins} checkinStudentId={checkinStudentId} setCheckinStudentId={setCheckinStudentId} handleCheckin={handleCheckin} formatDateTime={formatDateTime} />}
        {activeTab==='Attendance' && <Attendance attendance={attendance} notifyAbsentStudents={notifyAbsentStudents} notifyStatus={notifyStatus} setNotifyStatus={setNotifyStatus} />}
        {activeTab==='Student Details' && <StudentDetails selectedStudentId={selectedStudentId} setSelectedStudentId={setSelectedStudentId} studentDetails={studentDetails} fetchStudentDetails={fetchStudentDetails} />}
      </main>
    </div>
  );
}
