/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './CreateBlog.css'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';


const CreateBlog = () => {


      // State to manage the selected value
  const [selectedValue, setSelectedValue] = useState('');

  // Handler function to update the selected value
  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };

//-----------------------------------------------------------------------------------------
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ];


    const modules = {
        toolbar: toolbarOptions,
    };

//----------------------------------------------------------------------------------------------------------------

  return (
    <div className='createBlogPage'>
      <h1>Create a <span style={{color:'#ED5AB3'}}>Blog</span></h1>
      <form>
        <input type="text" placeholder='Title' id='title' />
        <input style={{fontSize:'1rem'}} type='text' placeholder='Summary' id='summary' />
        <input style={{cursor:'pointer'}} type='file' accept='image/*' placeholder='cover image'/>
        
        <ReactQuill modules={modules} theme="snow" style={{color:'black', backgroundColor:'white', padding:'0', border:'1px solid #ED5AB3'}}/>


        <div className="category">

            <label htmlFor="dropdown">Select the category for your blog:</label>

            <div className="categoryArea">

                <div className="typeOptions">
                    <input type="radio" id="technology" name='type'/>
                    <span>TECHNOLOGY</span>
                </div>

                <div className="typeOptions">
                    <input type="radio" id="lifestyle" name='type'/>
                    <span>LIFESTYLE</span>
                </div>

                <div className="typeOptions">
                    <input type="radio" id="business_and_finance" name='type'/>
                    <span>BUSINESS & FINANCE</span>
                </div>

                <div className="typeOptions">
                    <input type="radio" id="entertainment" name='type'/>
                    <span>ENTERTAINMENT</span>
                </div>

                <div className="typeOptions">
                    <input type="radio" id="science_and_education" name='type'/>
                    <span>SCIENCE AND EDUCATION</span>
                </div>

                <div className="typeOptions">
                    <input type="radio" id="personal" name='type'/>
                    <span>PERSONAL</span>
                </div>

                <div className="typeOptions">
                    <input type="radio" id="others" name='type'/>
                    <span>OTHERS</span>
                </div>

            </div>


        </div>


        <button>PUBLISH</button>

      </form>
    </div>
  )
}

export default CreateBlog
