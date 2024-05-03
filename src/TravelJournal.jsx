import React, { useState } from 'react';
import './TravelJournal.css';

export const TravelJournal = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [data, setData] = useState([]);
    const [editIndex,setEditIndex] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editIndex!==null){
            const updatedData = [...data];
            updatedData[editIndex] = { title, description, date };
            setData(updatedData);
            setEditIndex(null); 
        }
        else{
        const newEntry = { title, description, date };
        setData([...data, newEntry]);
        }
        setTitle("");
        setDescription("");
        setDate("");
    }

    const handleDelete = (index) => {
        const updatedData = data.filter((entry, idx) => idx !== index);
        setData(updatedData);
    }

    const handleEdit = (index)=>{
        const { title, description, date } = data[index];
        setTitle(title);
        setDescription(description);
        setDate(date);
        setEditIndex(index);
    }

    return (
        <div className="main-section">
            <h1 className="main-heading">Travel Journal</h1>
            <h3>Add New Entry</h3>
            <form className="form-section" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                /><br/>
                <textarea 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea><br/>
                <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                /><br/>
                <button type="submit" className="add-entry-button">Add Entry</button>
            </form>
            <hr className='horizontal-line'/>
            <div>
                <table style={{width:"100%"}}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.title}</td>
                                <td>{entry.description}</td>
                                <td>{entry.date}</td>
                                <td className="action-buttons">
                                    <button className="edit-button" onClick={()=>handleEdit(index)}>Edit</button>
                                    <button className="delete-button"  onClick={() => handleDelete(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
