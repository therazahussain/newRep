import React, { useRef, useState } from 'react'
import "./XRay.css"
import { designationData, experianceData, rolesData } from '../../utils/XRaying-Data';

const XRay = () => {
  const [role, setRole] = useState("");
  const [coustomRole, setCoustomRole] = useState("");
  const [experiance, setExperiance] = useState("");
  const [designation, setDesignation] = useState("");
  const [designationOptions, setDesignationOptions] = useState([]);
  const [selectedDesignations, setSelectedDesignations] = useState([]);
  const [location, setLocation] = useState("");
  const [mandatoryValue, setMandatoryValue] = useState('');
  const [mandatoryWords, setMandatory] = useState([]);
  const [eitherKeyword, seteitherKeyword] = useState([""]);
  const [femaleCheck, SetFemaleCheck] = useState("");
  const [link, setLink] = useState([]);
  const selectedField = useRef("");

  // To handle the roles which are present in the dropdown Box
  const handleRole = (e) => {
    if (e.target.value !== "coustom") {
      setCoustomRole("")
    }
    setRole(e.target.value);
    setLink([]);
  }

  // To add a new role if not present in the dropdown.
  const handleCoustomRole = (e) => {
    setCoustomRole(e.target.value);
    setLink([]);
  }

  // To add the experiance in the search
  const handleExperiance = (event) => {
    selectedField.current = "Experiance"
    setExperiance(event.target.value);
    setLink([]);
  }

  // To select the Designation option from dropdown.
  const handleDesignation = (event) => {
    selectedField.current = "Designation"
    setDesignation(event.target.value);
    const data = event.target.value;
    const newData = data.split(",")
    setDesignationOptions(newData);
    setLink([]);
  }

  // Selected Designations CheckBoxes
  const handleDesignationChange = (event) => {
    const selectedValue = event.target.value;
    if (event.target.checked) {
      setSelectedDesignations([...selectedDesignations, selectedValue]);
    } else {
      setSelectedDesignations(selectedDesignations.filter(value => value !== selectedValue));
    }
  }

  // To handle the location field
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    setLink([]);
  }

  // Take Mandatory Keywords
  const handleMandatoryKeyWords = (event) => {
    setLink([]);
    setMandatoryValue(event.target.value);
  };

  // On Click enter in the mandatory field store the Mandatory Keywords
  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addValue(mandatoryValue);
    }
  };

  const addValue = (value) => {
    if (!value || mandatoryWords.includes(value)) {
      return;
    }
    setMandatory([...mandatoryWords, value]);
    setMandatoryValue('');
  };

  // To remove any of the Mandatory KEyword from the Array
  const removeValue = (value) => {
    const newValues = mandatoryWords.filter((v) => v !== value);
    setMandatory(newValues);
  };

  const handleEitherOr = (event, index) => {
    setLink([]);
    const newInputValues = [...eitherKeyword];
    newInputValues[index] = event.target.value;
    seteitherKeyword(newInputValues);
  };

  // To add a new Cluster 
  const handleAddClick = (event) => {
    event.preventDefault()
    seteitherKeyword([...eitherKeyword, '']);
  };

  // For Female CheckBox
  const handleFemaleCheck = (event) => {
    const checked = event.target.checked;
    if (checked) {
      SetFemaleCheck("(Female OR Women OR Women’s)");
    } else {
      SetFemaleCheck("");
    }
    setLink([]);
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  const tagElements = mandatoryWords.map((value) => (
    <span key={value} className="value-tag">
      {value}
      <button className="remove-button" onClick={() => removeValue(value)}>
        X
      </button>
    </span>
  ));

  // To add the Input fields if click on add button
  const inputFields = eitherKeyword.map((value, index) => (
    <div key={index}>
      <input
        type="text"
        id={`text-input-${index}`}
        value={value}
        onChange={(event) => handleEitherOr(event, index)}
      />
    </div>
  ));

  const handleSubmit = (event) => {
    event.preventDefault();
    // do something with the form data
    let mandatory = mandatoryWords.join(" ");
    // to convert the the keywords in the form of (A OR B) and replace any empty () from the string 
    let either = (eitherKeyword.map(group => `(${group})`).join(" ")).replace(/\s*\(\s*\)\s*$/, '');
    let formedLink = `site:linkedin.com/in ${mandatory} ${either} ${femaleCheck}`

    if (location !== "") {
      formedLink = formedLink + `"${location}" `
    }
    let googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(formedLink)}`;

    if (selectedField.current === "") {
      setLink(prev => [...prev, googleSearchUrl])
    }

    // If the experiance is selected.
    if (selectedField.current === "Experiance") {
      if (experiance === ">3") {
        const newArr = [`${googleSearchUrl} "${"1..2 yrs | years * exp | experience"}"`, `${googleSearchUrl} "${"2..3 yrs | years * exp | experience"}"`]
        setLink(prev => [...prev, ...newArr])
      }
      if (experiance === ">5") {
        const newArr = [`${googleSearchUrl} "${"3..4 yrs | years * exp | experience"}"`, `${googleSearchUrl} "${"4..5 yrs | years * exp | experience"}"`]
        setLink(prev => [...prev, ...newArr])
      }
      if (experiance === ">8") {
        const newArr = [`${googleSearchUrl} "${"5..6 yrs | years * exp | experience"}"`, `${googleSearchUrl} "${"6..7 yrs | years * exp | experience"}"`,`${googleSearchUrl} "${"7..8 yrs | years * exp | experience"}"`]
        setLink(prev => [...prev, ...newArr])
      }
      if (experiance === ">12") {
        const newArr = [`${googleSearchUrl} "${"8..9 yrs | years * exp | experience"}"`, `${googleSearchUrl} "${"9..10 yrs | years * exp | experience"}"`, `${googleSearchUrl} "${"10..11 yrs | years * exp | experience"}"`]
        setLink(prev => [...prev, ...newArr])
      }
      if (experiance === "<12") {
        const newArr = [`${googleSearchUrl} "${"12+ yrs | years * exp | experience"}"`]
        setLink(prev => [...prev, ...newArr])
      }
    }

    if (selectedField.current === "Designation") {
      selectedDesignations.map((value) => {
        let link = googleSearchUrl + `intitle:"${value}"`
        console.log(link)
        setLink(prev => [...prev, link]);
      });

    }

  }

  return (
    <>
      <form autoComplete='off' onSubmit={handleSubmit} onKeyDown={handleKeyPress}>

        <div>
          <label htmlFor="role">Select  a Role: </label>
          <select name="Role" id="role" value={role} onChange={handleRole}>
            <option value="" disabled>-- Please select --</option>
            {
              rolesData.map((role, index) => <option key={index} value={role}>{role}</option>)
            }
            <option value="coustom">Add New Role</option>
          </select>
        </div>

        <div hidden={role === "coustom" ? false : true}>
          <label htmlFor="newRole">Add Coustom Role: </label>
          <input type="text" id='newRole' value={coustomRole} onChange={handleCoustomRole} />
        </div>


        <div style={{ color: selectedField.current === "Designation" ? "lightgrey" : "" }}>
          <label htmlFor="experiance">Select Experiance: </label>
          <select name="Experiance" id="experiance" value={experiance} onChange={handleExperiance} disabled={selectedField.current === "Designation" && true}>
            <option value="" disabled>-- Please select --</option>
            {experianceData.map((value, index) => <option key={index} value={value.value}>{value.years}</option>)}
          </select>
        </div>


        <div style={{ color: selectedField.current === "Experiance" ? "lightgrey" : "" }}>
          <label htmlFor="designation">Select Designation: </label>
          <select name="designation" id="designation" value={designation} onChange={handleDesignation} disabled={selectedField.current === "Experiance" && true}>
            <option value="" disabled>-- Please select --</option>
            {
              designationData.map((value, index) => <option key={index} value={(value.value)}>{value.title}</option>)
            }
          </select>
        </div>

        {
          <div>
            {designationOptions.map((value, index) =>
              <div key={index}>
                <input
                  type="checkbox"
                  value={value}
                  onChange={handleDesignationChange}
                />
                {value}
              </div>
            )}
          </div>
        }

        <div>
          <label htmlFor="Location">Enter Location: </label>
          <input type="text" id="location" value={location} onChange={handleLocationChange} />
        </div>

        <div>
          <div className="value-tags">{tagElements}</div>
          <label htmlFor="value-input">Enter Mandatory Keywords:</label>
          <input
            type="text"
            id="value-input"
            value={mandatoryValue}
            onChange={handleMandatoryKeyWords}
            onKeyDown={handleInputKeyPress}
          />
        </div>


        <div>
          <label htmlFor="">Enter Either:</label>
          {inputFields}
          <button onClick={handleAddClick}>Add New Cluster</button>
        </div>


        <div>
          <label htmlFor="femaleCandidates">Female Candidates:</label>
          <input
            id="femaleCandidates"
            type="checkbox"
            value={femaleCheck}
            onChange={handleFemaleCheck}
          />
        </div>

        <div>
          <input type="submit" onClick={handleSubmit} />
        </div>
      </form>

      <div>
        {link.map((value, index) => <a key={index} href={value} target="_blank">Link {index + 1}</a>)}
      </div>
    </>


  )
}

export default XRay


//  role location keyword 