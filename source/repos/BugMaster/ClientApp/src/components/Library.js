import React from 'react';
import { Input } from 'reactstrap';

export const onAddAttachment = (e, tableId, files, fileinput) => {
    e.preventDefault();

    //Get a reference to the table
    let tableRef = document.getElementById(tableId);

    if (tableRef != null) {
      files.map((file) => {
        let isFound = false

        for (var i = 0; i < tableRef.rows.length; i++) {
          if (tableRef.rows[i].cells[0].textContent === file.name) {
            isFound = true
          }

        }

        if (isFound === false) {
          
          let newRow = tableRef.insertRow(-1);

          let fileNameVal = newRow.insertCell(0);
          fileNameVal.innerHTML = file.name;
          fileNameVal.style = "font-size: 0.75rem;";

          let rowname = "removeAttachment" + (tableRef.rows.length - 1)
          newRow.id = rowname

          let removeButton = newRow.insertCell(1);
          var btn = document.createElement(rowname + "button");
          btn.type = "button";
          btn.className = "btn btn-primary LogBugButtons";
          btn.style = "font-size: 0.4rem;"
          btn.textContent = "Remove Attachment"
          btn.addEventListener("click", (e) => { onDeleteAttachment(e, rowname, tableId, files, fileinput) });
          removeButton.appendChild(btn);
        }
      })
    }

  }

export const onDeleteAttachment = (e, rowname, tableId, files, fileinput) => {

  e.preventDefault();
  let rowtoRemove = document.getElementById(rowname)
  let tableToUpdate = document.getElementById(tableId)
  let attachmentToRemove = null

  for (let i = 0; i < files.length; i++) {
    if ((files[i] instanceof File) && files[i].name === rowtoRemove.cells[0].textContent) {
      attachmentToRemove = files[i]
      break
    } else if (files[i].fileName === rowtoRemove.cells[0].textContent)  {
      attachmentToRemove = files[i]
      break
    }
  }
  rowtoRemove.remove();
  files.splice(files.indexOf(attachmentToRemove), 1)

  if (tableToUpdate.rows.length === 1) {
    document.getElementById("AttachmentFile").value = ""
  }

  return files

}

export const renderExistingFiles = (attachmentfiles, tableId) =>
{
  
    let files = []
    if (attachmentfiles)
    {
      attachmentfiles.map((attachment) => files.push(attachment))
      let tableRef = document.getElementById(tableId);
      if (tableRef)
      {
        tableRef.innerHTML = ""

        var filehead = tableRef.createTHead().insertRow(0).insertCell(0);
        filehead.style = "font-size: 0.75rem;padding: 0.15rem"
        filehead.innerHTML = "<b>File Name</b>"
      }

      if (files.length > 0)
      {
        files.map((file) =>
        {
          if (tableRef)
          {           
            let newRow = tableRef.insertRow(-1);

            let fileNameVal = newRow.insertCell(0);
            if (file.fileName) {
              fileNameVal.innerHTML = file.fileName;
            } else {
              fileNameVal.innerHTML = file.name;
            }

            fileNameVal.style = "font-size: 0.75rem;";

            let rowname = "removeAttachment" + (tableRef.rows.length - 1)
            newRow.id = rowname

            let removeButton = newRow.insertCell(1);
            var btn = document.createElement(rowname + "button");
            btn.type = "button";
            btn.className = "btn btn-primary LogBugButtons";
            btn.style = "font-size: 0.4rem;"
            btn.textContent = "Remove Attachment"
            btn.addEventListener("click", (e) => { onDeleteAttachment(e, rowname, tableId, files) });
            removeButton.appendChild(btn);
          }
        })

      }

    }
}

export const createSelectElementWithDescription = (optionData, selectId, className, descriptionField,selectedIndex,noval =0) => {

  let Select = []

  if (noval === 1) {
    Select.splice(0, 0, <option key={0} value={0}></option>)
  }

  if (optionData.length > 0)
  {   
    optionData.map((option,i) => 
    {
      if (i === selectedIndex)
      {
        Select.push(<option key={i} value={option.id} selected="selected">{optionData[i][descriptionField]}</option>)
      }
      else
      {
        Select.push(<option key={i} value={option.id}>{optionData[i][descriptionField]}</option>)
      }

    })

    return (
      <Input type="select" name={selectId} id={selectId} className={className} style={{ height: '40px' }} onChange={() => document.getElementById("SaveButton").style.visibility = "visible"} >
        {Select}
      </Input>
    );
  } else {
    return (
      <select>
        <option value="1">Loading..</option>
      </select>
    );
  }
}

